import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { signIn } from "next-auth/react";
import { useNotification } from "@/hooks";
import Notification from "./Notification";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";
import { useSession } from "next-auth/react";

const AuthForm: React.FC = () => {
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

  const { data: session } = useSession();
  if (session) {
    console.log("authForm", session);
  }

  const dispatch = useAppDispatch();
  const isLoginMode = useAppSelector((state) => state.auth.isLoginMode);

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

    if (error === "Can't be empty") {
      setFormData((prevState) => ({ ...prevState, passwordError: error }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, passwordError: "" }));
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
    if (isLoginMode) {
      setFormData((prevState) => ({ ...prevState, isLoading: true }));
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result && !result.error) {
        router.replace("/");
        if (session) {
          dispatch(
            authActions.login({
              userId: session.user.userId!,
              bookmarks: session.user.bookmarks!,
            }),
          );
        }
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
        dispatch(authActions.toggleLogin());
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
        type="email"
        placeholder="Email address"
        content="Your Email"
        value={formData.email}
        error={formData.emailError}
        onChange={handleEmail}
      />
      <AuthInput
        id="password"
        type="password"
        placeholder="Password"
        content="Your Password"
        value={formData.password}
        error={formData.passwordError}
        onChange={handlePassword}
      />
      {!isLoginMode && (
        <AuthInput
          id="Repeat password"
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
        text={isLoginMode ? "Login to your account" : "Create an account"}
      />
      <div className="mx-auto text-app-body-md">
        <span className="mr-2">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button
          type="button"
          className="text-app-red"
          onClick={() => dispatch(authActions.toggleLogin())}
        >
          {isLoginMode ? "Sign Up" : "Login"}
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
