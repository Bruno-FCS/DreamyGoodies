import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";
import Footer from "../../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e, type) => {
    e.preventDefault();
    if (type === "form") {
      // Handle form-based login
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("Invalid credentials");
          } else {
            throw new Error(response.statusText || "An error occurred");
          }
          return;
        }

        const data = await response.json();
        const token = data.accessToken;
        localStorage.setItem("token", token);
        console.log("Login successful");
        // alert("Welcome to Dreamy Goodies! Happy shopping!");
        window.location.href = "/"; // Redirect to homepage
      } catch (error) {
        setError(error.message);
      }
    } else if (type === "github") {
      // Handle GitHub OAuth login
      let port = window.location.port ? `:${window.location.port}` : "";
      if (port === ":3000") {
        port = ":8080"; // Adjust port for backend API
      }
      window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/github`;
    }
  };
  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="index-container" style={{ overflow: "hidden" }}>
      <Navbar />
      <div className="form-container">
        <div className="form">
          <div className="form-header">
            <h1>Login</h1>
            <img
                src={require("../../assets/logo.png")}
                width={100}
                alt="logo"
                style={{marginLeft: "1rem"}}
            />
          </div>
          {error && (
            <p>
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </p>
          )}
          <form
            onSubmit={(e) => {
              handleLogin(e, "form");
            }}
          >
            <div className="form-group">
              <label>
                Email:
              </label>
              <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label> Password: </label>
              <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn-log-in">
                Login
              </button>
              <p> Haven't registered? Register here! </p>
              <button onClick={handleRegister} id="btn-register">
                Create an account
              </button>
            </div>
          </form>

          <hr/>
          <button
            onClick={(e) => handleLogin(e, "github")}
            className="btn-log-in"
            style={{ marginTop: "1rem" }}
          >
            Login with GitHub
          </button>
        </div>
      </div>
      <Footer pos={"relative"}/>
    </div>
  );
};
export default Login;
