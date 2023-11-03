import React from 'react';
import './globals.css';
import { Gothic_A1 } from 'next/font/google';
import { UserProvider } from '@/utils/contextProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Gothic_A1({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
          <ToastContainer />
          <Analytics />
        </UserProvider>
      </body>
    </html>
  );
}
