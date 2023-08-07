import Loader from '../app/auth/login/page'
import RootLayout from './layout'

export default function Home() {
  return (
    <RootLayout>
      <Loader />
    </RootLayout>
  )
}
