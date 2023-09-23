import React from "react";
import { SearchBar, CollectionNormal } from "@/components";
import { getSeries } from "@/utils";
import { SeriesPageProps as T } from "@/types";

const Series: React.FC<T> = ({ series }) => {
  return (
    <>
      <SearchBar placeholder="Search for TV series" />
      <CollectionNormal data={series} title="TV Series" />
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
