import React, { useState, useEffect } from "react";
import "./moods.css";
import { addMood, deleteMoods, getMoods } from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";

import DatePicker from "react-datepicker";
import "./datepickers.css";

const Moods = () => {
  const [moods, setMoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const customDayOrder = [0, 1, 2, 3, 4, 5, 6];
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="moods">
      <h2>Moods</h2>
      <button className="add-mood-button" onClick={() => setShowForm(true)}>
        Add Mood
      </button>
      {showForm && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <form onSubmit={handleAddMood} className="mood-form">
              <input type="text" name="title" placeholder="Title" />
              <textarea name="content" placeholder="Content"></textarea>
              <DatePicker
                selected={selectedDate}
                name="date"
                placeholderText="Select a date"
                dateFormat="MM/dd/yyyy"
                dayClassName={() => "react-datepicker__day"}
                calendarClassName="react-datepicker-popper"
                customDayOrder={customDayOrder} // Pass the custom day order here
                onChange={(date) => setSelectedDate(date)}
              />

              <textarea
                name="happythings"
                placeholder="Things that made me happy today"
              ></textarea>
              <select name="waterintake">
                <option value="0">0 drops</option>
                <option value="1">1 drop</option>
                <option value="2">2 drops</option>
                <option value="3">3 drops</option>
                <option value="4">4 drops</option>
                <option value="5">5 drops</option>
              </select>
              <input
                type="number"
                name="todaysmood"
                min="1"
                max="10"
                placeholder="Today's Mood (1-10)"
              />
              <textarea
                name="selfcareActivities"
                placeholder="Self-care activities"
              ></textarea>
              <textarea name="Breakfast" placeholder="Breakfast"></textarea>
              <textarea name="Lunch" placeholder="Lunch"></textarea>
              <textarea name="Dinner" placeholder="Dinner"></textarea>
              <textarea name="Snacks" placeholder="Snacks"></textarea>
              <textarea
                name="Anxious"
                placeholder="Things that made me anxious today"
              ></textarea>
              <textarea
                name="Sad"
                placeholder="Things that made me sad today"
              ></textarea>
              <div className="popup-buttons">
                <button type="submit">Add mood</button>
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
                <button className="edit-button">Edit</button>
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
