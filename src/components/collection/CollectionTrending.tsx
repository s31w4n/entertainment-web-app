import "swiper/css";
import React from "react";
import { CollectionProps as T } from "@/types";
import { CardTrending, Heading, Loading } from "..";
import { Swiper, SwiperSlide } from "swiper/react";

const CollectionTrending: React.FC<T> = ({ data, title }) => {
  return (
    <section className="mb-6 md:mb-10">
      {data ? (
        <ul>
          <Heading title={title} />
          <Swiper
            spaceBetween={16}
            slidesPerView={"auto"}
            breakpoints={{
              768: {
                spaceBetween: 24,
              },
              1024: {
                spaceBetween: 36,
              },
            }}
          >
            {data.map((item) => (
              <SwiperSlide key={item.id} style={{ width: "auto" }}>
                <CardTrending
                  id={item.id}
                  category={item.category}
                  title={item.title}
                  backdrop_path={item.backdrop_path}
                  year={item.year}
                  rating={item.rating}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default CollectionTrending;
