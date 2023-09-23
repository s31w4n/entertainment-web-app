import React from "react";
import Image from "next/image";
import tmdbLogo from "../assets/tmdb-logo.svg";

const Footer: React.FC = () => {
  return (
    <footer className="mb-5 flex w-full flex-col items-center justify-end">
      <p className="text-app-placeholder">Powered by</p>
      <Image src={tmdbLogo} alt="tmdb logo" />
    </footer>
  );
};

export default Footer;
