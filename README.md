\# ☁️ CloudCampus



\### Cloud-Based Campus Management System



CloudCampus is a full-stack campus management platform designed to simplify and centralize academic administration. The application provides modules for managing students, courses, faculty, attendance, assignments, reports, and notifications through a modern and responsive web interface.



The project demonstrates the development and deployment of a full-stack application using \*\*React, FastAPI, MySQL, and AWS cloud services\*\*.



\---



\## 🚀 Live Demo



🔗 \*\*Live Application:\*\*  

http://cloudcampus-frontend-2026.s3-website.ap-south-1.amazonaws.com



The frontend is deployed using \*\*Amazon S3 Static Website Hosting\*\*, while the backend is deployed on \*\*Amazon EC2\*\* behind an \*\*Application Load Balancer\*\*.



\---



\## ✨ Features



\### 📊 Dashboard

\- Overview of students, courses, faculty, and attendance

\- Recent activity

\- Academic statistics

\- Quick access to major modules



\### 👨‍🎓 Student Management

\- View registered students

\- Search students

\- Add new students

\- Department and year information

\- Student status tracking



\### 📚 Course Management

\- View available courses

\- Add new courses

\- Course code and department information

\- Credit management



\### 👨‍🏫 Faculty Management

\- View faculty members

\- Add new faculty

\- Department and role information

\- Specialization tracking

\- Course and student management statistics



\### 📅 Attendance

\- View attendance information

\- Attendance statistics

\- Academic attendance overview



\### 📝 Assignment Management

\- Create assignments

\- Assign work to students

\- Set due dates

\- Track assignment status



\### 📈 Reports

\- Student statistics

\- Course statistics

\- Faculty information

\- Attendance analytics

\- Assignment statistics

\- Department-level information



\### 🔔 Notifications

\- Display system notifications

\- Read/unread notification interface

\- Centralized notification view



\### ⚙️ Settings

\- Application settings

\- User interface preferences

\- System configuration controls



\---



\# 🏗️ System Architecture



CloudCampus follows a layered cloud architecture:



```text

&#x20;                        👤 USER

&#x20;                          │

&#x20;                          │ HTTP

&#x20;                          ▼

&#x20;               ┌─────────────────────┐

&#x20;               │     Amazon S3       │

&#x20;               │                     │

&#x20;               │   React Frontend    │

&#x20;               │  Static Website     │

&#x20;               │      Hosting        │

&#x20;               └──────────┬──────────┘

&#x20;                          │

&#x20;                          │ REST API Requests

&#x20;                          ▼

&#x20;               ┌─────────────────────┐

&#x20;               │ Application Load    │

&#x20;               │     Balancer        │

&#x20;               │       (ALB)         │

&#x20;               └──────────┬──────────┘

&#x20;                          │

&#x20;                          │ HTTP

&#x20;                          ▼

&#x20;               ┌─────────────────────┐

&#x20;               │     Amazon EC2      │

&#x20;               │                     │

&#x20;               │ FastAPI Backend     │

&#x20;               │     + Uvicorn       │

&#x20;               └──────────┬──────────┘

&#x20;                          │

&#x20;                          │ SQLAlchemy

&#x20;                          ▼

&#x20;               ┌─────────────────────┐

&#x20;               │       MySQL         │

&#x20;               │                     │

&#x20;               │ Application Data    │

&#x20;               └─────────────────────┘

Request Flow

For example, when a student is added:

React Frontend

&#x20;     │

&#x20;     │ POST /api/students

&#x20;     ▼

Application Load Balancer

&#x20;     │

&#x20;     ▼

Amazon EC2

&#x20;     │

&#x20;     ▼

FastAPI

&#x20;     │

&#x20;     ▼

SQLAlchemy

&#x20;     │

&#x20;     ▼

MySQL

&#x20;     │

&#x20;     ▼

Response → React Frontend



☁️ AWS Deployment



The application is deployed using the following AWS services:

\- Amazon S3 – Hosts the production React frontend using static website hosting.

\- Amazon EC2 – Runs the FastAPI backend application.

\- Application Load Balancer – Receives API requests and forwards them to the EC2 backend.

\- Security Groups – Control network access to AWS resources.

The React application is built using:

npm run build



The generated production files are uploaded to the S3 bucket.





📁 Project Structure



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



🔌 API Integration

The frontend communicates with the FastAPI backend through REST APIs.

Main API Operations



GET  /api/students

POST /api/students



GET  /api/courses

POST /api/courses



GET  /api/faculty

POST /api/faculty



GET  /api/assignments

POST /api/assignments



GET  /api/attendance

GET  /api/reports

GET  /api/notifications



🔐 Configuration \& Security



Database credentials are managed using environment variables rather than being hardcoded.

Example:

DB\_USER=your\_database\_username

DB\_PASSWORD=your\_database\_password

DB\_HOST=your\_database\_host

DB\_PORT=3306

DB\_NAME=your\_database\_name



👩‍💻 Author

Atmihaa MB

Computer Science \& Engineering



CloudCampus

Cloud-Based Campus Management System

