import React from "react";
import { SearchBar, CollectionNormal, Loading } from "@/components";
import { getBookmarks, getSearchResult, getTitle } from "@/utils";
import { BookmarkPageProps as T } from "@/types";
import { BookmarkIcon } from "@/assets/bookmark";
import { useSearch } from "@/hooks";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const Bookmark: React.FC<T> = ({ bookmarks, session }) => {
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
      ) : !session || bookmarks.length === 0 ? (
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

export async function getStaticProps(context: GetServerSidePropsContext) {
  // Get Session
  const session = await getSession({ req: context.req });
  // Get Bookmarks
  const bookmarks = await getBookmarks();

  return {
    props: {
      bookmarks,
      session,
    },
    revalidate: 60,
  };
}
