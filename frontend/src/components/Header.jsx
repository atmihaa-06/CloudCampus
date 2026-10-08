import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search CloudCampus..."
        />
      </div>

      <div className="header-actions">
        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}

export default Header;