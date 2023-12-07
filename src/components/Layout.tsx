import React from "react";
import Head from "next/head";
import "../app/globals.css";
import Link from 'next/link'
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      {/* <div
          //<CreateGame/>
          className="flex flex-row items-center justify-center gap-2 p-8 lg:p-0 text-sm mb-2 mt-2 text-red-300"
          style={{ minHeight: "10vh" }}
        >
          <span className="lg:whitespace-nowrap">code by</span>
          <code className="font-mono font-bold whitespace-nowrap lg:ml-2">
            <a href="https://github.com/grace-sanford" target="_blank">
              @gracesanford
            </a>
          </code>{" "}
          |
          <Link className="underline" href="/about">
            about this project
          </Link>
        </div> */}
    </>
  );
};

export default Layout;
