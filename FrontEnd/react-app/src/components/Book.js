import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Book = () => {
  const [book, setBook] = useState({});
  const [posted_by, setPosted_by] = useState({});
  const [posted_by_name, setPosted_by_name] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication status
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set authentication status to true if token exists
    }

    // Fetch individual book data when the component mounts
    fetch(`http://localhost:8000/book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBook(data.book);
        setPosted_by(data.book.posted_by);
        setPosted_by_name(data.posted_by);
      })
      .catch((error) => console.error("Error fetching book data:", error));
  }, [id]); // Include id in the dependency array to fetch data when id changes

  // Check if book data is available
  if (!book || Object.keys(book).length === 0) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/book/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Handle success message
        alert("Successfully deleted");
        window.location.href = "/"; // Redirect to the home page
      } else {
        console.error("Error deleting book:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Decode the token to get the user ID
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  console.log(userId);

  // Check if the user is authorized to edit or delete the book
  const isAuthorized = isLoggedIn && posted_by === userId;

  return (
    <div className="book-container-book">
      <h1 className="book-title">{book.title}</h1>
      <h5 className="book-author">Written by {book.author}</h5>
      <h5>Posted by: {posted_by_name}</h5> {/* Display the posted_by_name */}
      <div className="book-details">
        <p>Rating: {book.rating}</p>
        <p>Pages: {book.pages}</p>
        <label>Genres:</label>
        <ul>
          {book.genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
      <div className="book-btn-container">
        {isAuthorized && ( // Check if the user is authorized
          <div>
            <Link
              className="book-btn edit-book-btn"
              to={`/book/edit/${book._id}`}
            >
              Edit Book
            </Link>
            {/* Button to delete book */}
            <button
              className="book-btn delete-book-btn"
              data-id={book._id}
              onClick={handleDelete}
            >
              Delete Book
            </button>
          </div>
        )}
      </div>
      {/* Additional book details or actions can be added here */}
    </div>
  );
};

export default Book;
