# 🚀 Portfolio Backend API

Backend API for my personal portfolio, providing secure admin authentication, visitor tracking, analytics, and real-time Telegram notifications.

---

# 🌐 Live API

**Backend URL**

`https://portfolio-backend-sayi.onrender.com`

---

# ✨ Features

## 🔐 Authentication

* Admin Login
* JWT Authentication
* Protected Routes
* Update Admin Email
* Update Admin Password
* Password Hashing using bcrypt

---

## 📊 Visitor Analytics

* Track Portfolio Visitors
* Total Visitors
* Today's Visitors
* Daily Visitor Analytics
* Browser Statistics
* Device Statistics
* Country Statistics
* Recent Visitors
* Top Referrer

---

## 📲 Telegram Notifications

Whenever someone visits the portfolio, the backend instantly sends a Telegram notification containing visitor information such as:

* Country
* Browser
* Device
* IP (if enabled)
* Visit Time
* Referrer

---

# 🛠 Tech Stack

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL (Neon)
* JWT
* bcrypt
* Axios
* Telegram Bot API
* Render

---

# 📂 Project Structure

```text
portfolio-backend/
│
├── config/
│   └── prisma.js
│
├── controllers/
│   ├── analytics.controller.js
│   ├── auth.controller.js
│   └── visit.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── prisma/
│   └── schema.prisma
│
├── routes/
│   ├── analytics.js
│   ├── auth.js
│   └── visit.js
│
├── server.js
└── package.json
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
PORT=10000

DATABASE_URL=YOUR_NEON_DATABASE_URL

JWT_SECRET=YOUR_SECRET_KEY

BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN

CHAT_ID=YOUR_TELEGRAM_CHAT_ID
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/rajsharma331/portfolio-backend.git
```

Move into the project

```bash
cd portfolio-backend
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate deploy
```

Start the server

```bash
npm start
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/auth/login`  | Admin Login             |
| PUT    | `/auth/update` | Update Email & Password |

---

## Visitor

| Method | Endpoint | Description               |
| ------ | -------- | ------------------------- |
| POST   | `/visit` | Store Visitor Information |

---

## Analytics

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | `/analytics/stats` | Dashboard Statistics |
| GET    | `/analytics/daily` | Daily Visitor Chart  |

---

# 🗄 Database

## Admin

* id
* email
* password
* createdAt

## Visitor

* id
* country
* browser
* device
* referrer
* createdAt

---

# 🔒 Security

* JWT Authentication
* Password Hashing with bcrypt
* Protected Admin Routes
* Environment Variables
* Prisma ORM for secure database access

---

# 🚀 Deployment

Frontend

* Vercel

Backend

* Render

Database

* Neon PostgreSQL

---

# 📚 What I Learned

* Building REST APIs with Express.js
* JWT Authentication
* Password Encryption
* Prisma ORM
* PostgreSQL Database Design
* Real-time Telegram Bot Integration
* Deployment with Render
* Production Environment Variables
* API Security Best Practices

---

# 👨‍💻 Author

**Raj Sharma**

GitHub: https://github.com/rajsharma331

LinkedIn: *(https://www.linkedin.com/in/raj-s-b5b85b189)*

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
