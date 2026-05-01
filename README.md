# Grocery-App

## View it live here

[Grocery-App Demo](https://grocery-app-o9gz.vercel.app/)

## Project structure

```text
frontend/   -> React + Vite user app
backend/    -> Node + Express + MongoDB API
```

## Local setup

### 1) Install dependencies

```bash
npm run install:all
```

### 2) Environment files

- Create `frontend/.env` from `frontend/.env.example`
- Create `backend/.env` from `backend/.env.example`

### 3) Seed backend data

```bash
npm run seed:backend
```

### 4) Run apps

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

Backend will run on `http://localhost:5000` and frontend uses `VITE_API_BASE_URL=http://localhost:5000/api`.

## Default admin account after seed

- Email: `admin@groceryapp.com`
- Password: `admin123`

##  Features

###  User Experience
- **Premium UI/UX**: Modern, clean design with smooth transitions and glassmorphism elements.
- **Dynamic Product Discovery**: Shop by category, search functionality, and seasonal "Hot Deals".
- **Smart Cart**: Real-time cart management with local persistence.
- **Secure Checkout**: Integrated with Razorpay for a seamless payment experience.
- **Order Tracking**: View order history and real-time status updates.
- **Email Verification**: Secure onboarding with OTP-based email verification.

###  Admin Dashboard
- **Total Control**: Manage products, stock levels, and pricing.
- **Analytics**: High-level overview of sales, users, and order distribution.
- **Order Management**: Process orders, update shipping status, and handle cancellations.
- **Coupon System**: Create and manage promotional coupons (Public/Private).
- **User Management**: View user details and manage administrative roles.

##  Tech Stack
- **Frontend**: React 19, Vite, Redux Toolkit, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose).
- **Storage**: Cloudinary API (for high-performance image hosting).
- **Payments**: Razorpay SDK.
- **Deployment**: Vercel (Separate frontend/backend projects).
