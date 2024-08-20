'use client';
import useSWR from 'swr';
import { useState } from 'react';
import LoadingPage from '@/app/_components/Loading';
import { Contact } from '@/app/types';
import MyPaginationComponent from '@/app/_components/Pagination';
import UpdateContactModal from '@/app/_components/UpdateContactModal';
import Image from 'next/image';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

export default function ShowContact() {
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const { language } = useLanguage();

  const [contact, setContact] = useState<Contact>({
    id: 0,
    fullName: '',
    phone: '',
    email: '',
    message: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR('https://65200b03906e276284c3f31a.mockapi.io/contacts', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  let displayedContacts: Contact[] = [];
  let totalPages = 0;
  let totalItems = 0;

  if (data && data.length > 0) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    displayedContacts = data.slice(startIndex, endIndex);
    totalItems = data.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );
  return (
    <>
      <section className="pl-4 pt-20 sm:pl-0">
        <div className="xl:mb-0 xl:w-full mx-auto mb-12 mt-7 w-full sm:mb-4">
          <div className="mb-6 flex w-full min-w-0 flex-col break-words rounded bg-gray-100">
            <div className="mb-0 mt-2 rounded-t border-0 px-2 sm:mb-6 sm:h-16 sm:px-0">
              <button className="my-4 h-10 rounded bg-blue-600 text-white">
                <span className="mx-1 sm:pb-1 sm:text-sm">Contacts</span>
              </button>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center">
                <thead className="">
                  <tr>
                     <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'ID' : 'ID'}
                      </th>
                      <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'Full Name' : 'Họ Và Tên'}
                      </th>
                      <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'Phone' : 'Số Điện Thoại'}
                      </th>
                      <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'Email' : 'Email'}
                      </th>
                      <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'Message' : 'Tin Nhắn'}
                      </th>
                      <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'Status' : 'Trạng Thái'}
                      </th>
                      <th className="cursor-pointer px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-blue-600">
                        {language === 'en' ? 'Action' : 'Thao Tác'}
                      </th>
                   
                  </tr>
                </thead>
                <tbody>
                  {displayedContacts?.map((item) => (
                    <tr key={item.id} className="border-1 transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900">{item.id}</td>

                      <td className="whitespace-nowrap py-4 text-sm text-gray-900 sm:pr-4">{item.fullName}</td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-900 sm:pr-4">{item.phone}</td>

                      <td className="max-h-14 max-w-80 overflow-hidden whitespace-normal py-4 text-sm text-gray-900 sm:pr-4">{item.email}</td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-900 sm:pr-4">{item.message}</td>

                      <td className="whitespace-nowrap py-4 sm:pr-4">
                        <button className="ms-2 rounded py-1">
                          {item.status === 'Not replied' ? (
                            <Image src="/notReplied.png" height={28} width={28} alt="" />
                          ) : (
                            <Image src="/replied.png" height={28} width={28} alt="" />
                          )}
                        </button>
                      </td>
                      <td className="whitespace-nowrap py-4 sm:pr-4">
                        <button
                          className="ms-2 rounded py-1 transition-transform duration-200 hover:scale-105"
                          onClick={() => (setShowModalUpdate(true), setContact(item))}
                        >
                          <Image src="/reply.png" alt="Image" width={28} height={28} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <UpdateContactModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} contact={contact} />
      <MyPaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
