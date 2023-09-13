'use client';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dashboard.module.scss';
import { FaTh } from 'react-icons/fa';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
const inter = Inter({ subsets: ['latin'] });

const spectatorMenuItems = [
  {
    path: '/spectatorDashboard/Room',
    name: 'Room',
    icon: <FaTh />,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main_container}>
      <Sidebar menuItem={spectatorMenuItems} />
      {children}
    </div>
  );
}
