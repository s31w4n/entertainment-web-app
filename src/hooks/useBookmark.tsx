import { useState } from "react";
import { handleBookmarks } from "@/utils/handleBookmarks";
import { useBookmarkProps as T } from "@/types";
import { useBookmarkContext } from "@/context/bookmark_context";

function useBookmark({ id, handleNotification }: T) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleBookmark = async () => {
    setIsBookmarking(true);
    const userBookmarks = await handleBookmarks();

    if (!userBookmarks) return;

    if (userBookmarks.includes(id)) {
      const result = await handleBookmarks("DELETE", id);
      removeBookmark(id);
      handleNotification(result);
    } else {
      const result = await handleBookmarks("POST", id);
      addBookmark(id);
      handleNotification(result);
    }
    if (bookmarks.includes(id)) {
      setIsBookmarking(true);
    } else {
      setIsBookmarked(false);
    }
  };
  return { isBookmarked, isBookmarking, handleBookmark };
}

export default useBookmark;
