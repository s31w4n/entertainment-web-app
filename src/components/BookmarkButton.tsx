import React from "react";
import { BookmarkButtonProps as T } from "@/types";
import { BookmarkEmpty, BookmarkFull } from "@/assets/icons";

const BookmarkButton: React.FC<T> = ({ isTrending, isBookmarked }) => {
  return (
    <button
      className={
        isTrending
          ? "absolute right-2 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-app-dark-blue/50 transition-colors hover:bg-app-white hover:text-app-dark-blue sm:right-6 sm:top-4"
          : "absolute right-2 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-app-dark-blue/50 transition-colors hover:bg-app-white hover:text-app-dark-blue sm:right-4 sm:top-4"
      }
      type="button"
      aria-label="Bookmark"
    >
      {isBookmarked ? <BookmarkFull /> : <BookmarkEmpty />}
    </button>
  );
};

export default BookmarkButton;
