import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const ProductsPage = ({ products, categories }) => {
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([...products]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectCategory = (value) => {
    selectedCategories.includes(value)
      ? setSelectedCategories(
          [...selectedCategories].filter((category) => category != value)
        )
      : setSelectedCategories([...selectedCategories, value]);

    console.log(selectedCategories);
  };

  const handleSearchProduct = () => {
    setDisplayedProducts(
      [...products].filter((product) => product.name.includes(productName))
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
      console.log(decoded);
    }
  }, []);

  return (
    <div
      className="index-container"
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      {userName && (
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#39b575",
            marginBottom: "1.5rem",
          }}
        >
          Hello, {userName}!
        </p>
      )}
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleSearchProduct}>Search</button>
      {categories.map((category) => (
        <div>
          <input
            type="checkbox"
            value={category.name}
            onChange={(e) => handleSelectCategory(e.target.value)}
          />
          <p>{category.name}</p>
        </div>
      ))}
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <br />
      <br />
      <Footer pos={"sticky"} />
    </div>
  );
};

export default ProductsPage;
