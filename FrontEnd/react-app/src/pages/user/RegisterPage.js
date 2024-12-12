import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const scope = decodedToken ? decodedToken.scope : "";
  const isAuthorized = isLoggedIn && scope === "ADMIN";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = [];

    if (!formData.name) {
      fieldErrors.push("Name is required");
    }
    if (!formData.email) {
      fieldErrors.push("Email is required");
    }
    if (!formData.password) {
      fieldErrors.push("Password is required");
    }
    if (!formData.confirm_password) {
      fieldErrors.push("Confirm password is required");
    }
    if (formData.password !== formData.confirm_password) {
      fieldErrors.push("Password and Confirm password must be the same");
    }
    if (isAuthorized && !formData.role) {
      fieldErrors.push("Role is required");
    }

    if (fieldErrors.length > 0) {
      setErrors(fieldErrors.map((msg, index) => ({ id: index, msg })));
      return;
    }

    try {
      const endpoint = isAuthorized
        ? "/users/admin/register"
        : "/users/register";
      const response = await fetch(
        process.env.REACT_APP_API_BACKEND + endpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isAuthorized && token
              ? { Authorization: `Bearer ${token}` }
              : {}),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.text(); // return String from Backend
      if (!response.ok) {
        setErrors([{ id: 0, msg: data }]);
      } else {
        console.log("User registered successfully");
        setMessage("Registration successful!");
        setErrors([]);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          role: "",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrors([{ id: 0, msg: "Something went wrong." }]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="index-container"
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="form-container">
        <div className="form">
          <div className="form-header">
            <h1>Register</h1>
            <img
              src={require("../../assets/logo.png")}
              width={100}
              alt="logo"
              style={{ marginLeft: "1rem" }}
            />
          </div>
          {errors.length > 0 && (
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              {errors.map((error) => (
                <p>
                  <div key={error.id} class="alert alert-danger" role="alert">
                    {error.msg}
                  </div>
                </p>
              ))}
            </div>
          )}
          {message && (
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <p>
                <div class="alert alert-success" role="alert">
                  {message}
                </div>
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label> Name: </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label> Email: </label>
              <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {isAuthorized && (
              <div class="form-group">
                <label for="inputState">Role</label>
                <select
                  id="inputState"
                  name="role"
                  class="form-control"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    Choose...
                  </option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label> Password: </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label> Confirm Password: </label>
              <input
                className="form-control"
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>

            <button
              id="reg-btn"
              type="submit"

            >
              Complete registration
            </button>
            <Link className="m-3 btn-log-in" to="/login" style={{textDecoration: "none"}}>
              Have an account? Login!
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
