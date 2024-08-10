'use client';
import { useState } from 'react';
import Image from 'next/image';
import MyPaginationComponent from '@/app/_components/Pagination';
import { toast } from 'react-toastify';
import { User } from '@/app/types';
import { Search } from '@/app/_components/Search';
import LoadingPage from '@/app/_components/Loading';
import useSWR from 'swr';
import { mutate } from 'swr';
import NotSearch from '@/app/_components/NotSearch';
import { useLoginContext } from '@/app/context/UserContext';

export default function ShowUser({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const { loggedIn, user } = useLoginContext();

  const query = searchParams?.query || '';
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR('https://6520d291906e276284c4b0d2.mockapi.io/api/1/users', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const updateStatus = async (id: number, status: string) => {
    try {
      const changedStatus = status === 'Active' ? 'Inactive' : 'Active';
      const res = await fetch(`https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: changedStatus,
        }),
      });
      if (res.ok) {
        setUsers((data) =>
          data.map((user) =>
            user.id === id
              ? {
                  ...user,
                  status: changedStatus,
                }
              : user,
          ),
        );
        mutate('https://6520d291906e276284c4b0d2.mockapi.io/api/1/users');

        toast.success('Updated status successfully');
      } else {
        toast.error('Updating status failed');
      }
    } catch (error) {
      console.error('Updating status failed:', error);
    }
  };
  let displayedUsers: User[] = [];
  let totalPages = 0;
  let totalItems = 0;

  if (data && data.length > 0) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredUsers = data.filter((user: User) => user.fullName.toLowerCase().includes(query.toLowerCase()));
    displayedUsers = filteredUsers.slice(startIndex, endIndex);
    totalItems = filteredUsers.length;
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
      <>
        {loggedIn && user.role ? (
          <>
            {displayedUsers.length === 0 ? (
              <NotSearch query={query} link="/dashboard/users" />
            ) : (
              <section className="pl-4 pt-20 sm:pl-0">
                <div className="xl:mb-0 xl:w-full mx-auto mb-12 mt-7 w-full sm:mb-4">
                  <div className="mb-6 flex w-full min-w-0 flex-col break-words rounded bg-gray-100">
                    <div className="mb-0 rounded-t border-0 px-4 sm:h-16">
                      <div className="ml-2 flex items-center sm:h-20">
                        <div className="my-4 flex-1 flex-grow justify-start sm:h-10 md:px-4">
                          <Search />
                        </div>
                      </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      <table className="w-full border-collapse items-center">
                        <thead className="">
                          <tr>
                            {['ID', 'Image', 'Full Name', 'Email', 'Date', 'Phone', 'Address', 'Role', 'Status'].map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="cursor-pointer px-2 py-3 text-center text-xs font-medium uppercase tracking-wider hover:text-blue-600 "
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {displayedUsers?.map((item) => (
                            <tr key={item.id} className="border-1 transition duration-300 ease-in-out hover:bg-gray-100">
                              <td className="whitespace-nowrap py-4 pl-2 text-sm font-medium text-gray-900 ">{item.id}</td>
                              <td className="whitespace-nowrap py-4 pl-2 ">
                                <Image src={item.avatar} alt="" height={100} width={100} className="" />
                              </td>
                              <td className="whitespace-nowrap py-4 text-center text-sm text-gray-900 ">{item.fullName}</td>
                              <td className="max-h-14 max-w-80 overflow-hidden whitespace-normal py-4 text-center text-sm text-gray-900 ">
                                {item.email}
                              </td>
                              <td className="whitespace-nowrap py-4 text-center text-sm text-gray-900 ">{item.date}</td>
                              <td className="whitespace-nowrap py-4 text-center text-sm text-gray-900 ">{item.phone}</td>
                              <td className="whitespace-nowrap py-4 text-center text-sm text-gray-900 ">{item.address}</td>
                              <td className="whitespace-nowrap py-4 text-center text-sm text-gray-900 ">{item.role}</td>

                              <td className="whitespace-nowrap py-4 text-center">
                                <button
                                  className="transition-transform duration-200 hover:scale-105"
                                  onClick={() => updateStatus(item.id, item.status)}
                                >
                                  {item.status === 'Active' ? (
                                    <Image src="/active.png" alt="" height={28} width={28} />
                                  ) : (
                                    <Image src="/inActive.png" alt="" height={28} width={28} />
                                  )}
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
            )}
            <MyPaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </>
        ) : (
          ''
        )}
      </>
    </>
  );
}
