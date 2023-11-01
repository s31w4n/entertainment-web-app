import React from "react";
import { CardHoverProps as T } from "@/types";
import SearchButton from "../button/SearchButton";

const CardHover: React.FC<T> = ({ hover, id, category }) => {
  const hoverClass = hover ? "opacity-100" : "opacity-0";
  return (
    <div
      className={`${hoverClass} absolute inset-0 flex items-center justify-center rounded-lg bg-app-black/50 transition-opacity`}
    >
      <SearchButton id={id} category={category} />
    </div>
  );
};

export default CardHover;
