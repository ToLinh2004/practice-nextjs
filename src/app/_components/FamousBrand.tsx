import Image from 'next/image';
export default function FamousBrand() {
  const images: string[] = ['/brandFirst.png', '/brandSecond.jpg', '/brandThird.png', '/brandFour.jpg', '/brandFive.png', '/brandSeven.jpg'];
  return (
    <>
      <div className="my-10 text-2xl">
        <span className="font-bold uppercase hover:text-blue-600">Famous brands</span>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-3 sm:gap-2">
        {images.map((src, index) => (
          <div className="relative h-40 transform border-r-2 bg-gray-300 transition duration-500 ease-in-out hover:scale-105" key={index}>
            <Image src={src} alt={`image ${index + 1}`} layout="fill" objectFit="center" className="" />
          </div>
        ))}
      </div>
    </>
  );
}
