import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item.id}`} className="link">
      <div className="gigCard">
        {/* Display the cover image */}
        {item.coverImage && (
          <img
            src={`data:image/jpeg;base64,${item.coverImage}`}
            alt="Cover"
          />
        )}
        <div className="info">
          
          <p>{item.shortDescription}</p>
          <div className="star">
            <img src="./img/star.png" alt="Star" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="Heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
