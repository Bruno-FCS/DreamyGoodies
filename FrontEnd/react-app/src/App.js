// // Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CartPage from "./pages/CartPage";
import FAQPage from "./pages/FAQPage";
import ContactUsPage from "./pages/ContactUsPage";
import MessagesPage from "./pages/MessagesPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BACKEND + "/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));

    fetch(process.env.REACT_APP_API_BACKEND + "/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/products"
          element={<ProductsPage products={products} categories={categories} />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
