import React, { useRef, useState, useEffect } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import axios from "axios";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const minRef = useRef();
  const maxRef = useRef();

  useEffect(() => {
    // Fetch all services from the backend
    const fetchGigs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/services/all");
        console.log(response.data); // Debugging: Log the data to see if it's fetched correctly
        setFilteredGigs(response.data);
      } catch (error) {
        console.error("Failed to fetch gigs", error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Request data:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error message:", error.message);
        }
      }
    };

    fetchGigs();
  }, []);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    const min = minRef.current.value ? parseInt(minRef.current.value) : 0;
    const max = maxRef.current.value ? parseInt(maxRef.current.value) : Infinity;
    const filtered = filteredGigs.filter((gig) => gig.price >= min && gig.price <= max);
    sortGigs(filtered);
  };

  const sortGigs = (gigsToSort) => {
    const sortedGigs = [...gigsToSort].sort((a, b) => {
      if (sort === "sales") {
        return b.sales - a.sales;
      } else if (sort === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return 0;
      }
    });
    setFilteredGigs(sortedGigs);
  };

  // Effect for sorting gigs when sort type changes
  useEffect(() => {
    sortGigs(filteredGigs);
  }, [sort]); // Only re-run when `sort` changes

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Services</span>
        <h1>Feel free to visit our Service's</h1>
        <p>Explore the boundaries of other's Service</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {filteredGigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
