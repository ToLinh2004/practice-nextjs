import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faMapMarker, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-green-contact-us relative mt-10 p-4 shadow-lg">
      <footer className="mx-12 flex items-center justify-between">
        <div className="float-left">
          <span className="text-xl font-bold text-white sm:text-sm">V-SPLUSH</span>
        </div>
        <div className="float-right">
          <div className="flex flex-row">
            <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600 sm:h-8 sm:w-8">
              <FontAwesomeIcon icon={faFacebookF} className="text-white" />
            </div>

            <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600">
              <FontAwesomeIcon icon={faTwitter} className="text-white" />
            </div>
            <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
            </div>
            <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600">
              <FontAwesomeIcon icon={faInstagram} className="text-white" />
            </div>
          </div>
        </div>
      </footer>
      <hr className="mx-12 my-2 border-2 border-gray-50 shadow-md" />
      <div className="mx-12 grid grid-cols-4 gap-4 sm:grid-cols-1">
        <div>
          <span className="text-md mb-2 block font-medium uppercase text-white">Explore</span>

          <Link href="/" className="text-white">
            <span className="text-md mb-2 block font-light hover:text-blue-600">Home</span>
          </Link>
          <Link href="/" className="text-white">
            <span className="text-md mb-2 block font-light hover:text-blue-600">Products</span>
          </Link>
          {/* <Link href="/" className="text-white">
            <span className="text-md mb-2 block font-light hover:text-blue-600">About Us</span>
          </Link> */}
          <Link href="/" className="text-white">
            <span className="text-md mb-2 block font-light hover:text-blue-600">Contacts</span>
          </Link>
          <Link href="/" className="text-white">
            <span className="text-md mb-2 block font-light hover:text-blue-600">Blogs</span>
          </Link>
        </div>

        <div>
          <span className="text-md mb-2 block font-medium uppercase text-white">Welcome to big store</span>

          <span className="text-md mb-2 block font-light text-white">The ultimate spot for fashion and comfort.</span>
          <span className="text-md mb-2 block font-light text-white">Enjoy great prices and excellent service.</span>
          <span className="text-md mb-2 block font-light text-white">Visit us in-store or shop online today!</span>
          <span className="text-md mb-2 block font-light text-white">Big Store - Where style meets comfort!</span>
        </div>

        <div>
          <span className="text-md mb-2 block font-medium uppercase text-white">Contact Us</span>
          <span className="text-md mb-2 block font-light text-white">
            {' '}
            <FontAwesomeIcon icon={faMapMarker} className="text-white" />
            <span className="ml-2">99 Tô Hiến Thành, Phước Mỹ, Sơn Trà, Đà Nẵng</span>
          </span>
          <span className="text-md mb-2 block font-light text-white">
            {' '}
            <FontAwesomeIcon icon={faEnvelope} className="text-white" />
            <span className="ml-2">tolinh@gmail.com</span>
          </span>
          <span className="text-md mb-2 block font-light text-white">
            {' '}
            <FontAwesomeIcon icon={faPhone} className="text-white" />
            <span className="ml-2">(+84) 23 456 7890</span>
          </span>
        </div>

        <div>
          <span className="text-md mb-2 block font-medium uppercase text-white">Working Hours</span>
          <span className="text-md mb-2 block font-light text-white">Mon to Fri: 8:AM - 5:PM</span>
          <span className="text-md mb-2 block font-light text-white">Sat: 7:AM - 22:PM</span>
          <span className="text-md mb-2 block font-light text-white">Sun: 9:AM - 22:PM</span>
        </div>
      </div>

      <hr className="mx-12 my-2 border-2 border-gray-50 shadow-md" />
    </div>
  );
}
