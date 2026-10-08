import { useEffect, useState } from "react";
import {
  BarChart3,
  Download,
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

function Reports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/reports")
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading reports:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="module-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">ANALYTICS & REPORTING</p>
            <h1>Reports</h1>
            <p className="heading-description">
              Loading CloudCampus reports...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const departmentData = reports.department_data;
  const courseData = reports.course_data;

  return (
    <div className="module-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ANALYTICS & REPORTING</p>
          <h1>Reports</h1>
          <p className="heading-description">
            View academic performance and platform activity reports.
          </p>
        </div>

        <button className="primary-button">
          <Download size={17} />
          Export Report
        </button>
      </div>

      <div className="module-stats">
        <div className="module-stat">
          <div className="module-stat-icon">
            <Users size={19} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{reports.total_students}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon green">
            <BookOpen size={19} />
          </div>

          <div>
            <span>Active Courses</span>
            <strong>{reports.active_courses}</strong>
          </div>
        </div>

        <div className="module-stat">
          <div className="module-stat-icon orange">
            <ClipboardCheck size={19} />
          </div>

          <div>
            <span>Avg. Attendance</span>
            <strong>
              {reports.average_attendance}%
            </strong>
          </div>
        </div>
      </div>

      <div className="reports-grid">
        <div className="dashboard-card report-card">
          <div className="card-header">
            <div>
              <h3>Department Performance</h3>
              <p>
                Student count and attendance comparison
              </p>
            </div>

            <BarChart3 size={19} />
          </div>

          <div className="department-report">
            {departmentData.map((department) => (
              <div
                className="department-report-row"
                key={department.name}
              >
                <div className="department-report-title">
                  <strong>{department.name}</strong>
                  <span>
                    {department.students} students
                  </span>
                </div>

                <div className="report-progress">
                  <div
                    style={{
                      width: `${department.attendance}%`,
                    }}
                  ></div>
                </div>

                <span className="report-percentage">
                  {department.attendance}%
                </span>
              </div>
            ))}

            {departmentData.length === 0 && (
              <div className="empty-state">
                No department data available.
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-card report-card">
          <div className="card-header">
            <div>
              <h3>Course Overview</h3>
              <p>
                Courses currently available in CloudCampus
              </p>
            </div>

            <Users size={19} />
          </div>

          <div className="enrollment-list">
            {courseData.map((course, index) => (
              <div
                className="enrollment-row"
                key={course.code}
              >
                <div
                  className={`course-number number-${index + 1}`}
                >
                  {index + 1}
                </div>

                <div className="enrollment-info">
                  <strong>{course.name}</strong>

                  <div className="enrollment-progress">
                    <div
                      style={{
                        width: `${
                          courseData.length > 0
                            ? 100 / courseData.length
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <span>{course.code}</span>
              </div>
            ))}

            {courseData.length === 0 && (
              <div className="empty-state">
                No course data available.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-card performance-card">
        <div className="card-header">
          <div>
            <h3>Academic Activity</h3>

            <p>
              Platform activity during the current academic
              period
            </p>
          </div>

          <div className="trend-indicator">
            <TrendingUp size={14} />
            {reports.total_assignments} assignment
            {reports.total_assignments !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="activity-chart">
          <div className="chart-y-axis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div className="chart-area">
            <div className="chart-grid-line line-100"></div>
            <div className="chart-grid-line line-75"></div>
            <div className="chart-grid-line line-50"></div>
            <div className="chart-grid-line line-25"></div>
            <div className="chart-grid-line line-0"></div>

            <div className="chart-bars">
              {departmentData.map((department) => (
                <div
                  className="chart-bar-group"
                  key={department.name}
                >
                  <div
                    className="chart-bar"
                    style={{
                      height: `${department.attendance}%`,
                    }}
                  ></div>

                  <span>{department.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="report-note">
        <BarChart3 size={17} />

        <div>
          <strong>Report generation</strong>

          <span>
            Reports are generated from student, course,
            attendance and assignment data stored by
            CloudCampus.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Reports;