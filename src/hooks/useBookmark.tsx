import { useState } from "react";
import { handleBookmarks } from "@/utils/handleBookmarks";
import { useBookmarkProps as T } from "@/types";

function useBookmark({ id, handleNotification }: T) {
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleBookmark = async () => {
    setIsBookmarking(true);
    const userBookmarks = await handleBookmarks();

    if (!userBookmarks) return;

    if (userBookmarks.includes(id)) {
      const result = await handleBookmarks("DELETE", id);
      handleNotification(result);
    } else {
      const result = await handleBookmarks("POST", id);
      handleNotification(result);
    }
    setIsBookmarking(false);
  };
  return { isBookmarking, handleBookmark };
}

export default useBookmark;
