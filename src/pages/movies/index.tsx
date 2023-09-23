import React from "react";
import { SearchBar, CollectionNormal } from "@/components";
import { MoviePageProps as T } from "@/types";
import { getMovies } from "@/utils";

const Movies: React.FC<T> = ({ movies }) => {
  return (
    <>
      <SearchBar placeholder="Search for movies" />
      <CollectionNormal data={movies} title="Movies" />
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
