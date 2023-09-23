import React from "react";
import { CardInfoProps as T } from "@/types";
import { MoviesIcon, SeriesIcon } from "@/assets/icons";

const CardInfo: React.FC<T> = ({
  title,
  category,
  year,
  isTrending,
  rating,
}) => {
  return (
    <div
      className={
        isTrending ? "absolute bottom-4 left-4 sm:bottom-6 sm:left-6" : "mt-2"
      }
    >
      <div
        className={
          isTrending
            ? "text-app-body-xsm flex items-center gap-2 font-light text-app-grey sm:text-app-body-md"
            : "sm:text-app-body-sm flex items-center gap-2 text-[11px] font-light text-app-grey"
        }
      >
        <span>{year}</span>
        <span className="h-1 w-1 rounded-full bg-app-grey"></span>
        <span>
          {category.toLowerCase() === "movie" ? <MoviesIcon /> : <SeriesIcon />}
        </span>
        <span>{category}</span>
        <span
          className={
            isTrending
              ? "hidden h-1 w-1 rounded-full bg-app-grey sm:block"
              : "h-1 w-1 rounded-full bg-app-grey"
          }
        ></span>
        <span className={isTrending ? "hidden sm:block" : ""}>{rating}</span>
      </div>
      <p
        className={
          isTrending
            ? "w-[204px] truncate text-ellipsis text-app-body-md font-medium capitalize sm:w-[422px] sm:text-app-heading-md"
            : "w-11/12 truncate text-ellipsis text-[14px] font-medium capitalize sm:text-app-heading-sm"
        }
      >
        {title}
      </p>
    </div>
  );
};

export default CardInfo;
