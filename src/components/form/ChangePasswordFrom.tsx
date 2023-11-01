import React, { useState } from "react";
import { FormButton, FormInput } from "@/components";
import toast from "react-hot-toast";

const ChangePasswordFrom: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  function handleChangePasswordErrors(error: any) {
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

  function clearInputs(result: any) {
    if (result.status === "success") {
      setFormData((prevState) => ({
        ...prevState,
        newPassword: "",
        currentPassword: "",
        passwordChanged: false,
      }));
      toast.success(result.message);
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
      <FormInput
        id="password"
        type="password"
        placeholder="Current Password"
        content="Your Password"
        value={formData.currentPassword}
        error={changePasswordError.currentPassword}
        onChange={handleCurrentPassword}
      />
      <FormInput
        id="New password"
        type="password"
        placeholder="New Password"
        content="New Password"
        value={formData.newPassword}
        error={changePasswordError.newPassword}
        onChange={handleNewPassword}
      />
      <FormButton isLoading={isLoading} text="Change password" />
    </form>
  );
};

export default ChangePasswordFrom;
