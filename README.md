# 📝 Express Blog App (Dockerized)

A simple blog application built using **Node.js**, **Express**, **MongoDB**, and **EJS** – now containerized with **Docker** & **Docker Compose**.

---

## 🚀 Features

- ✍️ Create, edit, and delete blog posts
- 👥 User registration and login with hashed passwords (bcrypt)
- 🧠 Session-based authentication using `express-session`
- 📄 Templating with EJS
- 🐳 Docker & Docker Compose support for easy setup
- 📦 MongoDB database containerized
- ✅ Environment variables support via `ENV` in Docker

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB (inside Docker container)
- EJS Templating
- Docker & Docker Compose
- bcrypt for password hashing

---

## ⚙️ Environment Variables

Make sure to define the following environment variables in your `Dockerfile` or `.env` (if using dotenv):

```env
PORT=3000
SESSION_SECRET=yourSecretKey
MONGODB_URI=mongodb://mongo:27017/comp
```

---

## 🐳 Docker Compose Setup

```bash
# Clone the repo
git clone git@github.com:Omarosman924/express-blog-app-.git
cd express-blog-app-

# Build and start containers
docker compose up --build
```

This runs:
- `app` on port `3000`
- `mongo` on port `27017` with volume persistence

---

## 📁 Folder Structure

```
express-blog-app-/
├── views/           # EJS templates
├── public/          # Static files (CSS, JS)
├── mongoschema.js   # MongoDB schemas
├── app.js           # Main Express app
├── Dockerfile       # App container
├── docker-compose.yml
├── package.json
└── README.md
```

---

## ✅ Author

**Omar Osman**  
GitHub: [@Omarosman924](https://github.com/Omarosman924)

---


