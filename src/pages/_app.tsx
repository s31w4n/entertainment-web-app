import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import SessionProvider from "@/context/SessionProvider";

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
