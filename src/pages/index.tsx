import React from "react";
import { HomePageProps as T } from "@/types";
import { getTrending, getRecommended } from "@/utils";
import { SearchBar, CollectionTrending, CollectionNormal } from "@/components";

const Home: React.FC<T> = ({ trending, recommended }) => {
  return (
    <>
      <SearchBar placeholder="Search for movies or TV series" />
      <CollectionTrending data={trending} title="Trending" />
      <CollectionNormal data={recommended} title="Recommended for you" />
    </>
  );
};

export default Home;

export async function getStaticProps() {
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
