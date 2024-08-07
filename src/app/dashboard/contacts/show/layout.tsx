import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact',
};
export default function ContactLayout({
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
