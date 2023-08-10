import React, { useState } from "react";
import "./moods.css";

const Moods = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const moods = ["Happy", "Sad", "Excited", "Calm", "Angry"];

  return (
    <div className="moods-container">
      <h1 className="mood-heading">Select Your Mood</h1>
      <ul className="mood-list">
        {moods.map((mood) => (
          <li
            key={mood}
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
