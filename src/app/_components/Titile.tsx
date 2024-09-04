'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface TitleProps {
  name: string;
}

const TitlePage = ({ name }: TitleProps) => {
  const [pageTitle, setPageTitle] = useState(name);

  useEffect(() => {
    setPageTitle(name);
    document.title = name;
  }, [name]);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content="example description" />
    </Head>
  );
};

export default TitlePage;
