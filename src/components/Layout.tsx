import React, { ReactNode } from "react";
import Head from "next/head";
import { Navigation, Footer } from ".";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Entertainment Web App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Frontend Mentor Challenge Project" />
        <link rel="icon" href="/logo.svg" type="image/x-icon" />
      </Head>
      <header>
        <Navigation />
      </header>
      <main className="mx-4 mt-6 sm:mt-8 md:mx-6 lg:ml-[164px] lg:mr-9">
        {children}
      </main>
    </>
  );
};

export default Layout;
