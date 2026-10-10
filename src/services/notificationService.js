/**
 * Notification Service
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_NOTIFICATIONS } from "../data/seedNotifications";

const { STORAGE_KEYS } = API_CONFIG;

export const notificationService = {
  async getAll() {
    await delay(50);
    return getStored(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
  },

  async getByUserId(userId) {
    await delay(60);
    const list = getStored(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    return list.filter(n => !n.userId || n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async markAsRead(id) {
    await delay(50);
    const list = getStored(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      setStored(STORAGE_KEYS.NOTIFICATIONS, list);
    }
    return item;
  },

  async markAllAsRead(userId) {
    await delay(80);
    const list = getStored(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    list.forEach(n => {
      if (!n.userId || n.userId === userId) {
        n.read = true;
      }
    });
    setStored(STORAGE_KEYS.NOTIFICATIONS, list);
    return true;
  },

  async createNotification({ userId, type = "info", title, message, link = "" }) {
    const list = getStored(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    const newNotif = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      userId,
      type,
      title,
      message,
      link,
      createdAt: new Date().toISOString(),
      read: false,
    };
    list.unshift(newNotif);
    setStored(STORAGE_KEYS.NOTIFICATIONS, list);
    return newNotif;
  }
};

export default notificationService;
