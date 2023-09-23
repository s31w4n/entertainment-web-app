import React from "react";
import { SearchBar, CollectionNormal } from "@/components";
import { getBookmarks } from "@/utils";
import { BookmarkPageProps } from "@/types";
import { BookmarkIcon } from "@/assets/bookmark";

const Bookmark: React.FC<BookmarkPageProps> = ({ bookmarks }) => {
  const bookmarkMovies = bookmarks.filter((item) => item.category === "Movie");
  const bookmarkSerries = bookmarks.filter(
    (item) => item.category === "TV Series",
  );

  return (
    <>
      <SearchBar placeholder="Search for bookmarked shows" />
      {bookmarks.length === 0 && (
        <div className="flex h-[calc(100vh-133px)] flex-col items-center justify-center gap-3 text-app-greyish-blue/50 sm:h-[calc(100vh-188px)] sm:gap-4 lg:h-[calc(100vh-133px)]">
          <BookmarkIcon className="sm:h-48 sm:w-48 " />
          <p className="font-bold sm:text-app-heading-md">Bookmarks is Empty</p>
        </div>
      )}
      {bookmarkMovies.length > 0 && (
        <CollectionNormal data={bookmarkMovies} title="Bookmarked Movies" />
      )}
      {bookmarkSerries.length > 0 && (
        <CollectionNormal data={bookmarkSerries} title="Bookmarked TV Series" />
      )}
    </>
  );
};

export default Bookmark;

export async function getStaticProps() {
  // Get Bookmarks
  const bookmarks = await getBookmarks();

  return {
    props: {
      bookmarks,
    },
  };
}
