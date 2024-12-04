import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";
import { jwtDecode } from "jwt-decode";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const scope = decodedToken?.scope;
  const isAuthorized = scope === "ADMIN";

  useEffect(() => {
    if (token) {
      fetch(process.env.REACT_APP_API_BACKEND + "/contactus/message/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || "-"}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="container table-section">
        {isAuthorized ? (
          <>
            <h1 className="table-title" style={{ margin: "20px 0" }}>
              Messages
            </h1>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-warning">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id}>
                      <td>{msg.id}</td>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!messages ||
                (messages.length === 0 && (
                  <p className="text-center">No messages available</p>
                ))}
            </div>
          </>
        ) : (
          <p
            className="text-center"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#39b575",
            }}
          >
            You are not authorized to view this page.
          </p>
        )}
      </div>
      <Footer pos="absolute" />
    </div>
  );
};

export default MessagesPage;
