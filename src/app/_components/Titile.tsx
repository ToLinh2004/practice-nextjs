'use client';
import Head from 'next/head';
interface TitilePropse {
  name: string;
}
import { useEffect } from 'react';
const TitilePage = ({ name }: TitilePropse) => {
  useEffect(() => {
    document.title = name;
  }, []);
  return (
    <Head>
      <title>{document.title}</title>
      <meta name="description" content="example description" />
    </Head>
  );
};
export default TitilePage;
