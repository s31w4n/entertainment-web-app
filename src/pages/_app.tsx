import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components";
import { SessionProvider } from "next-auth/react";
import { BookmarkProvider } from "@/context/bookmark_context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <BookmarkProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BookmarkProvider>
    </SessionProvider>
  );
}
