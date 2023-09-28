import React from "react";
import { SearchBar, CollectionNormal, Loading } from "@/components";
import { MoviePageProps as T } from "@/types";
import { getMovies, getSearchResult, getTitle } from "@/utils";
import { useSearch } from "@/hooks";

const Movies: React.FC<T> = ({ movies }) => {
  const { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery } =
    useSearch();

  const searchResult = getSearchResult(searchQuery, movies);
  const title = getTitle(searchQuery, searchResult);

  return (
    <>
      <SearchBar
        placeholder="Search for movies"
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
        <CollectionNormal data={movies} title="Movies" />
      )}
    </>
  );
};

export default Movies;

export async function getStaticProps() {
  // Get Movies
  const movies = await getMovies();

  return {
    props: {
      movies,
    },
  };
}
