import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Bell,
  AlertTriangle,
  UserPlus,
} from "lucide-react";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading dashboard:", error);
        setLoading(false);
      });
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "student":
        return UserPlus;

      case "assignment":
        return CheckCircle2;

      case "attendance":
        return ClipboardCheck;

      case "course":
        return BookOpen;

      case "system":
        return CheckCircle2;

      default:
        return Bell;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Good morning, Admin</h1>
            <p className="heading-description">
              Loading CloudCampus data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Students",
      value: dashboard.total_students,
      change: "Live",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: dashboard.active_courses,
      change: "Live",
      icon: BookOpen,
    },
    {
      title: "Faculty Members",
      value: dashboard.faculty_members,
      change: "Live",
      icon: GraduationCap,
    },
    {
      title: "Avg. Attendance",
      value: `${dashboard.average_attendance}%`,
      change: "Live",
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>

          <h1>Good morning, Admin</h1>

          <p className="heading-description">
            Here's what's happening across CloudCampus today.
          </p>
        </div>

        <button className="primary-button">
          View Reports
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-card-top">
                <div className="stat-icon">
                  <Icon size={20} />
                </div>

                <span className="stat-change">
                  {stat.change}
                </span>
              </div>

              <p className="stat-title">{stat.title}</p>

              <h2>{stat.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card attendance-card">
          <div className="card-header">
            <div>
              <h3>Attendance Overview</h3>

              <p>
                Average attendance across departments
              </p>
            </div>

            <span className="status-badge">
              {dashboard.average_attendance >= 75
                ? "Healthy"
                : "Needs Attention"}
            </span>
          </div>

          <div className="attendance-content">
            <div className="attendance-circle">
              <div>
                <strong>
                  {dashboard.average_attendance}%
                </strong>

                <span>Average</span>
              </div>
            </div>

            <div className="department-list">
              <div className="department-row">
                <span>Overall</span>

                <strong>
                  {dashboard.average_attendance}%
                </strong>
              </div>

              <div className="department-row">
                <span>Students</span>

                <strong>
                  {dashboard.total_students}
                </strong>
              </div>

              <div className="department-row">
                <span>Faculty</span>

                <strong>
                  {dashboard.faculty_members}
                </strong>
              </div>

              <div className="department-row">
                <span>Courses</span>

                <strong>
                  {dashboard.active_courses}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Recent Activity</h3>

              <p>
                Latest updates from your campus
              </p>
            </div>

            <Clock
              size={20}
              className="muted-icon"
            />
          </div>

          <div className="activity-list">
            {dashboard.recent_activity.length === 0 ? (
              <div className="empty-state">
                No recent activity.
              </div>
            ) : (
              dashboard.recent_activity.map((activity) => {
                const Icon = getActivityIcon(
                  activity.type
                );

                return (
                  <div
                    className="activity-item"
                    key={activity.id}
                  >
                    <div className="activity-icon">
                      <Icon size={17} />
                    </div>

                    <div className="activity-details">
                      <strong>
                        {activity.title}
                      </strong>

                      <span>
                        {activity.description}
                      </span>
                    </div>

                    <small>Just now</small>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;