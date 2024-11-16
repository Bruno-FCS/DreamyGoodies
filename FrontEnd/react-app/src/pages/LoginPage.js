import { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mw-project-be.vercel.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err) => err.msg));
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
    alert("Welcome to e-Shop! Happy shopping!");
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

          {error && <p className="error">{error}</p>}
          {errors.length > 0 && (
            <ul className="error">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
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
            <div className="btn-group">
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
      <Footer pos={"absolute"} />
    </div>
  );
};
export default Login;
