import React from "react";
import { DetailsSynopsisProps as T } from "@/types";

const DetailsSynopsis: React.FC<T> = ({ description }) => {
  return (
    <div className="pb-5 sm:pb-10">
      <p className="pb-2 text-app-heading-sm font-semibold text-app-grey">
        Synopsis
      </p>
      <p>{description}</p>
    </div>
  );
};

export default DetailsSynopsis;
