import React from "react";
import type { NextPage } from "next";
import { HomePageProps as T } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
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

const Home: NextPage<T> = ({ trending, recommended, session }) => {
  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get Trending Media
  const trending = await getTrending();
  // Get Recommended Media
  const recommended = await getRecommended();
    // Get Session
    const session = await getSession({ req: context.req });

  return {
    props: {
      trending,
      recommended,
      session
    },
  };
}
