import React from 'react';
import Head from 'next/head';
import '../app/globals.css';
import { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle || 'Clutter'}</title>
        <link rel="preload" href="/fonts/NeueMontreal-Regular.otf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/NeueMontreal-Bold.otf" as="font" crossOrigin="" />
        <link rel="icon" href="/favicon-bowl.ico" sizes="any" />
      </Head>
      <div>{children}</div>
    </>
  );
};

export default Layout;