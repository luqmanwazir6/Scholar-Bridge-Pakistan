import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import notificationService from "../../services/notificationService";
import NotificationItem from "../../components/domain/NotificationItem";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { FaBell, FaCheckDouble } from "react-icons/fa";

export const Notifications = () => {
  const { currentUser } = useAuth();
  const { notifications, reloadAll } = useData();

  const userNotifs = notifications.filter(n => !n.userId || n.userId === currentUser?.id);
  const unreadCount = userNotifs.filter(n => !n.read).length;

  const handleMarkRead = async (id) => {
    await notificationService.markAsRead(id);
    await reloadAll();
  };

  const handleMarkAllRead = async () => {
    if (currentUser?.id) {
      await notificationService.markAllAsRead(currentUser.id);
      await reloadAll();
    }
  };

  return (
    <div className="page-notifications" style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Candidate Notifications</h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Real-time updates regarding document verification, correction requests, and award decisions.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} icon={<FaCheckDouble />}>
            Mark All as Read
          </Button>
        )}
      </div>

      {userNotifs.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No Notifications"
          description="You are completely caught up! New status updates from scholarship desks will appear here."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {userNotifs.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
