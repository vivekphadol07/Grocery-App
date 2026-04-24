import React, { useEffect, useState } from "react";
import { Navbar } from "./components/common/Navbar";
import { Home } from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Bakery } from "./pages/categories/Bakery";
import { Dairy } from "./pages/categories/Dairy";
import { Drinks } from "./pages/categories/Drinks";
import { Fruits } from "./pages/categories/Fruits";
import { Grains } from "./pages/categories/Grains";
import { Instant } from "./pages/categories/Instant";
import { Vegitable } from "./pages/categories/Vegitable";
import { ContactUs } from "./pages/misc/ContactUs";
import { About } from "./pages/misc/About";
import { Login } from "./pages/auth/Login";
import { Cart } from "./pages/cart/Cart";
import { Signup } from "./pages/auth/SignUp";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import { HotDeals } from "./pages/products/HotDeals";
import { BestSeller } from "./pages/products/BestSeller";
import { AllProducts } from "./pages/products/AllProduts";
import MobileBottomNav from "./components/common/MobileBottomNav";
import { useAppContext } from "./context/AppContext";
import { UserDashboard } from "./pages/dashboard/UserDashboard";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import AdminRoute from "./components/auth/AdminRoute";
import { ProductDetail } from "./pages/products/ProductDetail";


const App = () => {
  const { isLoggedIn, isAdmin, authLoading } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {!isAdmin && <Navbar setSearchQuery={setSearchQuery} />}
      {!isAdmin && <MobileBottomNav />}
      <Routes>
        <Route 
          path="/" 
          element={
            isAdmin 
              ? <Navigate to="/admin/dashboard" replace /> 
              : <Home isLoggedIn={isLoggedIn} />
          } 
        />
        
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/contactus" element={<ContactUs isLoggedIn={isLoggedIn} />} />
          <Route path="/category/bakery" element={<Bakery isLoggedIn={isLoggedIn} />} />
          <Route path="/category/dairy" element={<Dairy isLoggedIn={isLoggedIn} />} />
          <Route path="/category/beverages" element={<Drinks isLoggedIn={isLoggedIn} />} />
          <Route path="/category/fruits" element={<Fruits isLoggedIn={isLoggedIn} />} />
          <Route path="/category/grains" element={<Grains isLoggedIn={isLoggedIn} />} />
          <Route path="/category/snacks"element={<Instant isLoggedIn={isLoggedIn} />} />
          <Route path="/category/vegitable"element={<Vegitable isLoggedIn={isLoggedIn} />} />
          <Route path="/allproducts" element={<AllProducts isLoggedIn={isLoggedIn} searchQuery={debouncedQuery}/>} />
          <Route path="/hotdeals" element={<HotDeals isLoggedIn={isLoggedIn}/>} />
          <Route path="/bestseller" element={<BestSeller isLoggedIn={isLoggedIn}/>} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
