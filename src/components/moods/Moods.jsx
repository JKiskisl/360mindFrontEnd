import React, { useState, useEffect } from "react";
import "./moods.css";
import { getMoods } from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";

const Moods = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [moodsData, setMoodsData] = useState([]); // State to store fetched moods
  const accessToken = getTokenFromLocalStorage();

  useEffect(() => {
    // Fetch moods when the component mounts
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      console.log(accessToken);
      const moodsResponse = await getMoods(accessToken);
      console.log("Moods response: ", moodsResponse);
      setMoodsData(moodsResponse);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="moods-container">
      <h1 className="mood-heading">Select Your Mood</h1>
      <ul className="mood-list">
        {moodsData.map((mood, index) => (
          <li
            key={index} // Using index as the key (or use a unique identifier from mood data)
            className={`mood-item ${selectedMood === mood ? "selected" : ""}`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Moods;
