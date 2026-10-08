from pydantic import BaseModel, ConfigDict
from datetime import date


class StudentCreate(BaseModel):
    name: str
    email: str
    department: str
    year: int


class StudentResponse(StudentCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


class CourseCreate(BaseModel):
    name: str
    code: str
    department: str
    credits: int


class CourseResponse(CourseCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class AttendanceCreate(BaseModel):
    student_id: int
    course: str
    date: date
    status: str


class AttendanceResponse(AttendanceCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class FacultyCreate(BaseModel):
    name: str
    email: str
    department: str
    role: str
    specialization: str
    courses: int
    students: int
    status: str


class FacultyResponse(FacultyCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class AssignmentCreate(BaseModel):
    student_id: int
    title: str
    description: str | None = None
    due_date: date
    status: str


class AssignmentResponse(AssignmentCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class NotificationCreate(BaseModel):
    title: str
    message: str
    type: str
    is_read: int = 0


class NotificationResponse(NotificationCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)