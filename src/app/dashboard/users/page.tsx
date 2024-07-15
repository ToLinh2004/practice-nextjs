'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MyPaginationComponent from '@/app/_components/Pagination';
import { toast } from 'react-toastify';
import { User } from '@/app/types';
import { Search } from '@/app/_components/Search';
export default function ShowUser() {
  const [users, setUser] = useState<User[]>([]);
  const getAllUser = async () => {
    try {
      const res = await fetch(
        'https://6520d291906e276284c4b0d2.mockapi.io/api/1/users',
      );
      const user = await res.json();
      setUser(user);
    } catch (error) {
      throw new Error('Fetching data fail');
    }
  };
  const updateStatus = async (id: number, status: string) => {
    try {
      const changedStatus = status === 'Active' ? 'Inactive' : 'Active';
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: changedStatus,
          }),
        },
      );
      if (res.ok) {
        setUser((users) =>
          users.map((user) =>
            user.id === id
              ? {
                  ...user,
                  status: changedStatus,
                }
              : user,
          ),
        );
        toast.success('Updated status successfully');
      } else {
        throw new Error('Updating status failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = users ? users.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = users ? users.slice(startIndex, endIndex) : [];
  return (
    <>

      <div className=" px-2 py-10">
      <Search />
        <div id="features" className="mx-auto">
      
          <ul className="mt-16 grid grid-cols-1 gap-6 text-center md:grid-cols-3 mb-6">
            {currentPageData?.map((item) => (
              <li className="rounded-xl bg-white px-6 py-4 shadow-sm mt-10 transition-transform duration-200 hover:scale-105">
                
                  <div className="mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
                    <img
                      className="h-32 object-cover object-center"
                      src={item.avatar}
                      alt="Woman looking front"
                    />
                  </div>
                  <h3 className="font-display group-hover:text-primary-500 my-3 font-medium text-blue-600">
                    {item.fullName}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-black">
                    <b>Email:</b> {item.email}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-black">
                    <b>Address:</b> {item.address}
                  </p>

                  <div className="flex gap-4 px-10 py-2">
                  
                    <button className="w-full rounded-full border border-purple-200 px-2 py-1 text-sm font-semibold hover:border-transparent hover:bg-blue-600 hover:text-white "   onClick={() => updateStatus(item.id, item.status)}>
                      {item.status}
                    </button>
                    <button className="w-full rounded-full border border-purple-200 px-2 py-1 text-sm font-semibold hover:border-transparent hover:bg-blue-600 hover:text-white ">
                      View more
                    </button>
                  </div>
               
              </li>
            ))}
          </ul>
        </div>
        <div></div>
      </div>

      {/* <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-blue-400">
        <div className="relative">
          <img
            className="h-48 w-full object-cover"
            src="https://images.unsplash.com/photo-1557862921-37829c790f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHx1c2VyfGVufDB8MHx8fDE2OTQwOTU5Nzl8MA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Profile Image"
          />
        </div>
        <div className="px-6 py-4">
          <div className="text-xl font-semibold text-gray-800">John Doe</div>
          <p className="text-gray-600">Front-end Developer</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block rounded-full bg-teal-200 px-2 py-1 font-semibold text-teal-900">
            Web
          </span>
          <span className="inline-block rounded-full bg-indigo-200 px-2 py-1 font-semibold text-indigo-900">
            UI/UX
          </span>
          <span className="inline-block rounded-full bg-purple-200 px-2 py-1 font-semibold text-purple-900">
            Design
          </span>
        </div>
        <div className="px-6 py-4">
          <a href="#" className="text-blue-500 hover:underline">
            View Profile
          </a>
        </div>
      </div> */}

      {/* <table className="w-full table-auto border-1">
        <thead>
          <tr className="text-center">
            <th className="border w-12 hover:text-blue-600">ID</th>
            <th className="border w-60 hover:text-blue-600">Image</th>
            <th className="border w-80 hover:text-blue-600">Full Name</th>
           
            <th className="border w-30 hover:text-blue-600">Email</th>
            <th className="border w-20 hover:text-blue-600">Role</th>
            <th className="border hover:text-blue-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData?.map((item) => (
            <tr key={item.id} className="border text-center">
              <td className="border hover:text-blue-600">{item.id}</td>
              <td className="">
                <Image src={item.avatar} alt="" height={180} width={180} className='mx-7 my-7' />
              </td>
              <td className="border hover:text-blue-600">{item.fullName}</td>
             
              <td className="border hover:text-blue-600">{item.email}</td>
              <td className="border hover:text-blue-600">{item.role}</td>
              <td className="border">
                <button
                  className={`h-10 w-20 rounded ${
                    item.status === 'Active'
                      ? 'bg-blue-600 text-white hover:scale-105'
                      : 'bg-red-600 text-white hover:scale-105 transition-transform duration-200'
                  }`}
                  onClick={() => updateStatus(item.id, item.status)}
                >
                  {item.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <MyPaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
