import notificationAnt, { ArgsProps } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import clsx from "clsx";
import { t } from "../translation/translation";
import "./Notification.scss";

interface OwnProps extends ArgsProps {}

type Props = OwnProps;

let messages: string[] = [];

export const notification = (props: Props) => {
  const { key, message, description, duration } = props;

  if (key && typeof key === "string") {
    if (messages.includes(key)) {
      return;
    }

    messages.push(key);
  }

  return notificationAnt.open({
    ...props,
    duration: duration === undefined ? 5 : duration,
    message: message && t(message.toString()),
    description: description && t(description.toString()),
    placement: "top",
    onClose: () => {
      if (key) {
        messages = messages.filter((messageKey) => messageKey !== key);
      }
      props?.onClose?.();
    },
    className: clsx(props.className, "notification", "e2e-notification"),
  });
};

export const notificationSuccess = (message: string, description?: string, key?: string, duration?: number) =>
  notification({ message, description, type: "success", key, duration });

export const notificationDanger = (message: string, description?: string, key?: string, duration?: number) =>
  notification({ message, description, type: "error", key, duration });

export const notificationWarning = (message: string, description?: string, key?: string, duration?: number) =>
  notification({ message, description, type: "warning", key, duration });
