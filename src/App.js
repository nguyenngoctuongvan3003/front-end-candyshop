// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import SignIn from "./pages/SignIn";
import ProductDetail from "./pages/ProductDetail";
import Homepage from "./pages/Homepage";
import ManageProduct from "./pages/ManageProduct";
import ManageOrder from "./pages/ManageOrder";
import ManageUser from "./pages/ManageUser";
import ManageUserDetail from "./pages/ManageUserDetail";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/product/:subCategoryId" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/search/:keyword" element={<Product />} />
          <Route path="/product/manage/:productId" element={<ManageProduct />} />
          <Route path="/product/manage/" element={<ManageProduct />} />
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/order/manage" element={<ManageOrder />} />
          <Route path="/user/manage" element={<ManageUser />} />
          <Route path="/user/manage/detailUser" element={<ManageUserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
