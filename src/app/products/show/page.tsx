"use client";
import DTable from "@/app/_components/DTable";
import useSWR from "swr";
import Pagination from 'react-bootstrap/Pagination';
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
  let active = 2;
let items = [];
for (let number = 1; number <= data.length; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
  return (
    <>
      <DTable products={data} />
      <Pagination>{items}</Pagination>
    </>
  );
}

export default ShowTable;
