```markdown
# ☁️ CloudCampus

### Cloud-Based Campus Management System

CloudCampus is a full-stack campus management platform designed to simplify and centralized academic administration. The application provides modules for managing students, courses, faculty, attendance, assignments, reports, and notifications through a modern and responsive web interface.

The project demonstrates the development and deployment of a full-stack application using **React, FastAPI, MySQL, and AWS cloud services**.

---

## 🚀 Live Demo

🔗 **Live Application:**  
[http://cloudcampus-frontend-2026.s3-website.ap-south-1.amazonaws.com](http://cloudcampus-frontend-2026.s3-website.ap-south-1.amazonaws.com)

The frontend is deployed using **Amazon S3 Static Website Hosting**, while the backend is deployed on **Amazon EC2** behind an **Application Load Balancer**.

---

## ✨ Features

### 📊 Dashboard
* Overview of students, courses, faculty, and attendance
* Recent activity
* Academic statistics
* Quick access to major modules

### 👨‍🎓 Student Management
* View registered students
* Search students
* Add new students
* Department and year information
* Student status tracking

### 📚 Course Management
* View available courses
* Add new courses
* Course code and department information
* Credit management

### 👨‍🏫 Faculty Management
* View faculty members
* Add new faculty
* Department and role information
* Specialization tracking
* Course and student management statistics

### 📅 Attendance
* View attendance information
* Attendance statistics
* Academic attendance overview

### 📝 Assignment Management
* Create assignments
* Assign work to students
* Set due dates
* Track assignment status

### 📈 Reports
* Student statistics
* Course statistics
* Faculty information
* Attendance analytics
* Assignment statistics
* Department-level information

### 🔔 Notifications
* Display system notifications
* Read/unread notification interface
* Centralized notification view

### ⚙️ Settings
* Application settings
* User interface preferences
* System configuration controls

---

## 🏗️ System Architecture

CloudCampus follows a layered cloud architecture:

```text
                         👤 USER
                           │
                           │ HTTP
                           ▼
               ┌─────────────────────┐
               │     Amazon S3       │
               │                     │
               │   React Frontend    │
               │  Static Website     │
               │      Hosting        │
               └──────────┬──────────┘
                          │
                          │ REST API Requests
                          ▼
               ┌─────────────────────┐
               │ Application Load    │
               │     Balancer        │
               │       (ALB)         │
               └──────────┬──────────┘
                          │
                          │ HTTP
                          ▼
               ┌─────────────────────┐
               │     Amazon EC2      │
               │                     │
               │ FastAPI Backend     │
               │     + Uvicorn       │
               └──────────┬──────────┘
                          │
                          │ SQLAlchemy
                          ▼
               ┌─────────────────────┐
               │       MySQL         │
               │                     │
               │ Application Data    │
               └─────────────────────┘

```

### Request Flow

For example, when a student is added:

```text
React Frontend
     │
     │ POST /api/students
     ▼
Application Load Balancer
     │
     ▼
Amazon EC2
     │
     ▼
FastAPI
     │
     ▼
SQLAlchemy
     │
     ▼
MySQL
     │
     ▼
Response → React Frontend

```

---

## ☁️ AWS Deployment

The application is deployed using the following AWS services:

* **Amazon S3:** Hosts the production React frontend using static website hosting.
* **Amazon EC2:** Runs the FastAPI backend application.
* **Application Load Balancer:** Receives API requests and forwards them to the EC2 backend.
* **Security Groups:** Control network access to AWS resources.

The React application is built using:

```bash
npm run build

```

The generated production files are uploaded to the S3 bucket.

---

## 📁 Project Structure

```text
CloudCampus/
│
├── backend/
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
├── package.json
└── package-lock.json

```

---

## 🔌 API Integration

The frontend communicates with the FastAPI backend through REST APIs.

### Main API Operations

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/students` | Retrieve student list |
| **POST** | `/api/students` | Add a new student |
| **GET** | `/api/courses` | Retrieve course list |
| **POST** | `/api/courses` | Add a new course |
| **GET** | `/api/faculty` | Retrieve faculty list |
| **POST** | `/api/faculty` | Add a new faculty member |
| **GET** | `/api/assignments` | Retrieve assignments |
| **POST** | `/api/assignments` | Create a new assignment |
| **GET** | `/api/attendance` | Retrieve attendance records |
| **GET** | `/api/reports` | Retrieve system reports |
| **GET** | `/api/notifications` | Retrieve notifications |

---

## 🔐 Configuration & Security

Database credentials are managed using environment variables rather than being hardcoded.

```env
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=3306
DB_NAME=your_database_name

```

---

## 👩‍💻 Author

**Atmihaa MB**

Computer Science & Engineering

```

```
