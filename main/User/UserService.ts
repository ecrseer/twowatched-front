export class UserService {
  public static readonly STORAGE_KEY = "tab_user_id";
  public static startApp() {
    const tab_user = localStorage.getItem(UserService.STORAGE_KEY);

    if (!tab_user) {
      localStorage.setItem(UserService.STORAGE_KEY, utilsRandomId());
    }
  }
  public static getTabUserId() {
    return localStorage.getItem(UserService.STORAGE_KEY) || utilsRandomId();
  }
}

