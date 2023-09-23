import React from "react";
import { useRouter } from "next/router";
import { getMediaDetails } from "@/utils";
import { DetailsPageProps as T } from "@/types";
import { GetServerSidePropsContext } from "next";
import { LeftArrow } from "@/assets/icons";
import Image from "next/image";
import { BookmarkButton } from "@/components";
import { StarIcon } from "@/assets/icons";

const MoviesDetails: React.FC<T> = ({ data }) => {
  const router = useRouter();
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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <section className="p-5 md:pb-8 lg:mt-16">
        <div className="pb-6 md:pb-8">
          <button
            onClick={handleGoBack}
            className="group flex items-center justify-center gap-2 rounded-lg bg-app-red px-4 py-1"
          >
            <LeftArrow className="transition-transform group-hover:translate-x-[-5px]" />
            Back
          </button>
        </div>
        <div className="flex max-[880px]:flex-col gap-10">
          <div className="relative">
            <Image
              src={`${process.env.TMDB_IMAGE_ENDPOINT}/${poster_path}`}
              alt={title}
              width={400}
              height={400}
              className="rounded-lg max-[880px]:w-full"
            />
            <BookmarkButton isBookmarked={isBookmarked} />
          </div>
          <div className="min-[880px]:w-[calc(100%-440px)]">
            <div className="pb-10">
              <h1 className="text-app-heading-sm font-semibold md:text-app-heading-md lg:text-app-heading-lg">
                {title}
              </h1>
            </div>
            <div className="pb-10">
              <div className="flex items-center gap-2">
                <StarIcon />
                <span className="text-app-heading-md">
                  <span className="font-bold">{vote_average}</span>/10
                </span>
              </div>
            </div>
            <div className="flex sm:w-10/12 flex-wrap justify-between pb-10 sm:text-app-heading-sm">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-app-grey">Length</span>
                <span>{duration}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-app-grey">Language</span>
                <span>{language}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-app-grey">Year</span>
                <span>{year}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-app-grey">Status</span>
                <span>{status}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pb-10">
              <span className="text-app-heading-sm font-semibold text-app-grey">
                Description
              </span>
              <p>{description}</p>
            </div>
            <div className="flex flex-col gap-2 pb-5">
              <span className="text-app-heading-sm font-semibold text-app-grey">
                Genres
              </span>
              <div className="flex gap-2">
                {genres.map((genre, index) => (
                  <span key={index} className="rounded-lg border px-2 py-1">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
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
      notFound: true, // Return a 404 error
    };
  }

  const data = await getMediaDetails(+id);

  return {
    props: {
      data,
    },
  };
}

export default MoviesDetails;
