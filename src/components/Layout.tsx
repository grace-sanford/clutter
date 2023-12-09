import React from "react";
import Head from "next/head";
import "../app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle || "Clutter"}</title>
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/NeueMontreal-Bold.otf"
          as="font"
          crossOrigin=""
        />
        <link rel="icon" href="/favicon-bowl.ico" sizes="any" />
      </Head>
      <div>
        {/*Header*/}
        <div
          className="mt-0 flex items-center justify-center"
          style={{ minHeight: "5rem" }}
        >
          <p className="text-center text-3xl items-center justify-center text-red-300">
            CLUTTER
          </p>
        </div>
        <SpeedInsights />
        {children}
      </div>
    </>
  );
};

export default Layout;
