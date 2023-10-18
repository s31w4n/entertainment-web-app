import React from "react";
import { LoadingProps as T } from "@/types";

const Loading: React.FC<T> = ({ width = "w-12", height = "h-12" }) => {
  return (
    <div className="absolute right-[50%] top-[50%] z-10 flex translate-x-[50%] translate-y-[-50%] items-center justify-center">
      <div
        className={`${width} ${height} animate-spin rounded-full border-b-2 border-t-2 border-app-red`}
      ></div>
    </div>
  );
};

export default Loading;
