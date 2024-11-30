import { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_BACKEND + "/contactus/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
      setSuccess("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="index-container" style={{ overflow: "hidden" }}>
      <Navbar />
      <div className="contact-container">
        <div className="contact-form">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
            Contact Us
          </h1>

          {error && (
            <p>
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            </p>
          )}
          {success && (
            <p>
              <div class="alert alert-primary" role="alert">
                {success}
              </div>
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Name:
              </label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Email:
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Message:
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn-contact">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer pos={"relative"} />
    </div>
  );
};

export default ContactUs;