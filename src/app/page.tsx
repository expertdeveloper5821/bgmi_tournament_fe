import Loader from './auth/login/page';
import RootLayout from './layout';
import {ToastContainer} from 'react-toastify';
export default function Home() {
  return (
    <RootLayout>
      <Loader />
      <ToastContainer />
    </RootLayout>
  );
}
