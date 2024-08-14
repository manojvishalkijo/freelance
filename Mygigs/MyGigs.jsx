import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyGigs.scss";

function MyGigs() {
  const [services, setServices] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem("username");
    console.log("Retrieved Username:", storedUsername); // Log the username for debugging

    if (storedUsername) {
      setUsername(storedUsername); // Set the username state

      // Fetch services that match the username
      axios
        .get(`http://localhost:8080/api/services?username=${storedUsername}`)
        .then((response) => {
          console.log("Fetched Services:", response.data); // Log the fetched data for debugging
          setServices(response.data); // Set the services state
        })
        .catch((error) => {
          console.error("There was an error fetching the services!", error);
        });
    } else {
      console.error("User not logged in");
    }
  }, []);

  const handleDelete = (id) => {
    // Confirm deletion action
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    // Delete service by id
    axios
      .delete(`http://localhost:8080/api/services/${id}`)
      .then(() => {
        // Update the UI after deletion
        setServices(services.filter((service) => service.id !== id));
        console.log(`Service with id ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error("There was an error deleting the service!", error);
      });
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{username ? `${username}'s Services` : "User not logged in"}</h1>
          {username && (
            <Link to="/add">
              <button>Add New Service</button>
            </Link>
          )}
        </div>
        {services.length > 0 ? (
          <table className="tab">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    {service.coverImage ? (
                      <img
                        className="image"
                        src={`data:image/jpeg;base64,${service.coverImage}`}
                        alt={service.title}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{service.title}</td>
                  <td>${service.price ? service.price.toFixed(2) : "N/A"}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt="Delete"
                      onClick={() => handleDelete(service.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
}

export default MyGigs;
