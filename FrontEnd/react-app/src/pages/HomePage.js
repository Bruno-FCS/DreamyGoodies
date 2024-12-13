import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const HomePage = ({ products }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel />
      <div className="container table-section">
        {userName && (
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff9f9f",
              marginTop: "1.5rem",
            }}
          >
            Hello and welcome, {userName}!
          </p>
        )}
        <div
          className="product-grid"
          style={{
            marginTop: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <br />
        <br />

          <div className="reviews-container">
              <h2>Reviews</h2>
              <div className="reviews-content">
                  <p className="review-item">
                      Dreamy Goodies is such a wonderful business! I loved that they have so many options for their cakes!
                  </p>
                  <p className="review-item">
                      I've never bought any baked goods online before and Dreamy Goodies made it so easy!
                  </p>
                  <p className="review-item">
                      Review three
                      a <br/>
                      a <br/>
                      a <br/>
                      a <br/>
                  </p>
                  <p className="review-item">
                      Review four
                      a <br/>
                      a <br/>
                      a<br/>
                      a<br/>
                  </p>
              </div>
          </div>
      </div>
        <Footer/>
    </div>
  );
};

export default HomePage;
