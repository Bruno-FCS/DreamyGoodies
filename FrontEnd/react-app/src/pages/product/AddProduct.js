import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AddProduct = () => {
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    url: "",
    description: "",
    categories: [],
  });

  const isLoggedIn = localStorage.getItem("token") !== null;
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const scope = decodedToken ? decodedToken.scope : "";
  const isAuthorized = isLoggedIn && scope === "ADMIN";

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BACKEND + "/categories")
      .then((response) => response.json())
      .then((data) => setFetchedCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckCategory = (e) => {
    const { id, name } = e.target;
    const parsedId = parseInt(id);

    setNewProduct((prevProduct) => {
      const isAlreadyIncluded = prevProduct.categories.some(
        (category) => category.id === parsedId && category.name === name
      );

      return {
        ...prevProduct,
        categories: isAlreadyIncluded
          ? prevProduct.categories.filter(
              (category) => category.id !== parsedId
            )
          : [...prevProduct.categories, { id: parsedId, name }],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);

    fetch(process.env.REACT_APP_API_BACKEND + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(() => {
        alert("Add Product successfully added");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div
      className="index-container"
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div
        className="add-product-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        {isAuthorized ? (
          <div
            className="add-product-form"
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "2rem",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
              Add New Product
            </h1>
            <form onSubmit={handleSubmit}>
              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Name:
                </label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Price:
                </label>
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Image URL:
                </label>
                <input
                  className="form-control"
                  name="url"
                  type="text"
                  value={newProduct.url}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Description:
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  type="text"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Categories:
                </label>

                {fetchedCategories.map((category, index) => (
                  <div key={"key" + index}>
                    <label>{category.name}</label>
                    <input
                      type="checkbox"
                      name={category.name}
                      id={category.id}
                      onChange={handleCheckCategory}
                      checked={newProduct.categories.some(
                        (cat) =>
                          cat.id === category.id && cat.name === category.name
                      )}
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: "#ff9f9f",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff9f9f",
            }}
          >
            You are not authorized to view this page.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
