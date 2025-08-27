import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/admin/Users";
import ManageProducts from "./pages/admin/Products";
import ManageOrders from "./pages/admin/Orders";
import Dashboard from "./pages/admin/Dashboard";

import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPages";
import ProductDetailPage from "./pages/ProductDetailPage";

import { ProductsProvider } from "./context/ProductsContext";



function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (email, password, role) => {
    const newUser = { email, role }; // no restriction
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <ProductsProvider>
      <Router>
        
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to={`/${user.role}`} /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to={`/${user.role}`} /> : <Register />}
          />

          {/* Farmer dashboard nested routes */}
          <Route
            path="/farmer/*"
            element={user?.role === "farmer" ? <FarmerDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          >
            <Route index element={<Navigate to="products" />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="add" element={<AddProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
          </Route>
          <Route
            path="/admin/*"
            element={
              user?.role === "admin" ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />   {/* FIXED */}
          <Route path="products" element={<ManageProducts />} /> {/* FIXED */}
          <Route path="orders" element={<ManageOrders />} />     {/* FIXED */}
          </Route>

          <Route
            path="/distributor"
            element={user?.role === "distributor" ? <div>Distributor Dashboard</div> : <Navigate to="/login" />}
          />
          <Route
            path="/retailer"
            element={user?.role === "retailer" ? <div>Retailer Dashboard</div> : <Navigate to="/login" />}
          />
          <Route
            path="/consumer"
            element={user?.role === "consumer" ? <div>Consumer Dashboard</div> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
