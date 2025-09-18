import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Bakery } from "./pages/Bakery";
import { Dairy } from "./pages/Dairy";
import { Drinks } from "./pages/Drinks";
import { Fruits } from "./pages/Fruits";
import { Grains } from "./pages/Grains";
import { Instant } from "./pages/Instant";
import { Vegitable } from "./pages/Vegitable";
import { ContactUs } from "./pages/ContactUs";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Signup } from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { HotDeals } from "./pages/HotDeals";
import { BestSeller } from "./pages/BestSeller";
import { AllProducts } from "./pages/AllProduts";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="overflow-hidden">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/Grocery-App/" element={<Home isLoggedIn={isLoggedIn} />} />
        
        <Route path="/Grocery-App/about" element={<About />} />
        <Route path="/Grocery-App/cart" element={<Cart />} />
        <Route
          path="/Grocery-App/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Grocery-App/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/Grocery-App/contactus" element={<ContactUs isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/bakery" element={<Bakery isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/dairy" element={<Dairy isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/drinks" element={<Drinks isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/fruits" element={<Fruits isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/grains" element={<Grains isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/instant"element={<Instant isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/vegitable"element={<Vegitable isLoggedIn={isLoggedIn} />} />
          <Route path="/Grocery-App/allproducts" element={<AllProducts isLoggedIn={isLoggedIn}/>} />
          <Route path="/Grocery-App/hotdeals" element={<HotDeals isLoggedIn={isLoggedIn}/>} />
          <Route path="/Grocery-App/bestseller" element={<BestSeller isLoggedIn={isLoggedIn}/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
