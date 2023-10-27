import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import avatar from "@/assets/image-avatar.png";
import {
  Logo,
  HomeIcon,
  MoviesIcon,
  SeriesIcon,
  BookmarkIcon,
} from "@/assets/icons";

const Navigation: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <nav className="h-calc sticky top-0 z-10 flex items-center justify-between bg-app-semi-dark-blue p-4 sm:mx-4 sm:mt-6 sm:rounded-[10px] md:mx-6 lg:fixed lg:left-0 lg:mx-8 lg:mr-0 lg:mt-8 lg:flex-col lg:px-7 lg:py-9">
      <Link href="/">
        <Image
          src={Logo}
          alt="Logo"
          width={25}
          height={20}
          className="sm:h-[25.6px] sm:w-8"
        />
      </Link>
      <ul className="mx-auto flex items-center gap-6 lg:flex-col">
        <li>
          <Link
            href="/"
            className={`${
              currentPath === "/"
                ? "text-app-white"
                : "text-app-greyish-blue hover:text-app-red"
            }`}
          >
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link
            href="/movies"
            className={`${
              currentPath === "/movies"
                ? "text-app-white"
                : "text-app-greyish-blue hover:text-app-red"
            }`}
          >
            <MoviesIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </li>
        <li>
          <Link
            href="/series"
            className={`${
              currentPath === "/series"
                ? "text-app-white"
                : "text-app-greyish-blue hover:text-app-red"
            }`}
          >
            <SeriesIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </li>
        <li>
          <Link
            href="/bookmarks"
            className={`${
              currentPath === "/bookmarks"
                ? "text-app-white"
                : "text-app-greyish-blue hover:text-app-red"
            }`}
          >
            <BookmarkIcon />
          </Link>
        </li>
      </ul>
      <div className="hidden h-40 lg:block"></div>
      <div className="rounded-full bg-app-white">
        <Link href="/auth">
          <Image
            src={avatar}
            alt="user avatar"
            width={24}
            height={24}
            className="cursor-pointer p-px sm:h-8 sm:w-8 lg:h-10 lg:w-10"
            unoptimized={true}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;