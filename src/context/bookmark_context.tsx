import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import reducer from "../reducer/bookmark_reducer";
import { handleBookmarks } from "@/utils/handleBookmarks";
import { getAllData } from "@/utils";

type InitialStateType = {
  bookmarks: number[];
};

type BookmarkContextType = InitialStateType & {
  addBookmark: (itemId: number) => void;
  removeBookmark: (itemId: number) => void;
};

const initialState: InitialStateType = {
  bookmarks: [],
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

type BookmarkProviderProps = {
  children: React.ReactNode;
};

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider",
    );
  }
  return context;
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const userBookmarks = await handleBookmarks();
      const data = await getAllData();
      const bookmarksData = data.filter((item) =>
        userBookmarks.includes(item.id),
      );
      dispatch({ type: "SET_BOOKMARK", payload: bookmarksData });
      console.log(state.bookmarks);
    };

    fetchData();
  }, [state.bookmarks]);

  const removeBookmark = (itemId: number) => {
    if (state.bookmarks.includes(itemId)) {
      dispatch({ type: "REMOVE_BOOKMARK", payload: itemId });
    }
  };

  const addBookmark = (itemId: number) => {
    if (!state.bookmarks.includes(itemId)) {
      dispatch({ type: "ADD_BOOKMARK", payload: itemId });
    }
  };

  return (
    <BookmarkContext.Provider value={{ ...state, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}
