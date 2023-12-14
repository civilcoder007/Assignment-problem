import React, { useState } from "react";

const GenreDrop = ({ onSelectGenre }) => {
  const genres = ["Any Genre", "Action", "Comedy", "Drama", "Thriller"];
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    let updatedGenres;

    if (genre === "Any Genre") {
      updatedGenres = [];
    } else {
      updatedGenres = selectedGenres.includes("Any Genre")
        ? [genre]
        : selectedGenres.includes(genre)
        ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
        : [...selectedGenres, genre];
    }

    setSelectedGenres(updatedGenres);
    onSelectGenre(updatedGenres);
  };

  const showCheckboxes = () => {
    var checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = checkboxes.style.display === "none" ? "block" : "none";
  };

  return (
    <div className="multiselect">
      <div className="selectBox" onClick={showCheckboxes}>
        <select>
          <option>Genre</option>
        </select>
        <div className="overSelect"></div>
      </div>
      <div id="checkboxes">
        {genres.map((genre, index) => (
          <label key={index} htmlFor={genre.toLowerCase()}>
            <input
              type="checkbox"
              id={genre.toLowerCase()}
              checked={selectedGenres.includes(genre)}
              onChange={() => toggleGenre(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreDrop;
