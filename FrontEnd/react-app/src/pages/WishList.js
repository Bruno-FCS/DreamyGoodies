import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartIcon from "../assets/cart.png";

const WishList = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("wishlist")));
  }, []);

  const handleAddToCart = (product) => {
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
      let parsedCart = JSON.parse(savedCart);
      let existingProduct = parsedCart.find(
        (searchedProd) => searchedProd.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        parsedCart.push({
          ...product,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, quantity: 1 }])
      );
    }

    let pr_name =
      product.name.length > 20
        ? product.name.slice(0, 25) + "..."
        : product.name;

    alert(`${pr_name} was added to the cart!`);
  };

  const handleDeleteItem = (selectedProduct) => {
    setWishList(
      wishList.filter((product) => product.id !== selectedProduct.id)
    );
    localStorage.setItem("cart", JSON.stringify(wishList));
  };

  return (
    <div>
      <Navbar />
      <div className="container table-section" style={{ minHeight: "524px" }}>
        <h1 className="table-title" style={{ margin: "20px 0" }}>
          Wishlist
        </h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <tbody>
              {wishList.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.url} width={100} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "#fca9a9",
                        color: "white",
                        width: "40px",
                        height: "40px",
                        borderRadius: "5px",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "5px",
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      <img src={CartIcon} />
                    </button>
                    <button
                      style={{
                        backgroundColor: "crimson",
                        color: "white",
                        width: "40px",
                        height: "40px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => handleDeleteItem(product)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default WishList;
