import React from "react";
import { CardProps as T } from "@/types";
import { CardImage, CardInfo, BookmarkButton } from "..";
import { useBookmark } from "@/hooks";

const CardTrending: React.FC<T> = ({
  title,
  category,
  year,
  rating,
  backdrop_path,
  id,
}) => {
  const { isBookmarking, isBookmarked, handleBookmark } = useBookmark(id);

  return (
    <div className="relative cursor-grab active:cursor-grabbing">
      <CardImage
        isTrending
        backdrop_path={backdrop_path}
        alt={title}
        id={id}
        category={category}
      />
      <CardInfo
        isTrending
        title={title}
        category={category}
        year={year}
        rating={rating}
      />
      <BookmarkButton
        isTrending
        id={id}
        isBookmarking={isBookmarking}
        isBookmarked={isBookmarked}
        onClick={handleBookmark}
      />
    </div>
  );
};

export default CardTrending;
