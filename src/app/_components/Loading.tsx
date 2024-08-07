import Image from 'next/image';
export default function LoadingPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white">
        <Image src="/loading.png" height={400} width={400} alt="" />
      </div>
    </div>
  );
}
