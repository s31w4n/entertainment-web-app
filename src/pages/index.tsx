import React, { useEffect } from "react";
import type { NextPage } from "next";
import { HomePageProps as T } from "@/types";
import {
  getTrending,
  getRecommended,
  getSearchResult,
  getTitle,
} from "@/utils";
import { useSearch } from "@/hooks";
import {
  SearchBar,
  CollectionTrending,
  CollectionNormal,
  Loading,
} from "@/components";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";

const Home: NextPage<T> = ({ trending, recommended }) => {
  const dispatch = useAppDispatch();
  const { token, tokenExpirationDate } = useAppSelector((state) => state.auth);
  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

  useEffect(() => {
    let logoutTimer;
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(
        () => dispatch(authActions.logout()),
        remainingTime,
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, dispatch, tokenExpirationDate]);

  const allData = trending.concat(recommended);
  const searchResult = getSearchResult(searchQuery, allData);
  const title = getTitle(searchQuery, searchResult);

  return (
    <>
      <SearchBar
        placeholder="Search for movies or TV series"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {debouncedSearchQuery ? (
        isLoading ? (
          <Loading />
        ) : (
          <CollectionNormal data={searchResult} title={title} />
        )
      ) : (
        <>
          <CollectionTrending data={trending} title="Trending" />
          <CollectionNormal data={recommended} title="Recommended for you" />
        </>
      )}
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // Get Trending Media
  const trending = await getTrending();
  // Get Recommended Media
  const recommended = await getRecommended();

  return {
    props: {
      trending,
      recommended,
    },
  };
}
