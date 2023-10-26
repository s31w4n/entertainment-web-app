import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useHttp, useNotification } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";
import { Notification } from ".";

const AuthForm: React.FC = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoginMode = useAppSelector((state) => state.auth.isLoginMode);

  const { notification, handleNotification } = useNotification();
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
      }, 1500);
    }

    if (error.field === "password") {
      setFormData((prevState) => ({
        ...prevState,
        passwordError: error.message,
      }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, passwordError: "" }));
      }, 1500);
    }
  }

  function handleLoginErrors(error: string) {
    if (error === "User not found") {
      setFormData((prevState) => ({ ...prevState, emailError: error }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, emailError: "" }));
      }, 1500);
    }

    if (error === "Wrong password") {
      setFormData((prevState) => ({ ...prevState, passwordError: error }));

      setTimeout(() => {
        setFormData((prevState) => ({ ...prevState, passwordError: "" }));
      }, 1500);
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
      }, 1500);

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
    const response = await sendRequest({
      url: "/api/auth/sign-up",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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

    if (isLoginMode) {
      setFormData((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const response = await sendRequest({
          url: "/api/auth/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (response && !response.error) {
          router.replace("/");
        }

        if (response && response.error) {
          handleLoginErrors(response.error);
        }

        const tokenExpirationDate = new Date(
          Date.now() + 1000 * 60 * 60 * 72,
        ).toString();

        dispatch(
          authActions.login({
            userId: response.userId,
            token: response.token,
            bookmarks: response.bookmarks,
            tokenExpirationDate,
          }),
        );
        router.push("/");
        setFormData((prevState) => ({ ...prevState, isLoading: false }));
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!comparePasswords()) {
        return;
      }
      setFormData((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const result = await createUser(email, password);
        if (result.error) {
          handleSignUpErrors(result.error);
        }

        if (!result.error) {
          clearForm();
          // props.loginHandler();
        }

        if (result.status === "success") {
          handleNotification(result);
        }

        setFormData((prevState) => ({ ...prevState, isLoading: false }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <AuthInput
        id="email"
        type="email"
        value={formData.email}
        placeholder="Email address"
        error={formData.emailError}
        onChange={handleEmail}
      />
      <AuthInput
        id="password"
        type="password"
        value={formData.password}
        placeholder="Password"
        error={formData.passwordError}
        onChange={handlePassword}
      />
      {!isLoginMode && (
        <AuthInput
          id="Repeat password"
          type="password"
          value={formData.repeatedPassword}
          placeholder="Repeat password"
          error={formData.repeatedPasswordError}
          onChange={handleRepeatedPassword}
        />
      )}
      <AuthButton
        isLoading={isLoading}
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
