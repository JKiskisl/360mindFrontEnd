import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import "./moods.css";
import {
  addMood,
  deleteMoods,
  getMoods,
  updateMood,
} from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";

import DatePicker from "react-datepicker";
import "./datepickers.css";

const Moods = () => {
  const [moods, setMoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [editMood, setEditMood] = useState(null);
  const [editFormValue, setEditFormValue] = useState({});

  const handleEditMood = (mood) => {
    setEditMood(mood);
    setEditFormValue({
      title: mood.title,
      content: mood.content,
      date: mood.date,
      happythings: mood.happythings,
      waterintake: mood.waterintake,
      todaysmood: mood.todaysmood,
      selfcareActivities: mood.selfcareActivities,
      Breakfast: mood.Breakfast,
      Lunch: mood.Lunch,
      Dinner: mood.Dinner,
      Snacks: mood.Snacks,
      Anxious: mood.Anxious,
      Sad: mood.Sad,
    });
    setShowForm(true);
  };

  const handleUpdateMood = async (event) => {
    event.preventDefault();

    const updatedMoodData = {
      title: editFormValue.title,
      content: editFormValue.content,
      date: editFormValue.date,
      happythings: editFormValue.happythings,
      waterintake: editFormValue.waterintake,
      todaysmood: editFormValue.todaysmood,
      selfcareActivities: editFormValue.selfcareActivities,
      Breakfast: editFormValue.Breakfast,
      Lunch: editFormValue.Lunch,
      Dinner: editFormValue.Dinner,
      Snacks: editFormValue.Snacks,
      Anxious: editFormValue.Anxious,
      Sad: editFormValue.Sad,
    };

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await updateMood(
        accessToken,
        editMood.id,
        updatedMoodData
      );

      if (response.error === null) {
        const updatedMood = {
          ...editMood,
          ...updatedMoodData,
        };
        setMoods((prevMoods) =>
          prevMoods.map((mood) =>
            mood.id === editMood.id ? updatedMood : mood
          )
        );
        setEditMood(null);
        setEditFormValue({});
        setErrorMessage("");
        setShowForm(false);
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getMoodsData = async () => {
      try {
        const accessToken = await getTokenFromLocalStorage();
        const response = await getMoods(accessToken);

        console.log(response.data);

        if (!isMounted) {
          return;
        }

        if (response.error === null) {
          setMoods(response.data);
          console.log(response.data);
          setErrorMessage("");
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        setErrorMessage(JSON.stringify(error.message, null, 2));
      }
    };

    getMoodsData();

    return () => {
      isMounted = false;
    };
  }, []);
  const handleDeleteMood = async (moodId) => {
    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await deleteMoods(accessToken, moodId);

      if (response.error === null) {
        setMoods((prevMoods) => prevMoods.filter((mood) => mood.id !== moodId));
        console.log(response.data);
        setErrorMessage("");
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  const handleAddMood = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const title = event.target.title.value;
    const content = event.target.content.value;

    const date = event.target.date.value;
    const happythings = event.target.happythings.value;
    const waterintake = event.target.waterintake.value;
    const todaysmood = event.target.todaysmood.value;
    const selfcareActivities = event.target.selfcareActivities.value;
    const Breakfast = event.target.Breakfast.value;
    const Lunch = event.target.Lunch.value;
    const Dinner = event.target.Dinner.value;
    const Snacks = event.target.Snacks.value;
    const Anxious = event.target.Anxious.value;
    const Sad = event.target.Sad.value;

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await addMood(accessToken, {
        title,
        content,
        date,
        happythings,
        waterintake,
        todaysmood,
        selfcareActivities,
        Breakfast,
        Lunch,
        Dinner,
        Snacks,
        Anxious,
        Sad,
      });

      if (response.error === null) {
        // Add the newly added mood to the state
        const newMood = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          date: response.data.date,
          happythings: response.data.happythings,
          waterintake: response.data.waterintake,
          todaysmood: response.data.todaysmood,
          selfcareActivities: response.data.selfcareActivities,
          Breakfast: response.data.Breakfast,
          Lunch: response.data.Lunch,
          Dinner: response.data.Dinner,
          Snacks: response.data.Snacks,
          Anxious: response.data.Anxious,
          Sad: response.data.Sad,
        };

        setMoods((prevMoods) => [...prevMoods, newMood]);
        setErrorMessage("");
        setShowForm(false);
        console.log("popup closed");
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  const showPopUpClear = () => {
    setEditFormValue({});
    setShowForm(true);
  };

  return (
    <div className="moods">
      <h2>Moods</h2>
      <button className="add-mood-button" onClick={() => showPopUpClear()}>
        Add Mood
      </button>
      {showForm && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <form onSubmit={handleAddMood} className="mood-form">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editFormValue.title || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    title: event.target.value,
                  })
                }
              />
              <textarea
                name="content"
                placeholder="Content"
                value={editFormValue.content || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    content: event.target.value,
                  })
                }
              ></textarea>
              <DatePicker
                selected={selectedDate}
                name="date"
                placeholderText="Select a date"
                dateFormat="MM/dd/yyyy"
                dayClassName={() => "react-datepicker__day"}
                calendarClassName="react-datepicker-popper"
                onChange={(date) => {
                  setSelectedDate(date);
                  const formattedDate = format(date, "MM/dd/yyyy");
                  setEditFormValue({
                    ...editFormValue,
                    date: formattedDate,
                  });
                }}
              />
              <textarea
                name="happythings"
                placeholder="Things that made me happy today"
                value={editFormValue.happythings || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    happythings: event.target.value,
                  })
                }
              ></textarea>
              <input
                type="number"
                name="waterintake"
                min="0"
                max="10"
                placeholder="Today's water intake (litres)"
                value={editFormValue.waterintake || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    waterintake: event.target.value,
                  })
                }
              />
              <input
                type="number"
                name="todaysmood"
                min="1"
                max="10"
                placeholder="Today's Mood (1-10)"
                value={editFormValue.todaysmood || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    todaysmood: event.target.value,
                  })
                }
              />
              <textarea
                name="selfcareActivities"
                placeholder="Self-care activities"
                value={editFormValue.selfcareActivities || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    selfcareActivities: event.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="Breakfast"
                placeholder="Breakfast"
                value={editFormValue.Breakfast || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    Breakfast: event.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="Lunch"
                placeholder="Lunch"
                value={editFormValue.Lunch || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    Lunch: event.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="Dinner"
                placeholder="Dinner"
                value={editFormValue.Dinner || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    Dinner: event.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="Snacks"
                placeholder="Snacks"
                value={editFormValue.Snacks || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    Snacks: event.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="Anxious"
                placeholder="Things that made me anxious today"
                value={editFormValue.Anxious || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    Anxious: event.target.value,
                  })
                }
              ></textarea>
              <textarea
                name="Sad"
                placeholder="Things that made me sad today"
                value={editFormValue.Sad || ""}
                onChange={(event) =>
                  setEditFormValue({
                    ...editFormValue,
                    Sad: event.target.value,
                  })
                }
              ></textarea>
              <div className="popup-buttons">
                <button type="submit">Add mood</button>
                {editMood && (
                  <>
                    <button type="button" onClick={handleUpdateMood}>
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMood(editMood.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
                <button onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}

      <table className="mood-table">
        <thead>
          <tr>
            <th>Mood Title</th>
            <th>Date</th>
            <th>Mood Rating</th>
            <th>Water Intake</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {moods.map((mood) => (
            <tr key={mood.id}>
              <td>{mood.title}</td>
              <td>{mood.date}</td>
              <td>{mood.todaysmood}</td>
              <td>{mood.waterintake}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditMood(mood)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMood(mood.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moods;
