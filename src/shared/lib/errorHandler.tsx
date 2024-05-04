import { ERROR_STATUS } from "../config/error";
import { notification, notificationDanger, notificationWarning } from "../ui/notification";

const errorHandler = (
  error: any,
  message?: string,
  type: "error" | "warning" = "error",
  messagesByCode?: { [key: number]: string }
) => {
  if (!error && !message) return null;

  const dataErrorMessage = error?.data?.message;

  if (error?.status) {
    if (error?.status === 401) {
      return;
    }
    if (messagesByCode?.[error.status]) {
      notification({ message: messagesByCode?.[error.status], type });
      return;
    }

    switch (error.status) {
      case 400:
        notificationDanger(ERROR_STATUS["400"], undefined, "400");
        break;
      case 500:
        notificationDanger(ERROR_STATUS["500"], undefined, "500");
        break;
      case 403:
        notificationDanger(ERROR_STATUS["403"], undefined, "403");
        break;
      case 404:
        notificationDanger(ERROR_STATUS["400"], undefined, "400");
        break;
      default:
        notification({ message: message || dataErrorMessage, type });
    }
  } else if (error && error.message === "Network Error") {
    notificationWarning(ERROR_STATUS["0"], undefined, "Network Error");
  } else if (message) {
    notification({ message: message, type });
  }
};

export default errorHandler;
