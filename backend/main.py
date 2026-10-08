from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db
from models import Student, Course, Faculty,  Attendance, Assignment,  Notification
from schemas import (
    StudentCreate,
    StudentResponse,
    CourseCreate,
    CourseResponse,
    FacultyCreate,
    FacultyResponse,
    AttendanceCreate,
    AttendanceResponse,
    AssignmentCreate,
    AssignmentResponse,
    NotificationCreate,
    NotificationResponse,
)


app = FastAPI(
    title="CloudCampus API",
    description="Backend API for the cloud-native campus platform",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://cloudcampus-frontend-2026.s3-website.ap-south-1.amazonaws.com"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "CloudCampus API is running",
        "status": "healthy",
    }


@app.get("/api/health")
def health_check():
    return {
        "service": "CloudCampus Backend",
        "status": "healthy",
        "database": "connected",
    }


# =========================
# STUDENTS
# =========================

@app.get("/api/students", response_model=list[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).all()


@app.post("/api/students", response_model=StudentResponse)
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db),
):
    existing_student = (
        db.query(Student)
        .filter(Student.email == student.email)
        .first()
    )

    if existing_student:
        raise HTTPException(
            status_code=400,
            detail="A student with this email already exists",
        )

    new_student = Student(
        name=student.name,
        email=student.email,
        department=student.department,
        year=student.year,
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# =========================
# COURSES
# =========================

@app.get("/api/courses", response_model=list[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()


@app.post("/api/courses", response_model=CourseResponse)
def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
):
    existing_course = (
        db.query(Course)
        .filter(Course.code == course.code)
        .first()
    )

    if existing_course:
        raise HTTPException(
            status_code=400,
            detail="A course with this code already exists",
        )

    new_course = Course(
        name=course.name,
        code=course.code,
        department=course.department,
        credits=course.credits,
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


# =========================
# FACULTY
# =========================

@app.get("/api/faculty", response_model=list[FacultyResponse])
def get_faculty(db: Session = Depends(get_db)):
    return db.query(Faculty).all()


@app.post("/api/faculty", response_model=FacultyResponse)
def create_faculty(
    faculty: FacultyCreate,
    db: Session = Depends(get_db),
):
    existing_faculty = (
        db.query(Faculty)
        .filter(Faculty.email == faculty.email)
        .first()
    )

    if existing_faculty:
        raise HTTPException(
            status_code=400,
            detail="A faculty member with this email already exists",
        )

    new_faculty = Faculty(
        name=faculty.name,
        email=faculty.email,
        department=faculty.department,
        role=faculty.role,
        specialization=faculty.specialization,
        courses=faculty.courses,
        students=faculty.students,
        status=faculty.status,
    )

    db.add(new_faculty)
    db.commit()
    db.refresh(new_faculty)

    return new_faculty

@app.get("/api/attendance", response_model=list[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    return db.query(Attendance).all()


@app.post("/api/attendance", response_model=AttendanceResponse)
def create_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
):
    student = (
        db.query(Student)
        .filter(Student.id == attendance.student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    new_attendance = Attendance(
        student_id=attendance.student_id,
        course=attendance.course,
        date=attendance.date,
        status=attendance.status,
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance

# =========================
# ASSIGNMENTS
# =========================

@app.get("/api/assignments", response_model=list[AssignmentResponse])
def get_assignments(db: Session = Depends(get_db)):
    return db.query(Assignment).all()


@app.post("/api/assignments", response_model=AssignmentResponse)
def create_assignment(
    assignment: AssignmentCreate,
    db: Session = Depends(get_db),
):
    student = (
        db.query(Student)
        .filter(Student.id == assignment.student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    new_assignment = Assignment(
        student_id=assignment.student_id,
        title=assignment.title,
        description=assignment.description,
        due_date=assignment.due_date,
        status=assignment.status,
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return new_assignment

# =========================
# NOTIFICATIONS
# =========================

@app.get(
    "/api/notifications",
    response_model=list[NotificationResponse],
)
def get_notifications(db: Session = Depends(get_db)):
    return (
        db.query(Notification)
        .order_by(Notification.id.desc())
        .all()
    )


@app.post(
    "/api/notifications",
    response_model=NotificationResponse,
)
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
):
    new_notification = Notification(
        title=notification.title,
        message=notification.message,
        type=notification.type,
        is_read=notification.is_read,
    )

    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)

    return new_notification

# =========================
# DASHBOARD
# =========================

@app.get("/api/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    students = db.query(Student).count()
    courses = db.query(Course).count()
    faculty = db.query(Faculty).count()

    attendance_records = db.query(Attendance).all()

    if attendance_records:
        present_count = sum(
            1
            for record in attendance_records
            if record.status.lower() == "present"
        )

        attendance_percentage = round(
            (present_count / len(attendance_records)) * 100,
            1,
        )
    else:
        attendance_percentage = 0.0

    recent_notifications = (
        db.query(Notification)
        .order_by(Notification.id.desc())
        .limit(4)
        .all()
    )

    return {
        "total_students": students,
        "active_courses": courses,
        "faculty_members": faculty,
        "average_attendance": attendance_percentage,
        "recent_activity": [
            {
                "id": notification.id,
                "title": notification.title,
                "description": notification.message,
                "type": notification.type,
            }
            for notification in recent_notifications
        ],
    }

# =========================
# REPORTS
# =========================

@app.get("/api/reports")
def get_reports(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    courses = db.query(Course).all()
    attendance_records = db.query(Attendance).all()
    assignments = db.query(Assignment).all()

    # -------------------------
    # Overall attendance
    # -------------------------

    if attendance_records:
        present_count = sum(
            1
            for record in attendance_records
            if record.status.lower() == "present"
        )

        average_attendance = round(
            (present_count / len(attendance_records)) * 100,
            1,
        )
    else:
        average_attendance = 0.0

    # -------------------------
    # Department performance
    # -------------------------

    department_stats = {}

    for student in students:
        department = student.department

        if department not in department_stats:
            department_stats[department] = {
                "students": 0,
                "present": 0,
                "attendance_total": 0,
            }

        department_stats[department]["students"] += 1

    for record in attendance_records:
        student = (
            db.query(Student)
            .filter(Student.id == record.student_id)
            .first()
        )

        if student:
            department = student.department

            if department not in department_stats:
                department_stats[department] = {
                    "students": 0,
                    "present": 0,
                    "attendance_total": 0,
                }

            department_stats[department]["attendance_total"] += 1

            if record.status.lower() == "present":
                department_stats[department]["present"] += 1

    department_data = []

    for department, data in department_stats.items():
        if data["attendance_total"] > 0:
            attendance = round(
                (
                    data["present"]
                    / data["attendance_total"]
                )
                * 100
            )
        else:
            attendance = 0

        department_data.append(
            {
                "name": department,
                "students": data["students"],
                "attendance": attendance,
            }
        )

    # -------------------------
    # Course activity
    # -------------------------

    course_activity = []

    for course in courses:
        assignment_count = sum(
            1
            for assignment in assignments
            if assignment.title
        )

        course_activity.append(
            {
                "name": course.name,
                "code": course.code,
                "activity": assignment_count,
            }
        )

    return {
        "total_students": len(students),
        "active_courses": len(courses),
        "average_attendance": average_attendance,
        "department_data": department_data,
        "course_data": course_activity,
        "total_assignments": len(assignments),
    }