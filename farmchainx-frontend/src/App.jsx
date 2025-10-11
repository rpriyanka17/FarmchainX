import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Farmer
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerDashboardLanding from "./pages/FarmerDashboardLanding";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPages";
import ProductDetailPage from "./pages/ProductDetailPage";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/admin/Users";
import ManageProducts from "./pages/admin/Products";
import ManageOrders from "./pages/admin/Orders";
import Dashboard from "./pages/admin/Dashboard";

// Distributor
import DistributorDashboard from "./pages/DistributorDashboard";
import DistributorHome from "./pages/DistributorHome";
import ManageOrder from "./pages/ManageOrder";
import TrackDeliveries from "./pages/TrackDeliveries";
import Payments from "./pages/Payments";

// Retailer & Consumer
import RetailerDashboard from "./pages/RetailerDashboard";
import AddStock from "./pages/AddStock";
import Orders from "./pages/ManageOrders";
import Payment from "./pages/Payment";

import ConsumerDashboard from "./pages/ConsumerDashboard";
import FruitQuality from "./pages/FruitQuality";
import ConsumerHome from "./pages/ConsumerLanding";
// Removed old ConsumerScanPage import
import SupplyChain from "./pages/SupplyChainPage";
import FeedbackPage from "./pages/ConsumerVerificationPage";
import SupplyOrder from "./pages/SupplyOrder"; // QR scanning integrated here

// Context
import { ProductsProvider } from "./context/ProductsContext";

function AppRoutes({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar role={user?.role} />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={user ? <Navigate to={`/${user.role}`} /> : <Login onLogin={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={`/${user.role}`} /> : <Register />}
        />

        {/* Farmer */}
        <Route
          path="/farmer/*"
          element={
            user?.role === "farmer" ? <FarmerDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<FarmerDashboardLanding />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="add" element={<AddProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            user?.role === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
        </Route>

        {/* Distributor */}
        <Route
          path="/distributor/*"
          element={
            user?.role === "distributor" ? <DistributorDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<DistributorHome />} />
          <Route path="orders" element={<ManageOrder />} />
          <Route path="deliveries" element={<TrackDeliveries />} />
          <Route path="payments" element={<Payments />} />
        </Route>

        {/* Retailer */}
        <Route
          path="/retailer/*"
          element={
            user?.role === "retailer" ? <RetailerDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<div />} />
          <Route path="add-stock" element={<AddStock />} />
          <Route path="manage-orders" element={<Orders />} />
          <Route path="payments" element={<Payment />} />
        </Route>

        {/* Consumer */}
        <Route path="/consumer/*" element={
  user?.role === "consumer" ? <ConsumerDashboard onLogout={handleLogout} /> : <Navigate to="/login" />
}>
  <Route index element={<ConsumerHome />} />
  <Route path="fruit-quality" element={<FruitQuality />} />
  <Route path="scan-product" element={<FeedbackPage />} /> {/* verification page */}
  <Route path="supply-chain" element={<SupplyChain />} />
  
</Route>


        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null); // user from backend: { email, role }

  return (
    <ProductsProvider>
      <Router>
        <AppRoutes user={user} setUser={setUser} />
      </Router>
    </ProductsProvider>
  );
}

export default App;
