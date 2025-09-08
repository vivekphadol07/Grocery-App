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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/contactus" element={<ContactUs isLoggedIn={isLoggedIn} />} />
          <Route path="/bakery" element={<Bakery isLoggedIn={isLoggedIn} />} />
          <Route path="/dairy" element={<Dairy isLoggedIn={isLoggedIn} />} />
          <Route path="/drinks" element={<Drinks isLoggedIn={isLoggedIn} />} />
          <Route path="/fruits" element={<Fruits isLoggedIn={isLoggedIn} />} />
          <Route path="/grains" element={<Grains isLoggedIn={isLoggedIn} />} />
          <Route path="/instant"element={<Instant isLoggedIn={isLoggedIn} />} />
          <Route path="/vegitable"element={<Vegitable isLoggedIn={isLoggedIn} />} />
          <Route path="/allproducts" element={<AllProducts isLoggedIn={isLoggedIn}/>} />
          <Route path="hotdeals" element={<HotDeals isLoggedIn={isLoggedIn}/>} />
          <Route path="/bestseller" element={<BestSeller isLoggedIn={isLoggedIn}/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
