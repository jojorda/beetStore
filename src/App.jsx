import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Forgot from "./Auth/FogotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductsList from "./pages/Products/ProductsList";
import ProductsDetail from "./pages/Products/ProductsDetail";
import ProductKeranjang from "./pages/Products/ProductKeranjang";
import Profile from "./pages/Account/Profile";
import CheckOut from "./pages/Products/CheckOut";
import NewPassword from "./Auth/NewPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/forgotPassword" element={<Forgot />} />
          <Route exact path="/new_Password" element={<NewPassword />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/products/:id" element={<ProductsList />} />
          <Route
            exact
            path="/products/detail/:id"
            element={<ProductsDetail />}
          />
          <Route
            exact
            path="/products/keranjang"
            element={<ProductKeranjang />}
          />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/CheckOut" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
