import React, { useState } from "react";
import { CardImageProps as T } from "@/types";
import Image from "next/image";
import CardHover from "./CardHover";
import { toBase64, shimmer } from "@/lib/shimmer";

const CardImage: React.FC<T> = ({
  isTrending,
  backdrop_path,
  alt,
  id,
  category,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="relative w-full rounded-lg">
      <div
        className={
          isTrending
            ? "relative h-[140px] w-[240px] sm:h-[230px] sm:w-[470px]"
            : "relative h-[110px]  md:h-[140px]  lg:h-[174px]"
        }
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Image
          className="w-full rounded-lg object-cover"
          src={`${process.env.TMDB_IMAGE_ENDPOINT}/${backdrop_path}`}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(470, 230),
          )}`}
          placeholder="blur"
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw"
        />
        <CardHover hover={isHovering} id={id} category={category} />
      </div>
    </div>
  );
};

export default CardImage;
