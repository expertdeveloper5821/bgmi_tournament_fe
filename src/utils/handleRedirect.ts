import { DecodedToken, decodeJWt } from './globalfunctions';
import { useRouter } from 'next/navigation';

export const handleRedirect = (token: string) => {
  const router = useRouter();

  if (token) {
    const decodedToken: DecodedToken = decodeJWt(token)!;
    if (decodedToken && decodedToken?.role?.role === 'user') {
      if (decodedToken?.upiId && decodedToken?.userName && decodedToken?.phoneNumber) {
        router.push('/userDashboard');
      } else {
        router.push('/auth/personaldetails');
      }
    } else if (decodedToken && decodedToken?.role?.role === 'admin') {
      router.push('/adminDashboard/room');
    } else if (decodedToken && decodedToken?.role?.role === 'spectator') {
      router.push('/spectatorDashboard');
    }
  }
};
