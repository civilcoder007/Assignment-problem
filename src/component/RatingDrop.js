import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const RatingDrop = ({ onSelectRating }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  var expanded = false;

  const showCheckboxes = () => {
    var checkboxes = document.getElementById("ratingboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  };

  const handleSelectRating = (rating) => {
    if (rating === "Any Rating") {
      setSelectedRatings([]); // Set to empty array to indicate no specific rating filter
      onSelectRating(0); // Notify the parent component about the change
    } else if (rating === 0) {
      setSelectedRatings([]); // Set to empty array to indicate no specific rating filter
      onSelectRating(0);
    } else {
      const updatedRatings = selectedRatings.includes(rating)
        ? selectedRatings.filter((selectedRating) => selectedRating !== rating)
        : [...selectedRatings, rating];
      setSelectedRatings(updatedRatings);
      if (updatedRatings.length === 0) {
        setSelectedRatings([]);
      }
      onSelectRating(updatedRatings);
    }

  };

  const numRows = 10;
  const numCols = 10;

  const generateStarPattern = () => {
    const starPattern = [];
    starPattern.push(
      <div key="anyRating" className="star-row">
        <label>
          <input
            type="checkbox"
            id={`ratingAny`}
            // checked={selectedRatings.length === 0}
            onChange={() => handleSelectRating("Any Rating")}
          />
          Any Rating
        </label>
      </div>
    );

    for (let row = 1; row <= numRows; row++) {
      const starsForRow = [];
      const rating = row;
      for (let col = 1; col <= numCols; col++) {
        if (col <= row) {
          starsForRow.push(<FaStar key={col} />);
        } else {
          starsForRow.push(<FaRegStar key={col} />);
        }
      }
      starPattern.push(
        <div key={row} className="star-row">
          <label>
            <input
              type="checkbox"
              id={`rating${rating}`}
              checked={selectedRatings.includes(rating)}
              onChange={() => handleSelectRating(rating)}
            />
            {starsForRow}
          </label>
        </div>
      );
    }
    return starPattern;
  };

  return (
    <div className="multiselect">
      <div className="selectBox" onClick={showCheckboxes}>
        <select>
          <option>Rating</option>
        </select>
        <div className="overSelect"></div>
      </div>
      <div id="ratingboxes">{generateStarPattern()}</div>
    </div>
  );
};

export default RatingDrop;
