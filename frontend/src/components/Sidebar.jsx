import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  FileText,
  BarChart3,
  Bell,
  Settings,
  Cloud,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Students",
    icon: Users,
    path: "/students",
  },
  {
    label: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    label: "Faculty",
    icon: GraduationCap,
    path: "/faculty",
  },
  {
    label: "Attendance",
    icon: ClipboardCheck,
    path: "/attendance",
  },
  {
    label: "Assignments",
    icon: FileText,
    path: "/assignments",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    label: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Cloud size={22} />
        </div>

        <div>
          <h2>CloudCampus</h2>
          <span>Campus Cloud Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
  to={item.path}
  className={({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`
  }
  key={item.label}
>
  <Icon size={19} />
  <span>{item.label}</span>
</NavLink>
          );
        })}

        <p className="nav-label settings-label">SYSTEM</p>

        <NavLink
  to="/settings"
  className={({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`
  }
>
  <Settings size={19} />
  <span>Settings</span>
</NavLink>
      </nav>

      <div className="cloud-status">
        <div className="cloud-status-icon">
          <Cloud size={18} />
        </div>

        <div>
          <strong>Cloud Status</strong>
          <span>
            <i></i> All systems operational
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;