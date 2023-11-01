import React from "react";
import Link from "next/link";
import { SearchIcon } from "@/assets/icons";
import { SearchButtonProps as T } from "@/types";

const SearchButton: React.FC<T> = ({ category, id }) => {
  function setCategory(category: string) {
    if (category === "Movie") {
      return "movies";
    }
    if (category === "TV Series") {
      return "series";
    }
  }
  
  return (
    <Link
      href={`${setCategory(category)}/${id}`}
      className="relative z-20 flex items-center rounded-full bg-app-white/25 py-2 text-app-heading-sm font-light text-app-white"
    >
      <SearchIcon className="mx-2 h-8 w-8" />
    </Link>
  );
};

export default SearchButton;
