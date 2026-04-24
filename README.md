# Grocery-App

## View it live here

[Grocery-App Demo](https://vivekphadol07.github.io/Grocery-App/)

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
