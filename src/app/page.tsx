'use client'
import Home from '@/app/(auth)/home/page';
import { useLoginContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const { user } = useLoginContext();
const router=useRouter();
  return <>{user.role === 'admin' ? router.replace('/dashboard') : <Home />}</>;
}
