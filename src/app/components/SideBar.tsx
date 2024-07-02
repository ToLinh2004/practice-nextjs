import Image from "next/image";
import Link from "next/link";

function SideBar() {
  return (
    <>
      <div className="bg-zinc-100 h-full max-h-200 fixed top-0 left-0 w-60">
        <div className="bg-blue-600 h-12">
          <p className="text-2xl text-white pt-2 ml-2">Tờ Ling</p>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/5">
            <Image
              src="/product.png"
              width={30}
              height={30}
              alt="Picture of the author"
              className="mt-2 ml-2"
            />
          </div>
          <div className="basis mt-3">
            {" "}
            <Link
              href="/admin/products/show"
              className="text-black no-underline"
            >
              Product
            </Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-row">
          <div className="basis-1/5">
            <Image
              src="/product.png"
              width={30}
              height={30}
              alt="Picture of the author"
              className="ml-2"
              
            />
          </div>
          <div className="basis mt-1">
            {" "}
            <Link href="/products/show" className="text-black no-underline">
              User
            </Link>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
}

export default SideBar;
