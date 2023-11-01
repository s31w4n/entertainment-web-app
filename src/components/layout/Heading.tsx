import React from "react";
import { HeadingProps as T } from "@/types";

const Heading: React.FC<T> = ({ title }) => {
  return (
    <div className="mb-4 flex items-center justify-between sm:mb-6">
      <h2 className="text-[1.25rem] font-light leading-none sm:text-app-heading-lg">
        {title}
      </h2>
    </div>
  );
};

export default Heading;
