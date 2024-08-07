'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import CreateModalRegister from '@/app/_components/CreateModalRegister';
import CreateModalLogin from '@/app/_components/CreateModalLogin';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/app/context/UserContext';
import { useSidebarContext } from '@/app/context/SidebarContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent } from '@/app/types';
import { useCart } from '@/app/context/CartContext';

export default function Header() {
  const { loggedIn, setLoggedIn, user, setUser } = useLoginContext();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showCreateModalLogin, setShowCreateModalLogin] = useState<boolean>(false);
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenCategory, setDropdownOpenCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();

  const handleSearch = (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/products/show/?query=${searchQuery}`);
  };
  const handleDropdownOpen = () => setDropdownOpen(true);
  const handleDropdownClose = () => {
    setTimeout(() => setDropdownOpen(false), 100);
  };

  const handleDropdownOpenCategory = () => setDropdownOpenCategory(true);
  const handleDropdownCloseCategory = () => {
    setTimeout(() => setDropdownOpenCategory(false), 100);
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('account');
    setLoggedIn(false);
    setShowCreateModalLogin(true);
    setUser({
      id: 0,
      fullName: '',
      email: '',
      password: '',
      avatar: '',
      role: '',
      status: '',
      address: '',
      date: '',
      phone: '',
    });
    router.push('/');
  };

  return (
    <>
      <div className="h-26 fixed left-0 right-0 top-0 flex w-full flex-row bg-blue-600">
        <div className="fixed left-0 right-0 top-0 flex h-16 w-full flex-row bg-blue-600">
          <div className="flex basis-3/12 items-center sm:basis-1/3">
            <div className="relative mt-2 hidden sm:ml-2 sm:block">
              <button onClick={toggleSidebar} className="text-white hover:text-black focus:outline-none" type="button">
                <Image src="/menu.png" alt="menu" width={28} height={28} style={{ objectFit: 'contain' }} />
              </button>
            </div>

            <div className="ml-6 h-12 w-12 rounded-full bg-white sm:hidden">
              <Image src="/logoShoe.png" alt="menu" width={40} height={40} className="h-12 w-12 rounded-full sm:h-6 sm:w-6 sm:rounded-full" />
            </div>
            {user.role === 'admin' ? (
              <Link href="/dashboard" className="sm:hidden">
                <span className="text-md ml-2 mt-2 font-bold text-white hover:text-black">V-Splush</span>
              </Link>
            ) : (
              <Link href="/home" className="sm:hidden">
                <span className="text-md ml-2 mt-2 font-bold text-white hover:text-black">V-Splush</span>
              </Link>
            )}
          </div>
          <div className="ml-20 basis-9/12 justify-items-start sm:ml-0">
            {user.role !== 'admin' ? (
              <div className="float-start mt-3 w-5/6">
                <div className="flex flex-row">
                  {/* <div className="basis-4">
                    <select className="custom-select h-8 bg-gray-300 text-sm">
                      <option className="bg-white text-sm">Categories</option>
                      <option className="bg-white text-sm">Category 1</option>
                      <option className="bg-white text-sm">Category 2</option>
                      <option className="bg-white text-sm">Category 3</option>
                    </select>
                  </div> */}
                  <div className="basis-3/4">
                    <input
                      type="text"
                      className="h-8 w-full rounded-l-md p-2 text-sm focus:outline-none"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button type="button" className="h-8 basis-1 rounded-r-md bg-yellow-300" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} className="mx-2 mt-2 text-black" />
                  </button>
                  <Link href="/products/cart" className="ml-20 basis-1 rounded-md bg-yellow-300 hover:bg-white">
                    <div className="relative flex">
                      <FontAwesomeIcon icon={faShoppingCart} className="mt-2 w-12 text-black" />
                      <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm">
                        {cartCount}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="float-end">
              {loggedIn ? (
                <>
                  <div className="relative">
                    <button
                      className="text-2sm mr-3 mt-2 flex items-center text-white hover:text-black"
                      data-dropdown-trigger="hover"
                      data-dropdown-toggle="dropdownDelay"
                      data-dropdown-delay="100"
                      onMouseEnter={handleDropdownOpen}
                    >
                      <Image
                        src={user.avatar}
                        alt="user"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full border-2 border-white sm:rounded-full"
                        style={{ objectFit: 'contain' }}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div
                        className="absolute right-0 z-50 mt-2 w-40 bg-white shadow-lg"
                        onMouseEnter={handleDropdownOpen}
                        onMouseLeave={handleDropdownClose}
                      >
                        <Link href="/dashboard/profiles" className="block w-full py-2 pl-4 text-left text-sm hover:bg-gray-200">
                          View Profile
                        </Link>
                        <button
                          onClick={() => (currentTheme == 'dark' ? setTheme('light') : setTheme('dark'))}
                          className="block w-full py-2 pl-4 text-left hover:bg-gray-200"
                        >
                          <Image src={currentTheme === 'dark' ? '/moon.png' : '/sunny.png'} width={22} height={22} alt="Theme icon" className="" />
                        </button>
                        <button className="block w-full py-2 pl-4 text-left text-sm hover:bg-gray-200" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button className="text-2sm mr-3 mt-3 text-white" onClick={() => setShowCreateModalLogin(true)}>
                    <p className="hover:text-black">Login</p>
                  </button>
                  <button className="text-2sm mr-3 mt-3 text-white" onClick={() => setShowModalCreate(true)}>
                    <p className="hover:text-black">Register</p>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={user.role !== 'admin' ? 'fixed left-0 right-0 top-16 flex h-10 w-full flex-row bg-blue-700' : 'hidden'}>
            <div className="ml-20 flex items-center space-x-4">
              <Link href="/home" className="text-white">
                <p className="text-sm hover:text-black">Home</p>
              </Link>
              <div className="relative">
                <button
                  className="text-sm text-white"
                  data-dropdown-trigger="hover"
                  data-dropdown-toggle="dropdownDelay"
                  data-dropdown-delay="100"
                  onMouseEnter={handleDropdownOpenCategory}
                >
                  <span className="hover:text-black">Product</span>
                </button>
                {isDropdownOpenCategory && (
                  <div
                    className="absolute left-0 right-0 z-50 mt-2 w-36 bg-white shadow-sm"
                    onMouseEnter={handleDropdownOpenCategory}
                    onMouseLeave={handleDropdownCloseCategory}
                  >
                    <Link href="/products/saleoff" className="block w-full py-1 pl-2 text-left text-sm hover:bg-gray-200">
                      Sale Off
                    </Link>
                    <Link href="/products/show" className="block w-full py-1 pl-2 text-left text-sm hover:bg-gray-200">
                      All Product
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/contacts" className="text-white">
                <p className="text-sm hover:text-black">Contact us</p>
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      <CreateModalRegister showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
      <CreateModalLogin showCreateModalLogin={showCreateModalLogin} setShowCreateModalLogin={setShowCreateModalLogin} />
    </>
  );
}
