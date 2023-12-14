import React, { useState } from "react";
import Search from "../component/Search";
import { movieList } from "../Constant";

const View = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelect = (movie) => {
    setSelectedMovie(movie);
  };
  return (
    <div>
      <Search options={movieList} onSelect={handleSelect} />
    </div>
  );
};

export default View;
