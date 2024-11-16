import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import NavBar from "./NavBar";
// import '../stylesheets/BookBlock.css';

const Index = ({ title, books }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
      console.log(decoded);
    }
  }, []);

  return (
    <div className="index-container">
      <NavBar />
      <h1>{title}</h1>
      {userName && <p>Hello, {userName}!</p>}
      {books.map((book) => (
        <div key={book._id} className="book-container">
          <div className="title-box">
            <label className="book-title">
              <a href={`/book/${book._id}`} className="title-link">
                {book.title}
              </a>
            </label>
          </div>
          <div className="info-box">
            <p className="book-info">Author: {book.author}</p>
            <p className="book-info">Pages: {book.pages}</p>
            <p className="book-info">Rating: {book.rating}</p>
            <p className="book-info">Genres:</p>
            <ul className="genre-list">
              {book.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <br />
      <br />
    </div>
  );
};

export default Index;
