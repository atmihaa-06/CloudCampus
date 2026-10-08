import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  FileCheck2,
  BookOpen,
  Check,
  Clock3,
} from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://CloudCampus-ALB-126996037.ap-south-1.elb.amazonaws.com/api/notifications")
      .then((response) => response.json())
      .then((data) => {
        setNotifications(
          data.map((notification) => ({
            ...notification,
            unread: notification.is_read === 0,
          }))
        );

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading notifications:", error);
        setLoading(false);
      });
  }, []);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter(
    (notification) => {
      if (filter === "Unread") {
        return notification.unread;
      }

      return true;
    }
  );

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "student":
        return <UserPlus size={18} />;

      case "assignment":
        return <FileCheck2 size={18} />;

      case "attendance":
        return <AlertTriangle size={18} />;

      case "course":
        return <BookOpen size={18} />;

      case "system":
        return <CheckCircle2 size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  const getTime = () => {
    return "Just now";
  };

  return (
    <div className="module-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CAMPUS ACTIVITY</p>

          <h1>Notifications</h1>

          <p className="heading-description">
            Stay updated with important campus and system activity.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={markAllAsRead}
        >
          <Check size={16} />
          Mark all as read
        </button>
      </div>

      <div className="notification-summary">
        <div className="notification-summary-icon">
          <Bell size={21} />
        </div>

        <div>
          <strong>{unreadCount} unread notifications</strong>

          <span>
            You have {unreadCount} notifications that require
            your attention.
          </span>
        </div>
      </div>

      <div className="notification-panel">
        <div className="notification-toolbar">
          <div>
            <h3>Notification Center</h3>

            <p>
              Recent updates from your CloudCampus platform.
            </p>
          </div>

          <div className="notification-tabs">
            <button
              className={filter === "All" ? "active-tab" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </button>

            <button
              className={filter === "Unread" ? "active-tab" : ""}
              onClick={() => setFilter("Unread")}
            >
              Unread

              {unreadCount > 0 && (
                <span className="notification-count">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="notification-list">
          {loading ? (
            <div className="notification-empty">
              <Bell size={30} />

              <strong>Loading notifications...</strong>

              <span>
                Fetching the latest CloudCampus activity.
              </span>
            </div>
          ) : (
            <>
              {filteredNotifications.map((notification) => (
                <div
                  className={`notification-item ${
                    notification.unread
                      ? "unread-notification"
                      : ""
                  }`}
                  key={notification.id}
                >
                  <div
                    className={`notification-icon notification-${notification.type}`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div className="notification-content">
                    <div className="notification-title-row">
                      <strong>{notification.title}</strong>

                      {notification.unread && (
                        <span className="unread-dot"></span>
                      )}
                    </div>

                    <p>{notification.message}</p>

                    <div className="notification-time">
                      <Clock3 size={12} />
                      {getTime()}
                    </div>
                  </div>

                  {notification.unread && (
                    <button
                      className="mark-read-button"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      <Check size={15} />
                      Mark read
                    </button>
                  )}
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="notification-empty">
                  <CheckCircle2 size={30} />

                  <strong>You're all caught up!</strong>

                  <span>
                    There are no unread notifications.
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;