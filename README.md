# 🛒 Grocery-App

Modern, full-stack e-commerce platform for high-performance grocery shopping.

## 🚀 View it live here
[Grocery-App Demo](https://grocery-app-o9gz.vercel.app/)

---

## ✨ Features

### 👤 User Experience
*   **Premium UI/UX**: Modern, clean design with smooth transitions and glassmorphism elements.
*   **Dynamic Product Discovery**: Shop by category, search functionality, and seasonal "Hot Deals".
*   **Smart Cart**: Real-time cart management with local persistence.
*   **Secure Checkout**: Integrated with Razorpay for a seamless payment experience.
*   **Order Tracking**: View order history and real-time status updates.
*   **Email Verification**: Secure onboarding with OTP-based email verification.

### 🛠️ Admin Dashboard
*   **Total Control**: Manage products, stock levels, and pricing.
*   **Analytics**: High-level overview of sales, users, and order distribution.
*   **Order Management**: Process orders, update shipping status, and handle cancellations.
*   **Coupon System**: Create and manage promotional coupons (Public/Private).
*   **User Management**: View user details and manage administrative roles.

---

## 💻 Tech Stack
*   **Frontend**: React 19, Vite, Redux Toolkit, Tailwind CSS, Framer Motion.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB Atlas (Mongoose).
*   **Storage**: Cloudinary API (for high-performance image hosting).
*   **Payments**: Razorpay SDK.
*   **Deployment**: Vercel (Separate frontend/backend projects).

---

## 📂 Project Structure
```text
frontend/   -> React + Vite user app
backend/    -> Node + Express + MongoDB API
```

## 🛠️ Local Setup

### 1) Install dependencies
```bash
# In the root directory
npm run install:all
```

### 2) Environment Setup
*   Configure `frontend/.env` (API URL, Razorpay Key)
*   Configure `backend/.env` (MongoDB URI, Cloudinary, JWT, Email SMTP)

### 3) Run Locally
```bash
# Start both frontend and backend
npm run dev
```
