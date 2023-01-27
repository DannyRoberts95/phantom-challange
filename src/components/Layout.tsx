import Head from 'next/head';
import React from 'react';

type PropTypes = { children: React.ReactNode };

export default function Home({ children }: PropTypes) {
  return (
    <div className={`container`}>
      <Head>
        <title>Phantom</title>
        <meta name="description" content="A slick little link storage app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  );
}
