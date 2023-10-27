import React from "react";
import { AuthButtonProps as T } from "@/types";
import { Loading } from ".";

const AuthButton: React.FC<T> = ({ isLoading, text, onClick }) => {
  const bgColor = isLoading ? "bg-app-white" : "bg-app-red";
  return (
    <button
      onClick={onClick}
      className={`relative mt-4 h-12 w-full rounded-lg ${bgColor} text-app-body-md font-light text-app-white transition-colors duration-500 hover:bg-app-white hover:text-app-dark-blue`}
    >
      {isLoading ? <Loading width="w-4" height="h-4" /> : `${text}`}
    </button>
  );
};

export default AuthButton;