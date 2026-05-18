# 🎬 Movie Database - React + Node.js

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)
![OMDb](https://img.shields.io/badge/OMDb-API-ff6600?style=for-the-badge)

**Movie search app with favorites and detailed info**

</div>

---

## 📖 About

Web application for searching movies using OMDb API. Features movie search, detailed information, favorites, and ratings.

---

## ✨ Features

| Feature            | Description                          |
|--------------------|--------------------------------------|
| 🔍 Search movies   | Search by title with pagination      |
| 📄 Movie details   | Full information about the movie     |
| ⭐ Favorites       | Add/remove movies to favorites       |
| 💾 Local storage   | Favorites saved between sessions     |
| 🎲 Popular movies  | Random batch on home page            |
| 📱 Responsive      | Works on all devices                 |

---

## 🚀 Quick Start

### Backend setup

```bash
cd backend
npm install
node server.js
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## 📡 API Endpoints

| Method | URL                               | Description     |
|--------|-----------------------------------|-----------------|
| GET    | `/api/movies/search?query=batman` | Search movies   |
| GET    | `/api/movies/{id}`                | Movie by ID     |
| GET    | `/api/movies/popular`             | Popular movies  |

---

## 🛠️ Tech Stack

- Frontend: React, React Router, Axios  
- Backend: Node.js, Express, Axios  
- API: OMDb API  
