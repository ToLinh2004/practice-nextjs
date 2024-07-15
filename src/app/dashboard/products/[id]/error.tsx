'use client';
import { useEffect } from 'react';

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(`${error}`);
  }, [error]);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-2xl text-red-500">Error fetching users data</div>
    </div>
  );
}
