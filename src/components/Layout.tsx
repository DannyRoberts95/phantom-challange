import Head from 'next/head';
import React from 'react';
import CreateLinkSection from '@/components/CreateLinkSection';
import Header from './Header';
type PropTypes = {
  children: React.ReactNode;
  data: Link[];
  updateLocalData: (newData: Link[]) => void;
  clearLocalData: () => void;
};

export default function Home({
  children,
  data,
  updateLocalData,
  clearLocalData,
}: PropTypes) {
  return (
    <div>
      <Head>
        <title>Phantom</title>
        <meta name="description" content="A slick little link storage app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <CreateLinkSection
        links={data}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />

      {children}
    </div>
  );
}
