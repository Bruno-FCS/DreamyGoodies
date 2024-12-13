import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/trash.png";
import AddIcon from "../../assets/add.png";
import MinusIcon from "../../assets/minus.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const [points, setPoints] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        const scope = decodedToken.scope;
        setIsAuthorized(scope === "ADMIN");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        setIsAuthorized(false);
      }
    }

    fetch(`${process.env.REACT_APP_API_BACKEND}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [id]);

  if (!product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND}/products/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          var data;
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
          } else {
            data = await response.text();
          }
          console.log(data);
            toast.success("Successfully deleted!");
          // alert("Successfully deleted");
          window.location.href = "/";
        } else {
          console.error("Error deleting product:", response.statusText);
        }
      } else {
        console.error("No token found in local storage");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = (id) => {
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
      let parsedCart = JSON.parse(savedCart);
      let existingProduct = parsedCart.find((product) => product.id === id);
      console.log(existingProduct);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        parsedCart.push({
          ...product,
          quantity: quantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, quantity: quantity }])
      );
    }
    let pr_name =
      product.name.length > 20
        ? product.name.slice(0, 25) + "..."
        : product.name;

    if (!isLoggedIn) {
        toast.error("Please login to access your added items")
      window.location.href = "/login";
      // alert("Please login to access your added items!");
    } else {
        toast.success(`${pr_name} was added to the cart!`)
      // alert(`${pr_name} was added to the cart!`);

    }
  };

  const handleAddToWishlist = (id) => {
    let wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      let parsedWishlist = JSON.parse(wishlist);
      let existingProduct = parsedWishlist.find((product) => product.id === id);
      if (!existingProduct) {
        parsedWishlist.push(product);
      }
      localStorage.setItem("wishlist", JSON.stringify(parsedWishlist));
    } else {
      localStorage.setItem("wishlist", JSON.stringify([product]));
    }
    let pr_name =
      product.name.length > 20
        ? product.name.slice(0, 25) + "..."
        : product.name;

    if (!isLoggedIn) {
        toast.error("Please login to access your added items!");
      window.location.href = "/login";
      // alert("Please login to access your added items!");
    } else {
        toast.success(`${pr_name} was added to the wishlist!`);
      // alert(`${pr_name} was added to the wishlist!`);
    }
  };

  return (
      <div>
        <Navbar/>
        <div className="container table-section" style={{minHeight: "444px"}}>
            <ToastContainer/>
          <div
              className="product-details"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                padding: "20px",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                marginTop: 100,
                marginBottom: 100,
              }}
          >
            <img src={product.url} width={250} alt="product_image" style={{borderRadius: "50px"}}/>
            <div>
              <h1 className="product-title">{product.name}</h1>
              <h3 className="product-price">CAD$ {product.price.toFixed(2)}</h3>
              <div className="product-details">
                <p>
                  {product.categories.length > 1 ? "Categories" : "Category"}:{" "}
                  {product.categories.map((category, index) => (
                      <span key={"key" + index}>
                    {category.name}
                        {index < product.categories.length - 1 && ", "}
                  </span>
                ))}
              </p>
                  <p>Weight: {product.weight}g</p>
              <p>Description: {product.description}</p>
            </div>
            <div className="product-actions">
              {isAuthorized && (
                <div>
                  <Link
                    className="product-btn edit-product-btn"
                    to={`/product/edit/${product.id}`}
                    style={{
                      backgroundColor: "#fca9a9",
                      // color: "white",
                      // textDecoration: "none",
                      padding: "5px",
                      borderRadius: "5px",
                      // fontSize: "13px",
                      margin: 5,
                    }}
                  >
                    <img
                        src={EditIcon}
                        alt="edit icon"
                    />
                  </Link>
                  <button
                    className="product-btn delete-product-btn"
                    data-id={product.id}
                    onClick={handleDelete}
                    style={{
                      backgroundColor: "#fca9a9",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                      fontSize: "13px",
                      margin: 5,
                      alignSelf: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                        src={DeleteIcon}
                    />
                  </button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  width: 300,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                  style={{
                    backgroundColor: "#fca9a9",
                    // color: "white",
                    border: "none",
                    padding: "5px 5px",
                    borderRadius: "5px",
                    // cursor: "pointer",
                  }}
                >
                  <img src={MinusIcon} />
                </button>
                <div>{quantity}</div>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  style={{
                    backgroundColor: "#fca9a9",
                    // color: "white",
                    border: "none",
                    padding: "5px 5px",
                    borderRadius: "7px",
                    margin: "2px",
                  }}
                >
                  <img src={AddIcon}/>
                </button>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  style={{

                    backgroundColor: "#fca9a9",
                    color: "white",
                    border: "none",
                    padding: "5px 7px",
                    borderRadius: "5px",
                    marginTop: 2,
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product.id)}
                  style={{
                    backgroundColor: "#fca9a9",
                    color: "white",
                    border: "none",
                    padding: "5px 7px",
                    borderRadius: "5px",
                    marginTop: 2,
                    cursor: "pointer",
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <Footer/>
      </div>
  );
};

export default ProductPage;
