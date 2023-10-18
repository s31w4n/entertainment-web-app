import React from "react";
import { HomePageProps as T } from "@/types";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
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

const Home: React.FC<T> = ({ trending, recommended }) => {
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

export async function getStaticProps(context: GetServerSidePropsContext) {
  // Get Session
  const session = await getSession({ req: context.req });
  // Get Trending Media
  const trending = await getTrending();
  // Get Recommended Media
  const recommended = await getRecommended();

  return {
    props: {
      session,
      trending,
      recommended,
    },
  };
}
