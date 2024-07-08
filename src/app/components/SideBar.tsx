"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
function SideBar() {
  const sideBarLink = [
    { name: "Product", href: "/admin/products/show" },
    { name: "User", href: "/admin/users" },
  ];

  const pathname = usePathname();
  return (
    <>
      <div className="bg-zinc-100 h-full max-h-200 fixed top-0 left-30 w-60">
        <div className="bg-blue-600 h-12">
          <p className="text-2xl text-white pt-2 ml-2">Tờ Ling</p>
        </div>
        {sideBarLink.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <>
              <div
                className={
                  isActive
                    ? "flex flex-row  bg-yellow-400"
                    : "flex flex-row"
                }
              >
                <div className="basis-1/5 mb-2">
                  <Image
                    src="/product.png"
                    width={30}
                    height={30}
                    alt="Picture of the author"
                    className="mt-1 ml-2"
                  />
                </div>
                <div className="basis mt-2">
                  {" "}
                  <Link
                    href={link.href}
                    key={link.name}
                    className="text-black no-underline"
                  >
                    {link.name}
                  </Link>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </>
  );
}

export default SideBar;
