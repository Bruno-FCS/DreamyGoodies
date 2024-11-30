import { useState } from "react";
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
      alert("Welcome to e-Shop! Happy shopping!");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };
  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div
      className="index-container"
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Login</h1>

          {error && (
            <p>
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            </p>
          )}
          <form onSubmit={handleLogin}>
            <div
              className="form-group"
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Email:
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div
              className="form-group"
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Password:
              </label>
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
              <p style={{ color: "#143a27" }}>
                Haven't registered? Register here!
              </p>
              <button onClick={handleRegister} id="btn-register">
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer pos={"relative"} />
    </div>
  );
};
export default Login;
