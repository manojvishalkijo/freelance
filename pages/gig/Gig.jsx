import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";

function Gig() {
  const { id } = useParams(); // Retrieve the id from the URL
  const [gig, setGig] = useState(null); // State to store gig data

  useEffect(() => {
    // Fetch gig data based on id
    const fetchGig = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/services/${id}`); // Corrected the URL
        setGig(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching gig data:", error);
      }
    };

    fetchGig();
  }, [id]);

  if (!gig) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">{gig.category}</span>
          <h1>{gig.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={`data:image/jpeg;base64,${gig.coverImage}`} // Fixed template literal syntax
              alt={gig.username}
            />
            <span>{gig.username}</span>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {/* Display coverImage and additionalImage */}
            <img
              src={`data:image/jpeg;base64,${gig.coverImage}`} // Fixed template literal syntax
              alt="Cover"
            />
            {gig.additionalImage && (
              <img
                src={`data:image/jpeg;base64,${gig.additionalImage}`} // Fixed template literal syntax
                alt="Additional"
              />
            )}
          </Slider>
          <h2>About This Service</h2>
          <p>{gig.description}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={`data:image/jpeg;base64,${gig.coverImage}`} // Fixed template literal syntax
                alt={gig.username}
              />
              <div className="info">
                <span>{gig.username}</span>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">Location</span>
                  <span className="desc">{gig.location}</span>
                </div>
              </div>
              <hr />
              <p>{gig.shortDescription}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>{gig.serviceTitle}</h3>
            <h2>${gig.price}</h2>
          </div>
          <p>{gig.shortDescription}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{gig.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{gig.revisionNumber} Revisions</span>
            </div>
          </div>
          {/* Add features if there are any */}
          {gig.features && (
            <div className="features">
              {gig.features.map((feature, index) => (
                <div key={index} className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
