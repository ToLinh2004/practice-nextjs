  'use client'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
  import { faPhone, faMapMarker, faEnvelope } from '@fortawesome/free-solid-svg-icons';
  import { useLoginContext } from '@/app/context/UserContext';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

  import Link from 'next/link';

  export default function Footer() {
    const { user,loggedIn } = useLoginContext();
const { language } = useLanguage();
    return (
      <>
        { user.role === 'admin' ? (
          ''
        ) : (
          <div className="bg-green-contact-us relative mt-10 p-4 shadow-lg">
            <footer className="mx-12 flex items-center justify-between sm:mx-6">
              <div className="float-left">
                <span className="text-xl font-bold text-white sm:text-sm">V-SPLUSH</span>
              </div>
              <div className="float-right">
                <div className="flex flex-row">
                  <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600 sm:mx-0 sm:h-8 sm:w-8">
                    <FontAwesomeIcon icon={faFacebookF} className="text-white" />
                  </div>

                  <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600 sm:mx-0 sm:h-8 sm:w-8">
                    <FontAwesomeIcon icon={faTwitter} className="text-white" />
                  </div>
                  <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600 sm:mx-0 sm:h-8 sm:w-8">
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
                  </div>
                  <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-sm border transition duration-200 ease-in-out hover:scale-110 hover:bg-blue-600 sm:mx-0 sm:h-8 sm:w-8">
                    <FontAwesomeIcon icon={faInstagram} className="text-white" />
                  </div>
                </div>
              </div>
            </footer>
            <hr className="mx-12 my-2 border-2 border-gray-50 shadow-md sm:mx-6" />
            <div className="mx-12 grid grid-cols-4 gap-4 sm:mx-6 sm:grid-cols-1">
              <div>
                <span className="text-md mb-2 block font-medium uppercase text-white sm:text-sm">{language === 'en' ? 'Explore' : 'Khám phá'}</span>

                <Link href="/" className="text-white">
                  <span className="text-md mb-2 block font-light hover:text-blue-600">{language === 'en' ? 'Home' : 'Trang chủ'}</span>
                </Link>
                <Link href="/" className="text-white">
                  <span className="text-md mb-2 block font-light hover:text-blue-600">{language === 'en' ? 'Products':'Sản phẩm'}</span>
                </Link>
                {/* <Link href="/" className="text-white">
              <span className="text-md mb-2 block font-light hover:text-blue-600">About Us</span>
            </Link> */}
                <Link href="/" className="text-white">
                  <span className="text-md mb-2 block font-light hover:text-blue-600">{language === 'en' ? 'Contacts': 'Liên hệ'}</span>
                </Link>
                <Link href="/" className="text-white">
                  <span className="text-md mb-2 block font-light hover:text-blue-600">{language === 'en' ? 'Blogs' : 'Bài viết'}</span>
                </Link>
              </div>

              <div>
                <span className="text-md mb-2 block font-medium uppercase text-white sm:text-sm">{language === 'en' ? 'Welcome to big store' :"Chào mừng đến với cửa hàng lớn"}</span>

                <span className="text-md mb-2 block font-light text-white">{language === 'en' ? 'The ultimate spot for fashion and comfort.' : "Điểm đến tuyệt vời cho thời trang và sự thoải mái."}</span>
                <span className="text-md mb-2 block font-light text-white">{language === 'en' ? 'Enjoy great prices and excellent service.':"Tận hưởng giá cả tuyệt vời và dịch vụ xuất sắc."}</span>
                <span className="text-md mb-2 block font-light text-white">{language === 'en' ? 'Visit us in-store or shop online today!' : "Ghé thăm cửa hàng hoặc mua sắm online ngay!"}</span>
                <span className="text-md mb-2 block font-light text-white">{language === 'en' ?'Big Store - Where style meets comfort!':"Cửa Hàng Lớn - Nơi phong cách gặp gỡ sự thoải mái!"}</span>
              </div>

              <div>
                <span className="text-md mb-2 block font-medium uppercase text-white sm:text-sm">{language === 'en' ?'Contact Us':'Liên hệ chúng tôi'}</span>
                <span className="text-md mb-2 block font-light text-white">
                  {' '}
                  <FontAwesomeIcon icon={faMapMarker} className="text-white" />
                  <span className="ml-2 text-md">99 Tô Hiến Thành, Phước Mỹ, Sơn Trà, Đà Nẵng</span>
                </span>
                <span className="text-md mb-2 block font-light text-white">
                  {' '}
                  <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                  <span className="ml-2 text-md">tolinh@gmail.com</span>
                </span>
                <span className="text-md mb-2 block font-light text-white">
                  {' '}
                  <FontAwesomeIcon icon={faPhone} className="text-white" />
                  <span className="ml-2 text-md">(+84) 23 456 7890</span>
                </span>
              </div>

              <div>
                <span className="text-md mb-2 block font-medium uppercase text-white sm:text-sm">{language === 'en' ? 'Working Hours' :'Giờ làm việc'}</span>
                <span className="text-md mb-2 block font-light text-white">{language === 'en' ? 'Mon to Fri: 8:AM - 5:PM' :'Thứ hai - Thứ sáu : 8:00-17:00'}</span>
                <span className="text-md mb-2 block font-light text-white">{language === 'en' ? 'Sat: 7:AM - 22:PM' :'Thứ bảy: 7:00 - 22:00'}</span>
                <span className="text-md mb-2 block font-light text-white">{language === 'en' ? 'Sun: 9:AM - 22:PM' : 'Chủ nhật 9:00 - 22:00'}</span>
              </div>
            </div>

            <hr className="mx-12 my-2 border-2 border-gray-50 shadow-md sm:mx-6" />
          </div>
        )}
      </>
    );
  }
