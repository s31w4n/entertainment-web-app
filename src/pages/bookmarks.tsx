import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { SearchBar, CollectionNormal, Loading } from "@/components";
import { getAllData, getSearchResult, getTitle } from "@/utils";
import { BookmarkPageProps as T, Media } from "@/types";
import { BookmarkIcon } from "@/assets/bookmark";
import { useSearch } from "@/hooks";
import { useAppSelector } from "@/app/hooks";

const Bookmark: NextPage<T> = ({ allData }) => {
  const [bookmarked, setBookmarked] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const { bookmarks, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        const userBookmarks = allData.filter((item) =>
          bookmarks.includes(item.id),
        );
        console.log(userBookmarks);
        setBookmarked(userBookmarks);
        setLoading(false);
      } else {
        setBookmarked([]);
      }
    };

    fetchData();
  }, [bookmarks, token]);

  const bookmarkMovies = bookmarked.filter((item) => item.category === "Movie");
  const bookmarkSeries = bookmarked.filter(
    (item) => item.category === "TV Series",
  );

  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

  const searchResult = getSearchResult(searchQuery, bookmarked);
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

export async function getServerSideProps() {
  // Get All Data
  const allData = await getAllData();

  return {
    props: {
      allData,
    },
  };
}
