import Loader from './auth/login/page'
import RootLayout from './layout'
// import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  return (
    <RootLayout>
      <Loader />
    </RootLayout>
  );
}
