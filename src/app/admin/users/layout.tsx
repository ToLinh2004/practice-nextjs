import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "User",
  description: "User",
};
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="row-span-2 col-span-2">{children}</div>
    </>
  );
}
