import React, { useState, useEffect } from "react";
import { CardProps as T } from "@/types";
import { CardImage, CardInfo, BookmarkButton } from ".";
import Notification from "./Notification";
import { useNotification, useHttp } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";
import { messageActions } from "@/features/message/messageSlice";

const CardNormal: React.FC<T> = ({
  category,
  title,
  backdrop_path,
  year,
  rating,
  id,
}) => {
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
        url: "/api/user/handle-bookmark",
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

export default CardNormal;
