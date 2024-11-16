import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AddBook = () => {
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: 0,
    genres: [],
    rating: 0,
  });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null; // Assuming id is the key for user id in the decoded token

  useEffect(() => {
    if (token) {
      // Token exists, user is authorized
      setIsAuthorized(true);

      // Fetch genres when the component mounts
      fetch("http://localhost:8000/book/add", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => setGenres(data.genres))
        .catch((error) => console.error("Error fetching genres:", error));
    } else {
      // Token does not exist, user is not authorized
      setIsAuthorized(false);
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? [...prevFormData[name], value] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(userId);

    // Add user id to the form data
    const dataToSend = { ...formData, id: userId };

    // Make a POST request to submit the form data
    fetch("http://localhost:8000/book/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add Book successful:", data);
        alert("book added Successfully!");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  if (!isAuthorized) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>Please log in to add a book.</p>
        <a href="/login">log in</a>
      </div>
    );
  }

  return (
    <div className="add-book-container">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div id="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Author:</label>
          <input
            className="form-control"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Pages:</label>
          <input
            className="form-control"
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Genres:</label>
          {genres.map((genre) => (
            <div key={genre}>
              <input
                className="form-control"
                name="genres"
                type="checkbox"
                value={genre}
                onChange={handleInputChange}
              />
              <label>{genre}</label>
            </div>
          ))}
        </div>

        <div id="form-group">
          <label>Rating:</label>
          <input
            className="form-control"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddBook;
