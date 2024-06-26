"use client";
import DTable from "@/app/_components/DTable";
import useSWR from "swr";
function ShowTable() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    "https://6520d291906e276284c4b0d2.mockapi.io/api/1/products",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }

  );
  
  return (
    <>
      <DTable products={data} />
    </>
  );
}

export default ShowTable;
