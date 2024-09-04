import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Order',
  description: 'Order',
};
export default function OrderLayout({
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
