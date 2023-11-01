import React from "react";
import { DetailsTitleProps as T } from "@/types";

const DetailsTitle: React.FC<T> = ({ title }) => {
  return (
    <div className="pb-5 sm:pb-10">
      <h1 className="text-app-heading-sm font-semibold md:text-app-heading-md lg:text-app-heading-lg">
        {title}
      </h1>
    </div>
  );
};

export default DetailsTitle;
