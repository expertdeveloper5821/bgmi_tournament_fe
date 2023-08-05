import Loader from './loader/page'
import RootLayout from './layout'

export default function Home() {
  return (
    <RootLayout>
      <Loader />
    </RootLayout>
  )
}
