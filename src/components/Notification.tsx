import { NotificationProps as T } from "@/types";
import { createPortal } from "react-dom";

const Notification: React.FC<T> = ({ message, status }) => {
  const backgroundColor =
    status === "success" ? "bg-app-greyish-blue" : "bg-app-red";

  return createPortal(
    <div
      className={`text-[10px] fixed right-[2.4rem] top-[12rem] rounded-[0.8rem] p-[1.5rem] ${backgroundColor} animate-notification z-10`}
    >
      <p>{message}</p>
    </div>,
    document.getElementById("notifications") as HTMLElement,
  );
};
export default Notification;
