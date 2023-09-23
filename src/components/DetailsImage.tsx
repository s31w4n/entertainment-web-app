import React from "react";
import Image from "next/image";
import { BookmarkButton } from "@/components";
import { DetailsImageProps as T } from "@/types";

const DetailsImage: React.FC<T> = ({ poster_path, title, isBookmarked }) => {
  return (
    <div className="relative">
      <Image
        src={`${process.env.TMDB_IMAGE_ENDPOINT}/${poster_path}`}
        alt={title}
        width={350}
        height={525}
        className="rounded-lg object-cover max-[880px]:h-[525px] max-[880px]:w-full"
      />
      <BookmarkButton isBookmarked={isBookmarked} />
    </div>
  );
};

export default DetailsImage;
