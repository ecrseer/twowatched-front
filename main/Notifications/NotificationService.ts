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
  function factory() {
    return {
      history: [] as iNotification[],
      current: [] as iNotification[],
    };
  }
  const persistence = reactive({
    top: factory(),
    bottom: factory(),
  });
  return { persistence };
});

export class NotificationService {
  private persistence: ReturnType<typeof NotificationRepository>["persistence"];

  constructor() {
    const data = NotificationRepository();
    this.persistence = data.persistence;
  }
  get bottom_stack() {
    return this.persistence.bottom.current;
  }
  get top_stack() {
    return this.persistence.top.current;
  }

  public add_fading_notification(
    notification: iNotification,
    location: "top" | "bottom"
  ) {
    this.persistence[location].history.push(notification);
    this.persistence[location].current.unshift(notification);

    setTimeout(() => {
      this.persistence[location].current.pop();
    }, 3000);
  }
}

