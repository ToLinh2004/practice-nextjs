import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'User',
  description: 'User',
};
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="col-span-2 row-span-2">{children}</div>
    </>
  );
}
