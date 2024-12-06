import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const scope = decodedToken ? decodedToken.scope : "";
  const isAuthorized = isLoggedIn && scope === "ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <nav className="navbar">
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("../assets/logo.png")}
          width={60}
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
        <Link id="links" to="/products">
          Products
        </Link>
        <Link id="links" to="/contactus">
          Contact Us
        </Link>
          <Link id="links" to="/faq">
              FAQ
          </Link>
        {isLoggedIn && (
          <>
            {isAuthorized && (
              <>
                  <Link id="links" to="/product/add">
                    Add Product
                  </Link>
                  <Link id="links" to="/messages">
                    Messages
                  </Link>
              </>

            )}
              <Link id="links" to="/wishlist">
                  Wishlist
              </Link>
            <Link id="links" to="/cart">
              Cart
            </Link>
              <Link id="links" to="/user-profile">
                  User Profile
              </Link>
            <button className="log_out_btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link id="links" to="/register">
              Register
            </Link>
            <Link id="links" to="/login">
              Login
            </Link>
          </>
        )}
        {/* {isAuthorized && (
          <Link
            to="/product/add"
            
          >
            Add Product
          </Link>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
