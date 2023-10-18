import React from "react";
import { BookmarkButtonProps as T } from "@/types";
import { BookmarkEmpty, BookmarkFull } from "@/assets/icons";
import Loading from "./Loading";

const BookmarkButton: React.FC<T> = ({
  isTrending,
  isBookmarked,
  isBookmarking,
  onClick,
}) => {
  return (
    <button
      className={
        isTrending
          ? "absolute right-2 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-app-dark-blue/50 transition-colors hover:bg-app-white hover:text-app-dark-blue sm:right-6 sm:top-4"
          : "absolute right-2 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-app-dark-blue/50 transition-colors hover:bg-app-white hover:text-app-dark-blue sm:right-4 sm:top-4"
      }
      type="button"
      aria-label="Bookmark"
      onClick={onClick}
    >
      {isBookmarked ? (
        isBookmarking ? (
          <Loading width="w-4" height="h-4" />
        ) : (
          <BookmarkFull />
        )
      ) : isBookmarking ? (
        <Loading width="w-4" height="h-4" />
      ) : (
        <BookmarkEmpty />
      )}
    </button>
  );
};

export default BookmarkButton;