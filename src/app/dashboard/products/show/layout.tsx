import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Product',
  description: 'Product',
};
export default function ProductLayout({
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
