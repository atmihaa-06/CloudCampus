from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text
from sqlalchemy.orm import relationship

from database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    department = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)

    attendance = relationship("Attendance", back_populates="student")
    assignments = relationship("Assignment", back_populates="student")


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    department = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    specialization = Column(String(150), nullable=False)
    courses = Column(Integer, nullable=False, default=0)
    students = Column(Integer, nullable=False, default=0)
    status = Column(String(30), nullable=False, default="Active")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    department = Column(String(100), nullable=False)
    credits = Column(Integer, nullable=False)


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    course = Column(String(150), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)

    student = relationship("Student", back_populates="attendance")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    due_date = Column(Date, nullable=False)
    status = Column(String(30), nullable=False)

    student = relationship("Student", back_populates="assignments")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    role = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), nullable=False)
    is_read = Column(Integer, default=0)