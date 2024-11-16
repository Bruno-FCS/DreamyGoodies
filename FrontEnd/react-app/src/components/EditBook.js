import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState([]);
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    author: "",
    pages: 0,
    genres: [],
    rating: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication status
  const token = localStorage.getItem("token"); // Get token from localStorage

  const { id } = useParams();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true); // Set authentication status to true if token exists
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/book/edit/${id}`, {
          headers: {
            Authorization: token, // Include token in request headers
          },
        });
        const data = await response.json();

        setBook(data.book);
        setGenres(data.genres);

        // Map over the genres and set the initial state of updatedBook.genres
        const initialGenres = data.genres.map((genre) =>
          data.book.genres.includes(genre) ? genre : null
        );

        setUpdatedBook({
          title: data.book.title,
          author: data.book.author,
          pages: data.book.pages,
          genres: initialGenres,
          rating: data.book.rating,
        });
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [id, token]); // Include token in the dependency array

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: type === "checkbox" ? [...prevBook[name], value] : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: checked
        ? [...prevBook[name], value]
        : prevBook[name].filter((genre) => genre !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedBook);

    const uniqueGenres = [
      ...new Set(updatedBook.genres.filter((genre) => genre !== null)),
    ];
    const sendData = {
      title: updatedBook.title,
      author: updatedBook.author,
      pages: updatedBook.pages,
      genres: uniqueGenres,
      rating: updatedBook.rating,
    };

    fetch(`http://demo-vercel-deploy-server.vercel.app/book/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Include token in request headers
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        alert("Book sucessfully updated");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  return (
    <div className="edit-book-container">
      {isLoggedIn ? ( // Check authentication status
        <>
          <h1>{book.title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                className="form-control"
                name="title"
                type="text"
                value={updatedBook.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Author:</label>
              <input
                className="form-control"
                name="author"
                type="text"
                value={updatedBook.author}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Pages:</label>
              <input
                className="form-control"
                name="pages"
                type="number"
                value={updatedBook.pages}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Genres:</label>
              {genres &&
                genres.map((genre) => (
                  <div key={genre}>
                    <input
                      className="form-control"
                      name="genres"
                      type="checkbox"
                      value={genre}
                      checked={updatedBook.genres.includes(genre)}
                      onChange={handleCheckboxChange}
                    />
                    <label>{genre}</label>
                  </div>
                ))}
            </div>

            <div className="form-group">
              <label>Rating:</label>
              <input
                className="form-control"
                name="rating"
                type="number"
                value={updatedBook.rating}
                onChange={handleInputChange}
              />
            </div>

            <br />
            <input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
    </div>
  );
};

export default EditBook;
