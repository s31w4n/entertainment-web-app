import React from "react";
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

const SeriesDetails: React.FC<T> = ({ data }) => {
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
  } = data;

  return (
    <>
      <section className="p-5 md:pb-8 lg:mt-16">
        <BackButton />
        <div className="flex gap-5 max-[880px]:flex-col sm:gap-10">
          <DetailsImage
            title={title}
            poster_path={poster_path}
            isBookmarked={isBookmarked}
          />
          <div className="min-[880px]:w-[calc(100%-440px)]">
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
