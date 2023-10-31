import React, { useState } from "react";
import { NotificationProps as T } from "@/types";
import { AuthButton, AuthInput, Notification } from "@/components";
import { useNotification } from "@/hooks";

const ChangePasswordFrom: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { notification, handleNotification } = useNotification();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    passwordChanged: false,
  });

  function handleCurrentPassword(value: string) {
    setFormData((prevState) => ({ ...prevState, currentPassword: value }));
  }

  function handleNewPassword(value: string) {
    setFormData((prevState) => ({ ...prevState, newPassword: value }));
  }

  const [changePasswordError, setChangePasswordError] = useState({
    currentPassword: "",
    newPassword: "",
  });

  function handleChangePasswordErrors(error: T) {
    if (error.field === "currentPassword") {
      setChangePasswordError((prevState) => ({
        ...prevState,
        currentPassword: error.message,
      }));

      setTimeout(() => {
        setChangePasswordError((prevState) => ({
          ...prevState,
          currentPassword: "",
        }));
      }, 3000);
    }

    if (error.field === "newPassword") {
      setChangePasswordError((prevState) => ({
        ...prevState,
        newPassword: error.message,
      }));

      setTimeout(() => {
        setChangePasswordError((prevState) => ({
          ...prevState,
          newPassword: "",
        }));
      }, 3000);
    }
  }

  function clearInputs(result: T) {
    if (result.status === "success") {
      setFormData((prevState) => ({
        ...prevState,
        newPassword: "",
        currentPassword: "",
        passwordChanged: false,
      }));
      handleNotification(result);
    }
  }

  async function changePasswordHandler(passwords: {
    newPassword: string;
    currentPassword: string;
  }) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwords),
    });

    const data = await response.json();
    handleChangePasswordErrors(data);
    clearInputs(data);
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await changePasswordHandler(formData);
    setIsLoading(false);
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <AuthInput
        id="password"
        type="password"
        placeholder="Password"
        content="Your Password"
        value={formData.currentPassword}
        error={changePasswordError.currentPassword}
        onChange={handleCurrentPassword}
      />
      <AuthInput
        id="Repeat password"
        type="password"
        placeholder="Repeat password"
        content="Repeat password"
        value={formData.newPassword}
        error={changePasswordError.newPassword}
        onChange={handleNewPassword}
      />
      <AuthButton isLoading={isLoading} text="Change password" />
      {notification.active && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
    </form>
  );
};

export default ChangePasswordFrom;
