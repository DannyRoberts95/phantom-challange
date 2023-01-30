import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';

import { Oswald } from '@next/font/google';

//Preload the oswald font from google
// eslint-disable-next-line @typescript-eslint/quotes
const font = Oswald({ subsets: ['latin'] });

const DATA_KEY = `localLinks`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState([]);

  // update local data
  const updateLocalData = (newData: Link[]) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(newData));
    setData(newData);
  };

  // Clear local data
  const clearLocalData = () => {
    localStorage.clear();
    setData([]);
  };

  // populate the context using local data on mount
  useEffect(() => {
    const localData = localStorage.getItem(DATA_KEY);
    setData(localData ? JSON.parse(localData) : []);
  }, []);

  const commonProps = { data, updateLocalData, clearLocalData };
  const componentProps = { ...commonProps, ...pageProps };

  return (
    <main>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Layout {...commonProps}>
        <Component {...componentProps} />
      </Layout>
    </main>
  );
}
