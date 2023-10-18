import { useState } from "react";
import { handleBookmarks } from "@/utils/handleBookmarks";
import { useBookmarkProps as T } from "@/types";

function useBookmark({ title, bookmarked, handleNotification }: T) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleBookmark = async () => {
    setIsBookmarking(true);
    const userBookmarks = await handleBookmarks();

    if (!userBookmarks) return;

    if (userBookmarks.includes(title)) {
      const result = await handleBookmarks("DELETE", title);
      handleNotification(result);
    } else {
      const result = await handleBookmarks("POST", title);
      handleNotification(result);
    }
    setIsBookmarked((prev) => !prev);
    setIsBookmarking(false);
  };
  return { isBookmarked, isBookmarking, handleBookmark };
}

export default useBookmark;