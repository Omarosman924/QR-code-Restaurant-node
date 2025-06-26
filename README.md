# 🍽️ QR Code Restaurant System

> ✅ **Default Staff Login**  
> **Username:** `admin`  
> **Password:** `123`  

A full-stack QR-code-based restaurant ordering system built with **Node.js**, **Express**, **MongoDB**, and **EJS**, optimized for mobile use and staff management.

---

## 🔥 Features

- 🧾 View menu via table QR or direct link.
- 🧍 Customers can place orders per table.
- 🧑‍🍳 Staff dashboard:
  - 🔐 Login authentication
  - ➕ Add/Edit/Delete menu items
- 📦 Orders management (mark orders as done)
- 📱 Mobile-friendly responsive UI
- 🚀 Demo data seeding with one command

---

## 🚀 Quick Start (without Docker)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file** with the following:
   ```env
   MONGODB_URI=mongodb://localhost:27017/restaurant
   PORT=3000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=123
   SESSION_SECRET=mysecretkey

   ```

3. **Seed demo data**
   ```bash
   node mongoseed.js
   ```

4. **Start the server**
   ```bash
   node app.js
   ```

---

## 🐳 Dockerized Setup

1. **Build and run the app:**
   ```bash
   docker compose up --build
   ```

2. **To seed the database manually (optional):**
   ```bash
   docker exec -it qr_web node mongoseed.js
   ```

> MongoDB runs in a container; ensure `MONGODB_URI` in `.env` points to the correct host (e.g., `mongodb://mongo:27017/restaurant` in Docker).

---

## 👤 Staff Login

- **Username:** `admin`
- **Password:** `123`

---

## 🧭 Routes Overview

| Route               | Description                                 |
|--------------------|---------------------------------------------|
| `/`                | View all tables (no QR required)            |
| `/menu/:table_id`  | Customers view menu and order               |
| `/order`           | Staff sees all current orders               |
| `/login`           | Staff login page                            |
| `/dashboard`       | Staff dashboard (add/edit menu)             |
| `/logout`          | Logout for admin                            |

---

## 📁 Project Structure

```
.
├── app.js               # Main Express app
├── mongoschema.js       # MongoDB models
├── mongoseed.js         # Demo seeding script
├── views/               # EJS templates
├── public/              # Static assets
├── .env                 # Config file
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 💬 Notes

- You can test without scanning a QR: just go to `/` and click a table.
- If using Docker, ensure your database volume is persistent (`mongo-data`).
- Port and DB URI are configurable via `.env`.

---

## 👨‍💻 Author

Built by [@Omarosman924](https://github.com/Omarosman924) with ❤️
