import React from "react";
import Image from "next/image";
import { BookmarkButton, Notification } from "@/components";
import { DetailsImageProps as T } from "@/types";
import { useBookmark, useNotification } from "@/hooks";

const DetailsImage: React.FC<T> = ({ id, poster_path, title, bookmarked }) => {
  const { notification, handleNotification } = useNotification();
  const { isBookmarking, handleBookmark } = useBookmark({
    id,
    handleNotification,
  });

  return (
    <div className="relative h-[525px] w-[350px]">
      <Image
        src={`${process.env.TMDB_IMAGE_ENDPOINT}/${poster_path}`}
        alt={title}
        fill
        sizes="100vw,"
        className="rounded-lg object-fill "
        priority
      />
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

export default DetailsImage;
