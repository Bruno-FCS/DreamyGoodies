import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({
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

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(process.env.REACT_APP_API_BACKEND + "/categories")
          .then((response) => response.json())
          .then((data) => setFetchedCategories(data))
          .catch((error) => console.error("Error fetching categories:", error));

        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND}/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        setProduct(data);

        setUpdatedProduct({
          name: data.name,
          price: data.price,
          url: data.url,
          description: data.description,
          categories: data.categories,
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckCategory = (e) => {
    const { id, name } = e.target;
    const parsedId = parseInt(id);

    setUpdatedProduct((prevProduct) => {
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

    var decodedToken = jwtDecode(token);
    console.log(decodedToken);

    const sendData = {
      name: updatedProduct.name,
      price: updatedProduct.price,
      url: updatedProduct.url,
      description: updatedProduct.description,
      categories: updatedProduct.categories,
    };

    fetch(`${process.env.REACT_APP_API_BACKEND}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
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
        alert("Product successfully updated");
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
        className="edit-product-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#f5f5f5",
        }}
      >
        {isAuthorized ? (
          <div className="form">
            <h1>{product.title}</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name: </label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  value={updatedProduct.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Price: </label>
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Image URL: </label>
                <input
                  className="form-control"
                  name="url"
                  type="text"
                  value={updatedProduct.url}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Description: </label>
                <textarea
                  className="form-control"
                  name="description"
                  type="text"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Categories: </label>

                {fetchedCategories.map((category, index) => (
                  <div key={"key" + index}>
                    <label>{category.name}</label>
                    <input
                      type="checkbox"
                      name={category.name}
                      id={category.id}
                      onChange={handleCheckCategory}
                      checked={updatedProduct.categories.some(
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

export default EditProduct;
