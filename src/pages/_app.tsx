import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components";
import SessionProvider from "./SessionProvider";
import { BookmarkProvider } from "@/context/bookmark_context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <BookmarkProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BookmarkProvider>
    </SessionProvider>
  );
}
 