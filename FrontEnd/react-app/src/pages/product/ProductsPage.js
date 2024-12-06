import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

const ProductsPage = ({ products, setProducts, categories, setCategories }) => {
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([...products]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
    }

    if (products.length === 0) {
      fetch(process.env.REACT_APP_API_BACKEND + "/products")
        .then((response) => response.json())
        .then((data) => setDisplayedProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }

    if (categories.length === 0) {
      fetch(process.env.REACT_APP_API_BACKEND + "/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
    }

    setDisplayedProducts(
      [...products].filter((product) =>
        selectedCategories.every((category) =>
          product.categories
            .map((c) => c.name.toLowerCase())
            .includes(category.toLowerCase())
        )
      )
    );
  }, [products, categories, setProducts, setCategories, selectedCategories]);

  const handleSelectCategory = (value) => {
    selectedCategories.includes(value)
      ? setSelectedCategories(
          [...selectedCategories].filter((category) => category !== value)
        )
      : setSelectedCategories([...selectedCategories, value]);
  };

  const handleSearchProduct = () => {
    setDisplayedProducts(
      [...products].filter((product) =>
        product.name.toLowerCase().includes(productName.toLowerCase())
      )
    );
  };

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
            color: "#ff9f9f",
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
        {displayedProducts.map((product) => {
          return <ProductCard key={"key" + product.id} product={product} />;
        })}
      </div>
      <br />
      <br />
      <Footer pos={"sticky"} />
    </div>
  );
};

export default ProductsPage;
