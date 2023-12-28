import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface iNotification {
  id?: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  is_dismissable?: boolean;
  onAccept?: () => Promise<any>;
}

const NotificationRepository = defineStore("NotificationRepository", () => {
  const persistence = reactive({
    history: [] as iNotification[],
    current: [] as iNotification[],
  });
  return { persistence };
});

export class NotificationService {
  private persistence: ReturnType<typeof NotificationRepository>["persistence"];

  constructor() {
    const data = NotificationRepository();
    this.persistence = data.persistence;
  }
  get stack() {
    return this.persistence.current;
  }

  public add_fading_notification(notification: iNotification) {
    this.persistence.history.push(notification);
    this.persistence.current.unshift(notification);

    setTimeout(() => {
      this.persistence.current.pop();
    }, 3000);
  }
}

