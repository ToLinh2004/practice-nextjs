"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  status: string;
};
function ShowUser() {
  const [users, setUser] = useState<User[]>([]);
  const getAllUser = async () => {
    try {
      const res = await fetch(
        "https://6520d291906e276284c4b0d2.mockapi.io/api/1/users"
      );
      const user = await res.json();
      setUser(user);
    } catch (error) {
      throw new Error("Fetching data fail");
    }
  };
  const updateStatus = async (id: number, status: string) => {
    try {
      const changedStatus = status === "Active" ? "Inactive" : "Active";
      const res = await fetch(
        `https://6520d291906e276284c4b0d2.mockapi.io/api/1/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: changedStatus }),
        }
      );
      if (res.ok) {
        setUser((users) =>
          users.map((user) =>
            user.id === id ? { ...user, status: changedStatus } : user
          )
        );
      } else {
        throw new Error("Updating status failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <button className="bg-blue-600 text-white h-10 w-40 mb-4 mt-4 rounded float-left">
        User
      </button>

      <table className="table-auto border-2 w-full">
        <thead>
          <tr className="text-center">
            <th className="border">ID</th>
            <th className="border">Full Name</th>
            <th className="border">Image</th>
            <th className="border">Email</th>
            <th className="border">Role</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item) => (
            <tr key={item.id} className="border text-center">
              <td className="border">{item.id}</td>
              <td className="border">{item.fullName}</td>
              <td className="grid place-items-center ">

                <Image src={item.avatar} alt="" height={100} width={100} />
              </td>
              <td className="border">{item.email}</td>
              <td className="border">{item.role}</td>
              <td className="border">
                <button
                  className={`h-10 w-20 ml-3 rounded ${
                    item.status === "Active"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                  onClick={() => updateStatus(item.id, item.status)}
                >
                  {item.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default ShowUser;
