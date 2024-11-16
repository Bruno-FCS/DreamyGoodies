import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.name : "";
  const isAuthorized = isLoggedIn && userName === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("../assets/e-Shop-s.png")}
          width={100}
          alt="logo"
          style={{ marginRight: "1rem" }}
        />
      </Link>
      <div
        className="navbar-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {isLoggedIn && (
          <>
          {isAuthorized && (
              <Link
                to="/product/add"
                style={{ color: "white", textDecoration: "none" }}
              >
                Add Product
              </Link>
            )}
            <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
              Cart
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#39b575",
                color: "white",
                borderColor: "#143a27",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </>
        )}
        {/* {isAuthorized && (
          <Link
            to="/product/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Product
          </Link>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
