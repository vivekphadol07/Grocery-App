import React from 'react'
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
     <footer className="bg-green-50 text-gray-700 mt-12 w-full">

      <div className=" flex flex-col sm:flex-row items-center w-full  text-[14px] sm:text-[16px] py-10 mx-auto px-4 sm:px-8 lg:px-16 gap-y-3 ml-20">
        {/* Logo and Description */}
        <div className="md:w-1/3">
          <img 
          src={`${import.meta.env.BASE_URL}/logogreen.png`} 
          alt="GreenCart Logo" 
          className="w-[200px] h-auto mb-4 " 
          />

          <p className="text-gray-600">
            Get fresh groceries and snacks delivered right to your doorstep.
            Loved by thousands, we make shopping easy, convenient, and budget-friendly.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col justify-center sm:flex-row gap-10 md:w-2/3 ">
          {/* Quick Links */}
          <div>
            <h1 className="font-semibold text-gray-800 mb-3">Quick Links</h1>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-green-600">Home</Link>
              <Link to="/" className="hover:text-green-600">Category</Link>
              <Link to="/" className="hover:text-green-600">Best Seller</Link>
              <Link to="/" className="hover:text-green-600">Hot Deals</Link>
              <Link to="/" className="hover:text-green-600">FAQ</Link>
            </div>
          </div>

          {/* Need Help */}
          <div>
            <h1 className="font-semibold text-gray-800 mb-3">Need Help?</h1>
            <div className="flex flex-col gap-2">
              <Link to="/contactus" className="hover:text-green-600">Delivery Information</Link>
              <Link to="/contactus" className="hover:text-green-600">Return & Refund</Link>
              <Link to="/contactus" className="hover:text-green-600">Payment Methods</Link>
              <Link to="/contactus" className="hover:text-green-600">Track Your Order</Link>
              <Link to="/contactus" className="hover:text-green-600">Contact Us</Link>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h1 className="font-semibold text-gray-800 mb-3">Follow Us</h1>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-green-600">Instagram</Link>
              <Link to="/" className="hover:text-green-600">Twitter</Link>
              <Link to="/" className="hover:text-green-600">Facebook</Link>
              <Link to="/" className="hover:text-green-600">YouTube</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 py-4 text-center text-gray-500 text-sm">
        © 2025 All Rights Reserved.
      </div>
    </footer>
  )
}
