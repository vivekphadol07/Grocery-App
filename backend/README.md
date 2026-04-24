# Grocery Backend

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`.

3. Seed data into MongoDB:

```bash
npm run seed
```

4. Start backend:

```bash
npm run dev
```

Backend default URL: `http://localhost:5000`

## Default Mongo URI

`mongodb://localhost:27017/grocery_app`

## Key APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/orders` (user/admin)
- `GET /api/orders/my-orders` (user/admin)
- `GET /api/orders` (admin)
- `PATCH /api/orders/:id/status` (admin)
- `GET /api/admin/dashboard` (admin)

