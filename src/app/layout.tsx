import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../Components/SideBar/Sidebar'
import { Navbar } from '../Components/Navbar/Navbar'
import Head from 'next/head'
import { UserProvider } from '@/utils/contextProvider'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Pattseheadshot',
//   description: 'Immerse yourself in the world of competitive gaming with our dedicated esports platform for BGMI players. Join thrilling tournaments, enhance your skills with personalized team-building, and access insightful game analytics. Connect, compete, and conquer as you rise through the ranks in the ultimate battleground for mobile gaming enthusiasts. Elevate your gaming journey and be a part of the future of esports!',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  )
}
