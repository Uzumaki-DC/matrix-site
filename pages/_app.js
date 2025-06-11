// pages/_app.js
import "../styles/globals.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Header />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
