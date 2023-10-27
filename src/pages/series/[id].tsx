import React from "react";
import type { NextPage } from "next";
import { getMediaDetails } from "@/utils";
import { DetailsPageProps as T } from "@/types";
import { GetServerSidePropsContext } from "next";
import {
  BackButton,
  DetailsImage,
  DetailsTitle,
  DetailsRating,
  DetailsInfo,
  DetailsSynopsis,
  DetailsGenres,
} from "@/components";

const SeriesDetails: NextPage<T> = ({ data }) => {
  const {
    poster_path,
    title,
    description,
    duration,
    genres,
    language,
    status,
    vote_average,
    year,
    isBookmarked,
    id,
  } = data;

  return (
    <>
      <section className="p-2 md:pb-8 lg:mt-16">
        <BackButton />
        <div className="flex gap-5 max-[870px]:flex-col sm:gap-10">
          <DetailsImage
            id={id}
            title={title}
            poster_path={poster_path}
            bookmarked={isBookmarked}
          />
          <div className="min-[870px]:w-[calc(100%-440px)]">
            <DetailsTitle title={title} />
            <DetailsRating vote_average={vote_average} />
            <DetailsInfo
              duration={duration}
              language={language}
              year={year}
              status={status}
            />
            <DetailsSynopsis description={description} />
            <DetailsGenres genres={genres} />
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params!;

  if (!id) {
    // Handle the case where id is missing
    return {
      notFound: true, // Returns a 404 error
    };
  }

  const data = await getMediaDetails(+id);

  return {
    props: {
      data,
    },
  };
}

export default SeriesDetails;
