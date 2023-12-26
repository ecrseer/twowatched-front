import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface iNotification {
  id?: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  is_dismissable?: boolean;
}

const NotificationServiceData = defineStore("NotificationServiceData", () => {
  const notifications = ref<iNotification[]>([]);
  return { notifications };
});

export class NotificationService {
  private data: ReturnType<typeof NotificationServiceData>;

  constructor() {
    const data = NotificationServiceData();
    this.data = data;
  }
  public add_notification(notification: iNotification) {
    this.data.notifications.push(notification);
  }
  public get_notifications() {
    return this.data.notifications;
  }
}

