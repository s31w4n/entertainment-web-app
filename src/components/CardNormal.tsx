import React, { useEffect } from "react";
import { CardProps as T } from "@/types";
import { CardImage, CardInfo, BookmarkButton } from ".";
import Notification from "./Notification";
import { useBookmark, useNotification } from "@/hooks";

const CardNormal: React.FC<T> = ({
  category,
  title,
  backdrop_path,
  year,
  rating,
  bookmarked,
  id,
}) => {
  const { notification, handleNotification } = useNotification();
  const { isBookmarking, handleBookmark } = useBookmark({
    id,
    handleNotification,
  });

  useEffect(() => {}, []);

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
        onClick={handleBookmark}
      />
      {notification.active && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
    </div>
  );
};

export default CardNormal;
