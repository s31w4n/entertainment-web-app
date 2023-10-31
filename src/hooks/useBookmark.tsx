import { useState } from "react";
import { handleBookmarks } from "@/utils/handleBookmarks";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function useBookmark(id: number) {
  const [isBookmarking, setIsBookmarking] = useState(false);
  const bookmarks = useAppSelector((state) => state.auth.bookmarks);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const isBookmarked = bookmarks.includes(id);
  const operation = isBookmarked ? "remove" : "add";

  const handleBookmark = async () => {
    if (!session) {
      toast.error("Please login to bookmark");
      return;
    }

    setIsBookmarking(true);
    const userBookmarks = await handleBookmarks();

    if (userBookmarks.includes(id)) {
      const result = await handleBookmarks("DELETE", id);
      dispatch(authActions.updateBookmarks({ id, operation: operation }));
      toast.success(result);
    } else {
      const result = await handleBookmarks("POST", id);
      dispatch(authActions.updateBookmarks({ id, operation: operation }));
      toast.success(result);
    }
    setIsBookmarking(false);
  };
  return { isBookmarking, isBookmarked, handleBookmark };
}

export default useBookmark;
