import React, { useState, useEffect } from "react";
import "./moods.css";
import { getMoods } from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";
import { MdDeleteForever } from "react-icons/md";

const Moods = () => {
  const [moods, setMoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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

  return (
    <div className="moods">
      <h2>Moods</h2>
      {moods.map((mood) => (
        <div key={mood.id} className="mood">
          <div className="mood__id">{mood.id}</div>
          <div className="mood__title">{mood.title}</div>
          <div className="mood__content">{mood.content}</div>
          <div className="mood__email">{mood.email?.fullname ?? "N/A"}</div>
          <div className="mood__delete">
            <MdDeleteForever />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Moods;
