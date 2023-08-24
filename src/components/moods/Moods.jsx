import React, { useState, useEffect } from "react";
import "./moods.css";
import { addMood, deleteMoods, getMoods } from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";
import { MdDeleteForever } from "react-icons/md";

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

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await addMood(accessToken, { title, content });

      if (response.error === null) {
        // Add the newly added mood to the state
        const newMood = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
        };

        setMoods((prevMoods) => [...prevMoods, newMood]);
        setErrorMessage("");
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
      <button onClick={() => setShowForm(true)}>Add Mood</button>
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
                name="happyThings"
                placeholder="Things that made me happy today"
              ></textarea>
              <select name="waterIntake">
                <option value="0">0 drops</option>
                <option value="1">1 drop</option>
                <option value="2">2 drops</option>
                <option value="3">3 drops</option>
                <option value="4">4 drops</option>
                <option value="5">5 drops</option>
              </select>
              <input
                type="number"
                name="todaysMood"
                min="1"
                max="10"
                placeholder="Today's Mood (1-10)"
              />
              <textarea
                name="selfCare"
                placeholder="Self-care activities"
              ></textarea>
              <textarea name="breakfast" placeholder="Breakfast"></textarea>
              <textarea name="lunch" placeholder="Lunch"></textarea>
              <textarea name="dinner" placeholder="Dinner"></textarea>
              <textarea name="snacks" placeholder="Snacks"></textarea>
              <textarea
                name="anxiousThings"
                placeholder="Things that made me anxious today"
              ></textarea>
              <textarea
                name="sadThings"
                placeholder="Things that made me sad today"
              ></textarea>
            </form>
            <div className="popup-buttons">
              <button type="submit">Add mood</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {moods.map((mood) => (
        <div key={mood.id} className="mood">
          <div className="mood__id">{mood.id}</div>
          <div className="mood__title">{mood.title}</div>
          <div className="mood__content">{mood.content}</div>
          <div className="mood__email">{mood.email?.fullname ?? "N/A"}</div>
          <div className="mood__delete">
            <MdDeleteForever onClick={() => handleDeleteMood(mood.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Moods;
