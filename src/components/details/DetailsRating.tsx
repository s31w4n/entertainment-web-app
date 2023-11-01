import React from "react";
import { DetailsRatingProps as T } from "@/types";
import { StarIcon } from "@/assets/icons";

const DetailsRating: React.FC<T> = ({ vote_average }) => {
  return (
    <div className="pb-5 sm:pb-10">
      <div className="flex items-center gap-2">
        <StarIcon />
        <span className="text-app-heading-sm md:text-app-heading-md">
          <span className="font-bold">{vote_average}</span>/10
        </span>
      </div>
    </div>
  );
};

export default DetailsRating;
