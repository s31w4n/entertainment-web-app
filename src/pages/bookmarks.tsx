import React, { useState, useEffect } from "react";
import { SearchBar, CollectionNormal, Loading } from "@/components";
import { getAllData, getBookmarks, getSearchResult, getTitle } from "@/utils";
import { BookmarkPageProps as T, Media } from "@/types";
import { BookmarkIcon } from "@/assets/bookmark";
import { useSearch } from "@/hooks";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { handleBookmarks } from "@/utils/handleBookmarks";

const Bookmark: React.FC<T> = ({ session, allData }) => {
  const [bookmarks, setBookmarks] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setLoading(true);
        const userBookmarks = await handleBookmarks();
        const data = allData;
        const bookmarksData = data.filter((item) =>
          userBookmarks.includes(item.id),
        );
        setBookmarks(bookmarksData);
        setLoading(false);
      } else {
        setBookmarks([]);
      }
    };

    fetchData();
  }, [setBookmarks]);

  const bookmarkMovies = bookmarks.filter((item) => item.category === "Movie");
  const bookmarkSeries = bookmarks.filter(
    (item) => item.category === "TV Series",
  );

  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

  const searchResult = getSearchResult(searchQuery, bookmarks);
  const title = getTitle(searchQuery, searchResult);

  if (loading) {
    return (
      <>
        <SearchBar
          placeholder="Search for bookmarked shows"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Loading />
      </>
    );
  }

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get Session
  const session = await getSession({ req: context.req });
  // Get All Data
  const allData = await getAllData();

  return {
    props: {
      session,
      allData,
    },
  };
}
