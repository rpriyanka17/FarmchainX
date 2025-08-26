import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPages";
import ProductDetailPage from "./pages/ProductDetailPage";

import { ProductsProvider } from "./context/ProductsContext";

const usersDB = [
  { email: "admin@farm.com", password: "admin123", role: "admin" },
  { email: "farmer@farm.com", password: "farmer123", role: "farmer" },
];

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (email, password, role) => {
    const foundUser = usersDB.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
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
            path="/farmer"
            element={user?.role === "farmer" ? <FarmerDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          >
            <Route index element={<Navigate to="products" />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="add" element={<AddProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
            <Route path="farmer/product/:id" element={<ProductDetailPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
