import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="product-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <img src={product.image} width={100} alt="product_image" /> */}
      <div className="title-box">
        <label className="product-title">
          <Link
            to={`/product/${product.id}`}
            style={{
              color: "#39b575",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            {product.name}
          </Link>
        </label>
      </div>
      <div className="info-box">
        <p className="product-info">CAD$ {product.price.toFixed(2)}</p>
        {/* <p className="product-info">Rating: {product.rating} / 5</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
