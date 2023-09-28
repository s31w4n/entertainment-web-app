import React from "react";
import { SeriesPageProps as T } from "@/types";
import { SearchBar, CollectionNormal, Loading } from "@/components";
import { getSeries, getSearchResult, getTitle } from "@/utils";
import { useSearch } from "@/hooks";

const Series: React.FC<T> = ({ series }) => {
  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

  const searchResult = getSearchResult(searchQuery, series);
  const title = getTitle(searchQuery, searchResult);
  return (
    <>
      <SearchBar
        placeholder="Search for TV series"
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
        <CollectionNormal data={series} title="TV Series" />
      )}
    </>
  );
};

export default Series;

export async function getStaticProps() {
  // Get Series
  const series = await getSeries();

  return {
    props: {
      series,
    },
  };
}
