import { useState } from "react";
import {
  User,
  Building2,
  Bell,
  ShieldCheck,
  Cloud,
  Save,
  CheckCircle2,
} from "lucide-react";

function Settings() {
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    assignments: true,
    attendance: true,
    system: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const toggleSecurity = (key) => {
    setSecurity((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="module-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">SYSTEM CONFIGURATION</p>

          <h1>Settings</h1>

          <p className="heading-description">
            Manage CloudCampus platform and administrator settings.
          </p>
        </div>

        <button className="primary-button" onClick={handleSave}>
          {saved ? (
            <>
              <CheckCircle2 size={17} />
              Changes Saved
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="settings-layout">
        <div className="settings-main">
          {/* Administrator Profile */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon">
                <User size={18} />
              </div>

              <div>
                <h3>Administrator Profile</h3>
                <p>Manage your CloudCampus administrator account.</p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="settings-field">
                <label>Full Name</label>
                <input
                  type="text"
                  defaultValue="Admin User"
                />
              </div>

              <div className="settings-field">
                <label>Email Address</label>
                <input
                  type="email"
                  defaultValue="admin@cloudcampus.edu"
                />
              </div>

              <div className="settings-field">
                <label>Role</label>
                <input
                  type="text"
                  value="Administrator"
                  readOnly
                />
              </div>

              <div className="settings-field">
                <label>Department</label>
                <input
                  type="text"
                  defaultValue="Administration"
                />
              </div>
            </div>
          </div>

          {/* Institution */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon green">
                <Building2 size={18} />
              </div>

              <div>
                <h3>Institution Information</h3>
                <p>Configure your campus information.</p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="settings-field full-field">
                <label>Institution Name</label>
                <input
                  type="text"
                  defaultValue="CloudCampus University"
                />
              </div>

              <div className="settings-field">
                <label>Academic Year</label>

                <select defaultValue="2026-27">
                  <option>2026-27</option>
                  <option>2025-26</option>
                  <option>2024-25</option>
                </select>
              </div>

              <div className="settings-field">
                <label>Time Zone</label>

                <select defaultValue="IST">
                  <option value="IST">
                    India Standard Time (IST)
                  </option>
                  <option value="UTC">UTC</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon orange">
                <Bell size={18} />
              </div>

              <div>
                <h3>Notification Preferences</h3>
                <p>Choose which campus updates you receive.</p>
              </div>
            </div>

            <div className="settings-options">
              <div className="settings-option">
                <div>
                  <strong>Assignment Updates</strong>
                  <span>
                    Receive notifications about submissions and
                    deadlines.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    notifications.assignments
                      ? "toggle-on"
                      : ""
                  }`}
                  onClick={() =>
                    toggleNotification("assignments")
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="settings-option">
                <div>
                  <strong>Attendance Alerts</strong>
                  <span>
                    Receive alerts when attendance falls below
                    the threshold.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    notifications.attendance
                      ? "toggle-on"
                      : ""
                  }`}
                  onClick={() =>
                    toggleNotification("attendance")
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="settings-option">
                <div>
                  <strong>System Notifications</strong>
                  <span>
                    Receive important CloudCampus system
                    notifications.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    notifications.system ? "toggle-on" : ""
                  }`}
                  onClick={() =>
                    toggleNotification("system")
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon red">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h3>Security</h3>
                <p>Manage administrator security preferences.</p>
              </div>
            </div>

            <div className="settings-options">
              <div className="settings-option">
                <div>
                  <strong>Two-Factor Authentication</strong>
                  <span>
                    Add an additional authentication layer to
                    administrator login.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    security.twoFactor ? "toggle-on" : ""
                  }`}
                  onClick={() =>
                    toggleSecurity("twoFactor")
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="settings-option">
                <div>
                  <strong>Login Alerts</strong>
                  <span>
                    Get notified when a new administrator login
                    occurs.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    security.loginAlerts ? "toggle-on" : ""
                  }`}
                  onClick={() =>
                    toggleSecurity("loginAlerts")
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="settings-sidebar">
          <div className="settings-card system-status-card">
            <div className="settings-card-header">
              <div className="settings-section-icon">
                <Cloud size={18} />
              </div>

              <div>
                <h3>Cloud Status</h3>
                <p>Current platform health.</p>
              </div>
            </div>

            <div className="system-status">
              <div className="status-row">
                <span>Application</span>

                <strong>
                  <i></i>
                  Operational
                </strong>
              </div>

              <div className="status-row">
                <span>Database</span>

                <strong>
                  <i></i>
                  Operational
                </strong>
              </div>

              <div className="status-row">
                <span>Storage</span>

                <strong>
                  <i></i>
                  Operational
                </strong>
              </div>

              <div className="status-row">
                <span>API Services</span>

                <strong>
                  <i></i>
                  Operational
                </strong>
              </div>
            </div>
          </div>

          <div className="settings-card architecture-note">
            <Cloud size={21} />

            <strong>AWS Cloud Infrastructure</strong>

            <p>
              CloudCampus is designed to run using scalable AWS
              cloud services with secure networking, monitoring,
              backup and disaster recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;