'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function SideBar() {
  const sideBarLink = [
    {
      name: 'Product',
      href: '/dashboard/products/show',
    },
    {
      name: 'User',
      href: '/dashboard/users',
    },
  ];

  const pathname = usePathname();
  return (
    <>
      <div className="max-h-200 left-30 sm:none fixed top-0 h-full w-60 bg-zinc-100">
        <div className="h-12 bg-blue-600 text-white">
          <p className="ml-2 pt-2 text-2xl  hover:text-black">Tờ Linh</p>
        </div>
        {sideBarLink.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <>
              <div
                className={
                  isActive ? 'flex flex-row bg-yellow-400 rounded-r-lg' : 'flex flex-row'
                }
              >
                <div className="mb-2 basis-1/5">
                  <Image
                    src="/product.png"
                    width={30}
                    height={30}
                    alt="Picture of the author"
                    className="ml-2 mt-1"
                  />
                </div>
                <div className="basis mt-2">
                  {' '}
                  <Link
                    href={link.href}
                    key={link.name}
                    className="text-black no-underline "
                  >
                    <p className='hover:text-blue-600'>{link.name}</p>
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
