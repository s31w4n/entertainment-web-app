import React from "react";
import { CollectionProps as T } from "@/types";
import { CardNormal, Heading, Loading } from ".";

const CollectionNormal: React.FC<T> = ({ data, title }) => {
  return (
    <>
      {data ? (
        <section className="mb-6 md:mb-10">
          <Heading title={title} />
          <section className="relative grid grid-cols-cards-mobile gap-4 sm:grid-cols-cards-tablet sm:gap-x-7 sm:gap-y-6 lg:grid-cols-cards-desktop xl:gap-x-10 xl:gap-y-8">
            {data.map((item) => (
              <CardNormal
                key={item.id}
                id={item.id}
                category={item.category}
                title={item.title}
                backdrop_path={item.backdrop_path}
                year={item.year}
                rating={item.rating}
              />
            ))}
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CollectionNormal;
