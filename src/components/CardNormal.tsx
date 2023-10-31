import React from "react";
import { CardProps as T } from "@/types";
import { CardImage, CardInfo, BookmarkButton } from ".";
import { useBookmark } from "@/hooks";

const CardNormal: React.FC<T> = ({
  category,
  title,
  backdrop_path,
  year,
  rating,
  id,
}) => {
  const { isBookmarking, isBookmarked, handleBookmark } = useBookmark(id);

  return (
    <div className="relative">
      <CardImage
        backdrop_path={backdrop_path}
        alt={title}
        id={id}
        category={category}
      />
      <CardInfo title={title} category={category} year={year} rating={rating} />
      <BookmarkButton
        id={id}
        isBookmarking={isBookmarking}
        isBookmarked={isBookmarked}
        onClick={handleBookmark}
      />
    </div>
  );
};

export default CardNormal;
