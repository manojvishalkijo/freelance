import React, { useState, useEffect } from "react";
import "./Add.scss";

const Add = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [revisionNumber, setRevisionNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [username, setUsername] = useState(""); // New state for username

  useEffect(() => {
    // Check if the local storage contains the key 'username'
    const usernameFromStorage = localStorage.getItem('username');
    if (usernameFromStorage) {
      setUsername(usernameFromStorage);
    } else {
      console.error('Username not found in local storage');
    }
  }, []);

  const technicalSubcategories = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Fiverr Logo Maker",
    "Programming & Tech",
    "Data",
    "Business",
    "Personal Growth & Hobbies",
    "Photography",
    "End-to-End Projects",
    "Sitemap",
  ];

  const nonTechnicalSubcategories = [
    "Cleaning Services",
    "Appliance Repair",
    "Pest Control",
    "Plumbing",
    "Electrical Services",
    "Carpentry",
    "Painting Services",
    "Salon at Home",
    "Massage Services",
    "Makeup Services",
    "Hair Care",
    "Personal Training",
    "Diet Consultation",
    "Home Interior Design",
    "AC Installation and Maintenance",
    "Water Purifier Installation and Service",
    "Geyser Installation and Repair",
    "Photography",
    "Painting and Waterproofing",
    "Packers and Movers",
    "Event Planning and Catering",
    "Carpet and Sofa Cleaning",
    "CCTV Installation",
    "Smart Home Solutions",
    "Home Security System Installation",
    "Car Cleaning",
    "Home Nurse Services",
    "Physiotherapy",
    "Elderly Care",
  ];

  const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Nagercoil",
    "Thanjavur",
    "Dindigul",
    "Cuddalore",
    "Kanchipuram",
    "Kumarapalayam",
    "Hosur",
    "Karaikudi",
  ];

  const handleFileChange = (e) => {
    if (e.target.name === "coverImage") {
      setCoverImage(e.target.files[0]);
    } else if (e.target.name === "uploadImage") {
      setUploadImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Username before submit:', username); // Debug statement

    if (!title || !category || !subcategory || !location || !description || !deliveryTime || !price) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("serviceTitle", serviceTitle);
    formData.append("shortDescription", shortDescription);
    formData.append("deliveryTime", deliveryTime);
    formData.append("revisionNumber", revisionNumber);
    formData.append("price", price);
    formData.append("username", username); // Make sure this is included

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    if (uploadImage) {
      formData.append("uploadImage", uploadImage);
    }

    try {
      const response = await fetch("http://localhost:8080/api/services", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      alert("Service added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the service");
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1 className="contag">List your service</h1>
        <form className="sections" onSubmit={handleSubmit}>
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="e.g. I will do something I'm really good at"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(""); // Reset subcategory when category changes
              }}
            >
              <option value="">Select a category</option>
              <option value="Technical">Technical Services</option>
              <option value="Non-Technical">Non-Technical Services</option>
            </select>
            <label htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category} // Disable subcategory if no category is selected
            >
              <option value="">Select a subcategory</option>
              {(category === "Technical" ? technicalSubcategories : nonTechnicalSubcategories).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="location">Location</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select your location</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <label htmlFor="coverImage">Cover Image</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleFileChange}
            />
            <label htmlFor="uploadImage">Upload Image</label>
            <input
              type="file"
              id="uploadImage"
              name="uploadImage"
              onChange={handleFileChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Create</button>
          </div>
          <div className="details">
            <label htmlFor="serviceTitle">Service Title</label>
            <input
              type="text"
              id="serviceTitle"
              placeholder="e.g. One-page web design"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
            />
            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              id="shortDescription"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              id="deliveryTime"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              id="revisionNumber"
              value={revisionNumber}
              onChange={(e) => setRevisionNumber(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="e.g. $50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
