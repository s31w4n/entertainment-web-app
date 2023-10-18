import React, { useState } from "react";
import { AuthFormProps as T } from "@/types";
import { useRouter } from "next/router";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useNotification } from "@/hooks";
import Notification from "./Notification";

const AuthForm: React.FC<T> = ({ isLogin, loginHandler }) => {
  const { notification, handleNotification } = useNotification();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    repeatedPassword: "",
    repeatedPasswordError: "",
    isLoading: false,
  });

  function handleEmail(value: string) {
    setFormData((prevState) => ({ ...prevState, email: value }));
  }

  function handlePassword(value: string) {
    setFormData((prevState) => ({ ...prevState, password: value }));
  }

  function handleRepeatedPassword(value: string) {
    setFormData((prevState) => ({ ...prevState, repeatedPassword: value }));
  }

  function handleSignUpErrors(error: { field: string; message: string }) {
    if (error.field === "email") {
      setFormData((prevState) => ({ ...prevState, emailError: error.message }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, emailError: "" }));
      }, 3000);
    }

    if (error.field === "password") {
      setFormData((prevState) => ({
        ...prevState,
        passwordError: error.message,
      }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, passwordError: "" }));
      }, 3000);
    }
  }

  function handleLoginErrors(error: string) {
    if (error === "User not found") {
      setFormData((prevState) => ({ ...prevState, emailError: error }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, emailError: "" }));
      }, 3000);
    }

    if (error === "Wrong password") {
      setFormData((prevState) => ({ ...prevState, passwordError: error }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, passwordError: "" }));
      }, 3000);
    }
  }

  function comparePasswords() {
    if (formData.password !== formData.repeatedPassword) {
      setFormData((prevState) => ({
        ...prevState,
        repeatedPasswordError: "Passwords are not the same",
      }));

      setTimeout(() => {
        setFormData((prevState) => ({
          ...prevState,
          repeatedPasswordError: "",
        }));
      }, 3000);

      return false;
    }

    return true;
  }

  function clearForm() {
    handleEmail("");
    handlePassword("");
    handleRepeatedPassword("");
  }

  async function createUser(email: string, password: string) {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: data.message,
          field: data.field,
        },
      };
    }

    return data;
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;

    // User Login
    if (isLogin) {
      setFormData((prevState) => ({ ...prevState, isLoading: true }));
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result && !result.error) {
        router.replace("/");
      }

      if (result && result.error) {
        handleLoginErrors(result.error);
      }

      setFormData((prevState) => ({ ...prevState, isLoading: false }));
    } else {
      // User Sign up
      if (!comparePasswords()) {
        return;
      }

      setFormData((prevState) => ({ ...prevState, isLoading: true }));
      const result = await createUser(email, password);

      if (result.error) {
        handleSignUpErrors(result.error);
      }

      if (!result.error) {
        clearForm();
        loginHandler();
      }

      if (result.status === "success") {
        handleNotification(result);
      }

      setFormData((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <AuthInput
        id="email"
        name="email"
        type="email"
        placeholder="Email address"
        content="Your Email"
        value={formData.email}
        error={formData.emailError}
        onChange={handleEmail}
      />
      <AuthInput
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        content="Your Password"
        value={formData.password}
        error={formData.passwordError}
        onChange={handlePassword}
      />
      {isLogin && (
        <Link
          href="/auth/forget-password"
          className="text-right text-app-body-md hover:underline"
        >
          Forget password?
        </Link>
      )}
      {!isLogin && (
        <AuthInput
          id="Repeat password"
          name="Repeat password"
          type="password"
          placeholder="Repeat password"
          content="Repeat password"
          value={formData.repeatedPassword}
          error={formData.repeatedPasswordError}
          onChange={handleRepeatedPassword}
        />
      )}
      <AuthButton
        isLoading={formData.isLoading}
        text={isLogin ? "Login to your account" : "Create an account"}
      />
      <div className="mx-auto text-app-body-md">
        <span className="mr-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button type="button" className="text-app-red" onClick={loginHandler}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </div>
      {notification.active && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
    </form>
  );
};

export default AuthForm;