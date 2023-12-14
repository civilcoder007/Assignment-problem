import React, { useState, useEffect } from "react";
import StarRating from "./StarRate";
import GerneDrop from "./GerneDrop";
import RatingDrop from "./RatingDrop";

const Search = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const updateFilteredOptions = (options, inputValue, selectedGenres, selectedRating) => {
    const filteredByGenre = selectedGenres.length > 0
      ? options.filter(option => selectedGenres.includes(option.category))
      : options;

    const filteredByName = filteredByGenre.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const filteredByRating = selectedRating
      ? filteredByName.filter((option) => selectedRating.includes(Math.floor(option.rating)))
      : filteredByName;

    setFilteredOptions(filteredByRating);
  };
  
  useEffect(() => {
    updateFilteredOptions(options, inputValue, selectedGenres, selectedRating);

  }, [inputValue, options, selectedGenres, selectedRating]);

  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setIsOpen(false);
    onSelect(option);
  };


  const handleOutsideClick = (e) => {
    if (e.target.closest(".custom-select") === null) {
      setIsOpen(false);
    }
  };


  const handleSelectGenre = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  if (selectedGenres?.length === 0) {
    setFilteredOptions(options);
  }
  };

  const handleSelectRating = (selectedRating) => {
    setSelectedRating(selectedRating);
    if (selectedRating?.length ===0) {
      setFilteredOptions(options);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-select">
      <div className="inputfield">
        <input
          className="searchbox"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Enter movie name"
        />
        {isOpen && (
          <div className="drop border mt-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  className="moviename"
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="d-flex align-item-center justify-content-around">
                    <h5 className="name">{option.name}</h5>
                    <p>{option.category}</p>
                  </div>
                  <StarRating totalStars={10} rating={option.rating} />
                </div>
              ))
            ) : (
              <div className="no-data">No data found</div>
            )}
          </div>
        )}
      </div>
      <RatingDrop onSelectRating={handleSelectRating} />
      <GerneDrop onSelectGenre={handleSelectGenre} />
    </div>
  );
};

export default Search;
