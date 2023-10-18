import { useState } from "react";
import { NotificationProps } from "@/types";

export default function useNotification() {
  const [notification, setNotification] = useState({
    active: false,
    message: "",
    status: "",
  });

  const handleNotification = (result: NotificationProps) => {
    setNotification({
      active: true,
      message: result.message,
      status: result.status,
    });
    setTimeout(() => {
      setNotification({ active: false, message: "", status: "" });
    }, 3000);
  };

  return { notification, handleNotification };
}
