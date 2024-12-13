import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddIcon from "../assets/add.png";
import MinusIcon from "../assets/minus.png"

const TAX = 0.13;

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [display, setDisplay] = useState("none");

  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    updateCart(updatedCart);
  };

  const handleCheckOut = () => {
    updateCart([]);
    setDisplay("flex");
  };

  const totalPrice = () => {
    return cart
      .map((product) => product.price * product.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toFixed(2);
  };
  const shippingFee = () => {
  //applying fee if the total price is under a certain price point, encouraging the user to buy more
    if(totalPrice() <= 15.00){
      return 5.00;
    }
    else {
      return 0.00;
    }
  };

  return (
    <div
      className="index-container"
      style={{
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div style={{ minHeight: "544px", paddingTop: "40px" }}>
        <div
          style={{
            backgroundColor: "#3495EB",
            color: "white",
            width: 600,
            textAlign: "center",
            padding: 10,
            margin: 10,
            display: display,
          }}
        >
          Your order has been processed successfully, thank you for shopping
          with Dreamy Goodies!
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {cart.map((product) => (
            <div
              key={"key" + product.id}
              className="product-container"
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "50%",
                backgroundColor: "white",
              }}
            >
              <img src={product.url} width={75} alt={product.name} />
              <div className="title-box">
                <label className="product-title">
                  <a
                    href={`/product/${product.id}`}
                    className="title-link"
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {product.name}
                  </a>
                </label>
              </div>
              <div className="info-box">
                <p className="product-info">
                  Unit price: CAD$ {product.price.toFixed(2)}
                </p>
                <p className="product-info">
                  Quantity:{" "}
                  <button
                    style={{
                      backgroundColor: "#ff9f9f",
                      color: "white",
                      border: "none",
                      padding: "2px 10px",
                      // borderRadius: "5px",
                      marginRight: 2,
                      cursor: "pointer",
                      // padding: "5px 5px",
                      borderRadius: "5px",

                    }}
                    onClick={() => handleDecreaseQuantity(product.id)}
                  >
                    <img src={MinusIcon}/>
                  </button>
                  {product.quantity}
                  <button
                    style={{
                      backgroundColor: "#ff9f9f",
                      color: "white",
                      border: "none",
                      padding: "2px 10px",
                      borderRadius: "5px",
                      marginLeft: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleIncreaseQuantity(product.id)}
                  >
                    +
                  </button>
                </p>
                <p className="product-info" style={{ fontWeight: "bold" }}>
                  Subtotal: CAD$ {(product.quantity * product.price).toFixed(2)}
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#ff9f9f",
                  color: "white",
                  border: "none",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: 8,
                }}
                onClick={() => handleRemoveFromCart(product.id)}
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "5px",
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                width: "50%",
                backgroundColor: "white",
                marginTop: 10,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  margin: 8,
                }}
              >
                Summary
              </div>
              <div>Total: CAD$ {totalPrice()}</div>
              <div>Tax (13%): CAD$ {(totalPrice() * TAX).toFixed(2)}</div>
              <div>Shipping Fee: ${(shippingFee() ).toFixed(2)}</div>
              <div style={{ fontWeight: "bold" }}>
                Final Price: CAD$ {(totalPrice() * (1 + TAX) + (shippingFee() * (1 + TAX))).toFixed(2)}
              </div>

              <button
                style={{
                  backgroundColor: "#ff9f9f",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  marginTop: 8,
                  marginBottom: 8,
                  cursor: "pointer",
                }}
                onClick={handleCheckOut}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                color: "#143A27",
                marginTop: 50,
                marginBottom: 50,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                gap: "20px",
                padding: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                width: "80%",
              }}
            >
              <img
                src={require("../assets/empty-cart.png")}
                width={350}
                alt="empty cart image"
              />
              Your cart is empty...
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
