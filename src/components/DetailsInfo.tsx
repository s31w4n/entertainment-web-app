import React from "react";
import { DetailsInfoProps as T } from "@/types";

const DetailsInfo: React.FC<T> = ({ duration, language, year, status }) => {
  return (
    <div className="flex flex-wrap justify-between pb-5 text-[14px] font-medium sm:w-10/12 sm:pb-10 sm:text-app-heading-sm">
      <div className="flex flex-col gap-2">
        <span className="font-medium text-app-grey">Length</span>
        <span>{duration}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-app-grey">Language</span>
        <span>{language}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-app-grey">Year</span>
        <span>{year}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-app-grey">Status</span>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default DetailsInfo;
