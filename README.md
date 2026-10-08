
# ☁️ CloudCampus

### Cloud-Based Campus Management System

CloudCampus is a full-stack campus management platform designed to simplify and centralize academic administration. It provides a modern interface for managing students, courses, faculty, attendance, assignments, reports, and notifications.

The project was developed using **React, FastAPI, and MySQL** and deployed on **Amazon Web Services (AWS)** using Amazon S3, Amazon EC2, and an Application Load Balancer.

---

## 🚀 Live Demo

**Live Application:**  
http://cloudcampus-frontend-2026.s3-website.ap-south-1.amazonaws.com

---

## ✨ Features

- 📊 **Dashboard** – Overview of students, courses, faculty, attendance, and recent activity
- 👨‍🎓 **Student Management** – View, search, and add student records
- 📚 **Course Management** – Manage courses, departments, codes, and credits
- 👨‍🏫 **Faculty Management** – Manage faculty details, roles, and specializations
- 📅 **Attendance** – View attendance information and statistics
- 📝 **Assignment Management** – Create and track assignments and due dates
- 📈 **Reports** – View academic and departmental statistics
- 🔔 **Notifications** – Display system notifications
- ⚙️ **Settings** – Manage application preferences

---

## 🏗️ Architecture

```text
                         👤 USER
                           │
                           ▼
                ┌─────────────────────┐
                │     Amazon S3       │
                │   React Frontend    │
                │  Static Website     │
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
                           ▼
                ┌─────────────────────┐
                │     Amazon EC2      │
                │  FastAPI Backend    │
                │     + Uvicorn       │
                └──────────┬──────────┘
                           │
                           │ SQLAlchemy
                           ▼
                ┌─────────────────────┐
                │       MySQL         │
                │      Database       │
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

## 🛠️ Technology Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React, Vite, JavaScript, CSS |
| **Backend** | Python, FastAPI, Uvicorn, Pydantic |
| **Database** | MySQL |
| **ORM** | SQLAlchemy |
| **Cloud** | Amazon S3, Amazon EC2, Application Load Balancer |
| **Version Control** | Git, GitHub |

---

## ☁️ AWS Deployment

The application is deployed using the following AWS services:

* **Amazon S3** – Hosts the production React frontend using static website hosting.
* **Amazon EC2** – Runs the FastAPI backend application.
* **Application Load Balancer** – Receives API requests and forwards them to the EC2 backend.
* **Security Groups** – Control network access to AWS resources.

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

* `GET /api/students` / `POST /api/students`
* `GET /api/courses` / `POST /api/courses`
* `GET /api/faculty` / `POST /api/faculty`
* `GET /api/assignments` / `POST /api/assignments`
* `GET /api/attendance`
* `GET /api/reports`
* `GET /api/notifications`

FastAPI validates incoming data using Pydantic schemas and communicates with MySQL using SQLAlchemy.

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

Sensitive files such as `.env`, virtual environments, `node_modules`, and database dumps are excluded using `.gitignore`.

---

## 💻 Running Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pymysql pydantic python-dotenv
uvicorn main:app --reload

```

* **Backend API:** `http://localhost:8000`
* **FastAPI Documentation:** `http://localhost:8000/docs`

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev

```

* **Frontend App:** `http://localhost:5173`

---

## 🧪 Testing & Verification

The application was tested both locally and after AWS deployment. Verified functionality includes:

* ✅ Student, course, faculty, and assignment creation
* ✅ Backend API communication & database connectivity
* ✅ S3 frontend static hosting & ALB to EC2 routing
* ✅ End-to-end production flow verification via the live website

---

## 🛠️ Deployment Challenges Solved

* **CORS Configuration:** Updated FastAPI CORS middleware settings to seamlessly allow origin requests from the deployed S3 website domain.
* **Production Build:** Re-bundled updated frontend assets using `npm run build` and synced distribution files cleanly to Amazon S3.

---

## 🔮 Future Enhancements

* Authentication and role-based access control (RBAC)
* Full edit and delete CRUD operations
* Advanced attendance tracking and analytics
* PDF/Excel report export functionality
* HTTPS integration with SSL/TLS certificates
* Automated CI/CD pipelines using GitHub Actions
* CloudWatch monitoring and auto-scaling backend infrastructure

---

## 👩‍💻 Author

**Atmihaa MB**

Computer Science & Engineering


Let me know once you have saved this file in your project directory, and we can check your backend dependencies/requirements before pushing everything to GitHub!

```
