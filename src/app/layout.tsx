import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Sidebar from '../components/commonComponent/SideBar/Sidebar';
import {Navbar} from '../components/commonComponent/Navbar/Navbar';
import Head from 'next/head';
import {UserProvider} from '@/utils/contextProvider';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
          <ToastContainer />
        </UserProvider>
      </body>
    </html>
  );
}
