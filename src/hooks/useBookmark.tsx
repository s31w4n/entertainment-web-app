import { useState } from "react";
import { handleBookmarks } from "@/utils/handleBookmarks";
import { useBookmarkProps as T } from "@/types";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";

function useBookmark({ id, handleNotification }: T) {
  const [isBookmarking, setIsBookmarking] = useState(false);
  const bookmarks = useAppSelector((state) => state.auth.bookmarks);
  const dispatch = useAppDispatch();
  const isBookmarked = bookmarks.includes(id);
  console.log(bookmarks);

  const handleBookmark = async () => {
    setIsBookmarking(true);
    const userBookmarks = await handleBookmarks();

    if (!userBookmarks) return;

    if (userBookmarks.includes(id)) {
      const result = await handleBookmarks("DELETE", id);
      dispatch(authActions.updateBookmarks({ id, operation: "pull" }));
      handleNotification(result);
    } else {
      const result = await handleBookmarks("POST", id);
      dispatch(authActions.updateBookmarks({ id, operation: "push" }));
      handleNotification(result);
    }
    setIsBookmarking(false);
  };
  return { isBookmarking, isBookmarked, handleBookmark };
}

export default useBookmark;
