import { useEffect, useState } from "react";
import {
  Search,
  CalendarDays,
  Users,
  UserCheck,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

function Attendance() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/attendance").then((res) =>
        res.json()
      ),
      fetch("http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/students").then((res) =>
        res.json()
      ),
    ])
      .then(([attendanceData, studentData]) => {
        setAttendanceRecords(attendanceData);
        setStudents(studentData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading attendance:", error);
        setLoading(false);
      });
  }, []);

  const studentMap = Object.fromEntries(
    students.map((student) => [student.id, student])
  );

  const formattedRecords = attendanceRecords.map((record) => {
    const student = studentMap[record.student_id];

    return {
      id: student
        ? `CC${String(student.id).padStart(3, "0")}`
        : `ST${record.student_id}`,
      name: student ? student.name : "Unknown Student",
      department: student ? student.department : "—",
      course: record.course,
      date: record.date,
      status: record.status,
    };
  });

  const studentAttendance = {};

  formattedRecords.forEach((record) => {
    if (!studentAttendance[record.id]) {
      studentAttendance[record.id] = {
        present: 0,
        total: 0,
      };
    }

    studentAttendance[record.id].total += 1;

    if (record.status.toLowerCase() === "present") {
      studentAttendance[record.id].present += 1;
    }
  });

  const recordsWithPercentage = formattedRecords.map((record) => {
    const stats = studentAttendance[record.id];

    const percentage =
      stats.total > 0
        ? Math.round((stats.present / stats.total) * 100)
        : 0;

    return {
      ...record,
      attendance: percentage,
      attendanceStatus: percentage >= 75 ? "Good" : "At Risk",
    };
  });

  const filteredRecords = recordsWithPercentage.filter((record) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      record.name.toLowerCase().includes(searchValue) ||
      record.id.toLowerCase().includes(searchValue) ||
      record.course.toLowerCase().includes(searchValue);

    const matchesDepartment =
      department === "All Departments" ||
      record.department === department;

    return matchesSearch && matchesDepartment;
  });

  const totalRecords = recordsWithPercentage.length;

  const presentRecords = recordsWithPercentage.filter(
    (record) => record.status.toLowerCase() === "present"
  ).length;

  const overallAttendance =
    totalRecords > 0
      ? ((presentRecords / totalRecords) * 100).toFixed(1)
      : "0.0";

  const atRiskRecords = recordsWithPercentage.filter(
    (record) => record.attendance < 75
  ).length;

  const departmentData = {};

  recordsWithPercentage.forEach((record) => {
    if (!departmentData[record.department]) {
      departmentData[record.department] = {
        present: 0,
        total: 0,
      };
    }

    departmentData[record.department].total += 1;

    if (record.status.toLowerCase() === "present") {
      departmentData[record.department].present += 1;
    }
  });

  const departments = Object.entries(departmentData).map(
    ([name, data]) => ({
      name,
      percentage: Math.round(
        (data.present / data.total) * 100
      ),
    })
  );

  const goodAttendance = recordsWithPercentage.filter(
    (record) => record.attendance >= 75
  ).length;

  return (
    <div className="module-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACADEMIC ANALYTICS</p>
          <h1>Attendance</h1>
          <p className="heading-description">
            Monitor student attendance across departments and courses.
          </p>
        </div>

        <button className="secondary-button attendance-date">
          <CalendarDays size={16} />
          October 2026
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="module-stats">
        <div className="module-stat">
          <div className="module-stat-icon">
            <UserCheck size={19} />
          </div>

          <div>
            <span>Overall Attendance</span>
            <strong>{overallAttendance}%</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon green">
            <Users size={19} />
          </div>

          <div>
            <span>Students Present</span>
            <strong>{presentRecords}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon orange">
            <AlertTriangle size={19} />
          </div>

          <div>
            <span>Students At Risk</span>
            <strong>{atRiskRecords}</strong>
          </div>
        </div>
      </div>

      <div className="attendance-layout">
        <div className="dashboard-card department-attendance">
          <div className="card-header">
            <div>
              <h3>Department Attendance</h3>
              <p>Average attendance by department</p>
            </div>
          </div>

          <div className="attendance-bars">
            {departments.length === 0 ? (
              <div className="empty-state">
                No attendance data available.
              </div>
            ) : (
              departments.map((item) => (
                <div
                  className="attendance-bar-row"
                  key={item.name}
                >
                  <div className="attendance-bar-label">
                    <span>{item.name}</span>
                    <strong>{item.percentage}%</strong>
                  </div>

                  <div className="attendance-bar-track">
                    <div
                      className="attendance-bar-fill"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-card attendance-summary">
          <div className="card-header">
            <div>
              <h3>Attendance Summary</h3>
              <p>Current academic period</p>
            </div>
          </div>

          <div className="summary-circle">
            <div>
              <strong>{overallAttendance}%</strong>
              <span>Overall</span>
            </div>
          </div>

          <div className="summary-details">
            <div>
              <span className="summary-dot present"></span>
              <span>Good Attendance</span>
              <strong>{goodAttendance}</strong>
            </div>

            <div>
              <span className="summary-dot risk"></span>
              <span>At Risk</span>
              <strong>{atRiskRecords}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="table-card attendance-table-card">
        <div className="table-toolbar">
          <div>
            <h3>Student Attendance</h3>
            <p>Detailed attendance records.</p>
          </div>

          <div className="table-actions">
            <div className="table-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              className="department-select"
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
            >
              <option>All Departments</option>

              {departments.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <div className="empty-state">
              Loading attendance...
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Course</th>
                  <th>Attendance</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record, index) => (
                  <tr
                    key={`${record.id}-${record.course}-${record.date}-${index}`}
                  >
                    <td>
                      <div className="student-cell">
                        <div className="student-avatar">
                          {record.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{record.name}</strong>
                          <span>{record.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>{record.department}</td>

                    <td>{record.course}</td>

                    <td>
                      <div className="attendance-percentage">
                        <span>{record.attendance}%</span>

                        <div className="mini-progress">
                          <div
                            style={{
                              width: `${record.attendance}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`attendance-status ${
                          record.attendanceStatus === "Good"
                            ? "good-status"
                            : "risk-status"
                        }`}
                      >
                        {record.attendanceStatus}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        No attendance records found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;