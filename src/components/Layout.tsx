import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import React from 'react';

type PropTypes = { children: React.ReactNode };

export default function Home({ children }: PropTypes) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Phantom</title>
        <meta name="description" content="A slick little link storage app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <footer className={styles.footer}>THE FOOTER</footer>
    </div>
  );
}
