import React from "react";
import { DetailsGenresProps as T } from "@/types";

const DetailsGenres: React.FC<T> = ({ genres }) => {
  return (
    <div className="pb-5">
      <p className="pb-2 text-app-heading-sm font-semibold text-app-grey">
        Genres
      </p>
      <div className="flex gap-2">
        {genres.map((genre, index) => (
          <span key={index} className="rounded-lg border px-2 py-1">
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DetailsGenres;
