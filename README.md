# 🍏 FreshGo - Premium Grocery E-commerce Platform

FreshGo is a full-stack, mobile-responsive grocery application designed to provide a premium shopping experience. Built with the MERN stack and optimized for high performance, it features a sophisticated administrative dashboard, secure payments, and cloud-based asset management.

## 🚀 Live Demo
- **Frontend**: [grocery-app-o9gz.vercel.app](https://grocery-app-o9gz.vercel.app)
- **Backend API**: [grocery-app-mu-eight.vercel.app](https://grocery-app-mu-eight.vercel.app)

---

## ✨ Features

### 👤 User Experience
- **Premium UI/UX**: Modern, clean design with smooth transitions and glassmorphism elements.
- **Dynamic Product Discovery**: Shop by category, search functionality, and seasonal "Hot Deals".
- **Smart Cart**: Real-time cart management with local persistence.
- **Secure Checkout**: Integrated with **Razorpay** for a seamless payment experience.
- **Order Tracking**: View order history and real-time status updates.
- **Email Verification**: Secure onboarding with OTP-based email verification.

### 🛡️ Admin Dashboard
- **Total Control**: Manage products, stock levels, and pricing.
- **Analytics**: High-level overview of sales, users, and order distribution.
- **Order Management**: Process orders, update shipping status, and handle cancellations.
- **Coupon System**: Create and manage promotional coupons (Public/Private).
- **User Management**: View user details and manage administrative roles.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Redux Toolkit, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose).
- **Storage**: Cloudinary API (for high-performance image hosting).
- **Payments**: Razorpay SDK.
- **Deployment**: Vercel (Separate frontend/backend projects).

---

## 📦 Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary & Razorpay API keys

### 2. Installation
Clone the repository and install dependencies for both parts:
```bash
npm run install:all
```

### 3. Environment Variables
Create `.env` files in both directories based on the project requirements:

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

**Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_id
```

### 4. Running the Application
Run both servers simultaneously from the root:
```bash
# Start backend
npm run dev:backend

# Start frontend (separate terminal)
npm run dev:frontend
```

---

## 🚀 Deployment on Vercel

The project is optimized for separate frontend and backend deployments on Vercel.

### Backend Deployment
1. Import the `backend/` folder into a new Vercel project.
2. Add all environment variables from your `.env`.
3. Set the `CLIENT_URL` to your production frontend domain.

### Frontend Deployment
1. Import the `frontend/` folder into a new Vercel project.
2. Set the `Framework Preset` to `Vite`.
3. Set `VITE_API_BASE_URL` to your production backend URL (e.g., `https://api.yourdomain.com/api`).

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by [Vivek Phadol](https://github.com/vivekphadol07)
