import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';

import { Oswald } from '@next/font/google';

//Preload the oswald font from google
// eslint-disable-next-line @typescript-eslint/quotes
const font = Oswald({ subsets: ['latin'] });

//reference key for local data storage
const DATA_KEY = `localLinks`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<Link[]>([]);

  // update local data function
  const updateLocalData = (newData: Link[]) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(newData));
    setData(newData);
  };

  // Clear local data function
  const clearLocalData = () => {
    localStorage.clear();
    setData([]);
  };

  useEffect(() => {
    console.groupCollapsed(
      `%c🔮 Developed by Dan Howard. Check out the light house scores while you're here? 🔮 \n– https://www.danhowarddesign.com`,
      `display:block;padding:0.125em 1em;font-family:courier;font-size:10px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;`,
    );
    console.groupEnd();
  }, []);

  // populate state using local data on app mount
  useEffect(() => {
    const localData = localStorage.getItem(DATA_KEY);
    setData(localData ? JSON.parse(localData) : []);
  }, []);

  // Arrange props to be passed to children. These could also be served via a context
  const commonProps = { data, updateLocalData, clearLocalData };
  const componentProps = { ...commonProps, ...pageProps };

  return (
    <main>
      {/* add font styling to the document */}
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
