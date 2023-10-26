import React, { useState } from "react";
import Image from "next/image";
import { BookmarkButton, Notification } from "@/components";
import { DetailsImageProps as T } from "@/types";
import { useNotification, useHttp } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";
import { messageActions } from "@/features/message/messageSlice";

const DetailsImage: React.FC<T> = ({ id, poster_path, title }) => {
  const { notification, handleNotification } = useNotification();
  const dispatch = useAppDispatch();
  const { sendRequest } = useHttp();
  const { userId, bookmarks, token } = useAppSelector((state) => state.auth);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const isBookmarked = bookmarks.includes(id);

  const bookMarkHandler = () => {
    if (!userId) {
      dispatch(messageActions.showLoginMessage());
      return;
    }

    try {
      setIsBookmarking(true);
      sendRequest({
        url: "/api/bookmark",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          itemId: id,
          operation: isBookmarked ? "pull" : "push",
        }),
      });

      dispatch(
        authActions.updateBookmarks({
          id,
          operation: isBookmarked ? "remove" : "add",
        }),
      );
      setIsBookmarking(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        isBookmarked={isBookmarked}
        isBookmarking={isBookmarking}
        onClick={bookMarkHandler}
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
