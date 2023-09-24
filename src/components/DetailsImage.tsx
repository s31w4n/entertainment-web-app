import React from "react";
import Image from "next/image";
import { BookmarkButton } from "@/components";
import { DetailsImageProps as T } from "@/types";

const DetailsImage: React.FC<T> = ({ poster_path, title, isBookmarked }) => {
  return (
    <div className="relative h-[525px] w-[350px]">
      <Image
        src={`${process.env.TMDB_IMAGE_ENDPOINT}/${poster_path}`}
        alt={title}
        fill
        sizes="100vw,"
        className="rounded-lg object-fill "
        priority
      />
      <BookmarkButton isBookmarked={isBookmarked} />
    </div>
  );
};

export default DetailsImage;
