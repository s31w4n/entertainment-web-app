import React from "react";
import { SearchBar, CollectionNormal, Loading } from "@/components";
import { getSearchResult, getTitle } from "@/utils";
import { getBookmarkData } from "@/utils/handleBookmarks";
import { BookmarkPageProps as T } from "@/types";
import { BookmarkIcon } from "@/assets/bookmark";
import { useSearch } from "@/hooks";

const Bookmark: React.FC<T> = ({ bookmarks }) => {
  const bookmarkMovies = bookmarks.filter((item) => item.category === "Movie");
  const bookmarkSeries = bookmarks.filter(
    (item) => item.category === "TV Series",
  );

  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

  const searchResult = getSearchResult(searchQuery, bookmarks);
  const title = getTitle(searchQuery, searchResult);

  return (
    <>
      <SearchBar
        placeholder="Search for bookmarked shows"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {debouncedSearchQuery ? (
        isLoading ? (
          <Loading />
        ) : (
          <CollectionNormal data={searchResult} title={title} />
        )
      ) : bookmarks.length === 0 ? (
        <div className="flex h-[calc(100vh-133px)] flex-col items-center justify-center gap-3 text-app-greyish-blue/50 sm:h-[calc(100vh-188px)] sm:gap-4 lg:h-[calc(100vh-133px)]">
          <BookmarkIcon className="sm:h-48 sm:w-48 " />
          <p className="font-bold sm:text-app-heading-md">Bookmarks is Empty</p>
        </div>
      ) : (
        <>
          {bookmarkMovies.length > 0 && (
            <CollectionNormal data={bookmarkMovies} title="Bookmarked Movies" />
          )}
          {bookmarkSeries.length > 0 && (
            <CollectionNormal
              data={bookmarkSeries}
              title="Bookmarked TV Series"
            />
          )}
        </>
      )}
    </>
  );
};

export default Bookmark;

export async function getStaticProps() {
  // Get Bookmarks
  const bookmarks = await getBookmarkData();

  return {
    props: {
      bookmarks,
    },
    revalidate: 60,
  };
}
