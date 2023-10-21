import React from "react";
import { CardProps as T } from "@/types";
import { CardImage, CardInfo, BookmarkButton } from ".";
import Notification from "./Notification";
import { useBookmark, useNotification } from "@/hooks";

const CardTrending: React.FC<T> = ({
  title,
  category,
  year,
  rating,
  backdrop_path,
  bookmarked,
  id,
}) => {
  const { notification, handleNotification } = useNotification();
  const { isBookmarking, handleBookmark } = useBookmark({
    id,
    handleNotification,
  });

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
        onClick={handleBookmark}
      />
      {notification.active && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}{" "}
    </div>
  );
};

export default CardTrending;
