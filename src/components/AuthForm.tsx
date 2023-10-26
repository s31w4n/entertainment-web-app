import React, { useRef } from "react";
import { useRouter } from "next/router";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useHttp } from "@/hooks";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";

const AuthForm: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const isLoginMode = useAppSelector((state) => state.auth.isLoginMode);

  const submitHandler = handleSubmit(async (data) => {
    if (isLoginMode) {
      try {
        const response = await sendRequest({
          url: "/api/auth/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
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
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await sendRequest({
          url: "/api/auth/sign-up",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
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
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <AuthInput
        id="email"
        type="email"
        placeholder="Email address"
        error={error}
        {...register("email", {
          required: true,
        })}
      />
      <AuthInput
        id="password"
        type="password"
        placeholder="Password"
        error={error}
        {...register("password", {
          required: true,
        })}
      />
      {!isLoginMode && (
        <AuthInput
          id="Repeat password"
          type="password"
          placeholder="Repeat password"
          error={error}
          {...register("password_repeat", {
            validate: (value) => value === password.current,
          })}
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
    </form>
  );
};

export default AuthForm;
