import Image from "next/image";
import Link from "next/link";

function SideBar() {
  return (
    <>

      <div className="bg-zinc-100 h-full max-h-200 fixed top-0 left-0 w-60">
        <div className="bg-blue-600 h-14">
          <p className="text-3xl text-white pt-2">Tờ Ling</p>
        </div>
        <br />
        <div className="flex flex-row">
          <div className="basis-1/5">
            <Image
              src="/product.png"
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </div>
          <div className="basis mt-3">
            {" "}
            <Link href="/products/show">Product</Link>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex flex-row">
          <div className="basis-1/5">
            <Image
              src="/product.png"
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </div>
          <div className="basis mt-3">
            {" "}
            <Link href="/products/show">Product</Link>
          </div>
        </div>
        <br />
        <hr />
        
      </div>
    </>
  );
}

export default SideBar;
