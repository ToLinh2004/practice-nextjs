import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Product detail',
  description: 'Product detail',
};
export default function ProductDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
