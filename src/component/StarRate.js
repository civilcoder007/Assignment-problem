import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";


const StarRating = ({ rating }) => {
    const ratingStar = Array.from({ length: 10 }, (elem, index) => {
        let number = index + 0.5;
        return (
          <span key={index}>
            {rating >= index + 1 ? (
              <FaStar className="icon" />
            ) : rating >= number ? (
              <FaStarHalfAlt className="icon" />
            ) : (
              <FaRegStar className="icon" />
            )}
          </span>
        );
      });
  return (
    <div className='star'>
     {ratingStar}
    </div>
  );
};



export default StarRating;
