'use client';
import { useLoginContext } from '@/app/context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from '@/app/context/SidebarContext';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

export default function SideBar() {
  const { user, loggedIn } = useLoginContext();
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const { language } = useLanguage();

const sideBarLink = [
  {
    name: language === 'en' ? 'Product' : 'Sản phẩm',
    href: '/dashboard/products/show',
    linkIcon: '/window.png',
  },
  {
    name: language === 'en' ? 'User' : 'Người dùng',
    href: '/dashboard/users',
    linkIcon: '/userProfile.png',
  },
  {
    name: language === 'en' ? 'Contact' : 'Liên hệ',
    href: '/dashboard/contacts/show',
    linkIcon: '/phone.png',
  },
  {
    name: language === 'en' ? 'Order' : 'Đơn hàng',
    href: '/dashboard/orders/show',
    linkIcon: '/order.png',
  },
];


  const pathname = usePathname();
  const handleLinkClick = () => {
    toggleSidebar();
  };
  return (
    <>
      {loggedIn && user.role === 'admin' ? (
        <div
          className={`fixed top-16 h-full w-60 bg-zinc-100 transition-transform duration-300 ${
            isSidebarOpen ? 'sm:translate-x-0' : 'sm:-translate-x-full'
          }`}
        >
          {sideBarLink.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <>
                <div className={isActive ? 'flex flex-row border-r-4 border-blue-600 bg-gray-300' : 'flex flex-row hover:bg-gray-300'}>
                  <div className="my-2 ml-4 basis-1/5">
                    <Image src={link.linkIcon} width={28} height={28} alt="Picture of the author" className="ml-2 mt-1 h-6 w-6" />
                  </div>
                  <div className="basis mt-3">
                    {' '}
                    <Link href={link.href} key={link.name} className="text-black no-underline" onClick={handleLinkClick}>
                      <p className="text-sm">{link.name}</p>
                    </Link>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
