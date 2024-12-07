import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

const ProductsPage = ({ products, setProducts, categories, setCategories }) => {
  const [productName, setProductName] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([...products]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
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
    <div>
      <Navbar />

      <div className="container table-section" style={{ minHeight: "504px" }}>
        <div style={{ marginTop: "40px", gap: "10%", display: "flex" }}>
          <input
            type="text"
            placeholder="Product Name"
            style={{ width: "80%" }}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button
            style={{
              width: "150px",
              backgroundColor: "#ff9f9f",
              color: "black",
              borderColor: "#f9d639",
              padding: "7px",
              borderRadius: "5px",
            }}
            onClick={handleSearchProduct}
          >
            Search
          </button>
        </div>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {categories.map((category) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <input
                type="checkbox"
                style={{
                  margin: 0,
                }}
                value={category.name}
                onChange={(e) => handleSelectCategory(e.target.value)}
              />
              <p
                style={{
                  margin: 0,
                }}
              >
                {category.name}
              </p>
            </div>
          ))}
        </div>
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 243px))",
            gap: "20px",
          }}
        >
          {displayedProducts.map((product, index) => {
            return <ProductCard key={"key" + index} product={product} />;
          })}
        </div>
        <br />
        <br />
      </div>
      <Footer pos={"relative"} />
    </div>
  );
};

export default ProductsPage;
