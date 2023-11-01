import React, { ReactNode } from "react";
import Head from "next/head";
import { Navigation } from "..";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Entertainment Web App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Frontend Mentor Challenge Project" />
        <link rel="icon" href="/logo.svg" type="image/x-icon" />
      </Head>
      {router.pathname.startsWith("/auth") ? null : (
        <header>
          <Navigation />
        </header>
      )}
      <main
        className={`${
          router.pathname.startsWith("/auth")
            ? null
            : "mx-4 mt-6 sm:mt-8 md:mx-6 lg:ml-[164px] lg:mr-9"
        }`}
      >
        {children}
        <Toaster position="top-right" />
      </main>
    </>
  );
};

export default Layout;
