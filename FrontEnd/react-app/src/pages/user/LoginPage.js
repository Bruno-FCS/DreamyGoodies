import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";
import Footer from "../../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BACKEND + "/auth/login",
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
      alert("Welcome to Dreamy Goodies! Happy shopping!");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };
  const handleRegister = () => {
    window.location.href = "/register";
  };

  const githubLogin = () => {
    window.location.href =
      process.env.REACT_APP_API_BACKEND + "/oauth2/authorization/github";
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
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              </p>
          )}
          <form onSubmit={handleLogin}>
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

          <button onClick={githubLogin} id="btn-register">
            Login with GitHub
          </button>
        </div>
      </div>
      <Footer pos={"relative"}/>
    </div>
  );
};
export default Login;
