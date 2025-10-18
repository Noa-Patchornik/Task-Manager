# 📝 To-Do List App
## 🎯 Project Overview

This project is a full-stack To-Do List application built as a learning exercise to explore the integration of Docker, MongoDB, FastAPI (Python), and React (JavaScript).
The app allows users to create, edit, delete, and manage tasks — including optional deadlines, notes, and completion tracking — all within a modern, containerized environment.

## ⚙️ Tech Stack

| Area | Technology | Description |
|------|-------------|-------------|
| 🐳 Containerization | **Docker** | Manages isolated development and runtime environments using Docker Compose |
| 🗄️ Database | **MongoDB** | Stores tasks and related data in a NoSQL document database |
| 🐍 Backend | **Python + FastAPI** | Provides a fast, asynchronous REST API for managing tasks |
| ⚛️ Frontend | **React + JavaScript (Vite)** | Delivers an interactive and responsive user interface |
| 📦 ODM | **Beanie** | Object-Document Mapper for MongoDB, based on Pydantic models |
| 🎨 Styling | **Inline / CSS** | Clean, minimal styling for intuitive UI/UX |


## 📁 Project Structure
```bash
project-root/
│
├── docker-compose.yml         # Defines and connects all services
│
├── backend/                   # Backend (FastAPI)
│   ├── main.py                 # FastAPI entry point
│   ├── models.py               # Beanie/Pydantic models
│   ├── tasks_router.py         # Task get, creat, delete routes
│   ├── tasks_update_router.py  # Task update routes
│   ├── database.py 
│   ├── requirements.txt        # Backend dependencies
│   └── Dockerfile      
│
├── frontend/                  # Frontend (React)
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   ├── Components/
│   │   │   ├── TaskItem.jsx
│   │   │   ├── AddTaskModal.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── EditTaskModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── AlertConfirm.jsx
│   │   │   └── TaskFilter.jsx
│   │   └── services/
│   │       ├── api.js
│   │       └── tasksServices.js
│   └── package.json
│
└── README.md
```

## 🚀 Run the Project with Docker
**1️⃣ Build and start all services:**
docker compose up --build

**2️⃣ Access the interfaces:**

    Frontend (React): http://localhost:3000

    Backend (FastAPI Docs): http://localhost:8000/docs

    MongoDB: accessible inside the mongo container

## 💡 Features

✅ Create, edit, and delete tasks

✅ Mark tasks as done / not done

✅ Add optional deadlines and notes

✅ Visual distinction between completed (green) and pending (red) tasks

✅ Filter tasks by:

    Completed ✅

    Not completed 🕓

    Deadline today 📅

    Deadline within a week 📆

## 🧩 Learning Objectives

This project was built to practice:

Integrating React with a FastAPI backend using REST

Working with MongoDB and Beanie ODM

Using Docker Compose to orchestrate multi-service environments

Full-stack development workflow and deployment principles

### 👩‍💻 Author

Noa — Educational full-stack project for learning modern web technologies 💻