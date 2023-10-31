import React from "react";
import Image from "next/image";
import { BookmarkButton } from "@/components";
import { DetailsImageProps as T } from "@/types";
import { useBookmark } from "@/hooks";
import { toBase64, shimmer } from "@/lib/shimmer";

const DetailsImage: React.FC<T> = ({ id, poster_path, title }) => {
  const { isBookmarking, isBookmarked, handleBookmark } = useBookmark(id);

  return (
    <div className="relative h-[525px] w-[350px]">
      <Image
        src={`${process.env.TMDB_IMAGE_ENDPOINT}/${poster_path}`}
        alt={title}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(470, 230))}`}
        fill
        sizes="100vw,"
        className="rounded-lg object-fill "
        priority
      />
      <BookmarkButton
        id={id}
        isBookmarking={isBookmarking}
        isBookmarked={isBookmarked}
        onClick={handleBookmark}
      />
    </div>
  );
};

export default DetailsImage;
