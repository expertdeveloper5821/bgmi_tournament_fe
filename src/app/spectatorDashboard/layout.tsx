'use client';
import {Inter} from 'next/font/google';
import Sidebar from '@/components/commonComponent/SideBar/Sidebar';
import styles from '@/styles/Dashboard.module.scss';
import {FaTh} from 'react-icons/fa';
const inter = Inter({subsets: ['latin']});

const spectatorMenuItems = [
  {
    path: '/spectatorDashboard/Room',
    name: 'Room',
    icon: <FaTh />,
  },
];

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.main_container}>
      <Sidebar menuItem={spectatorMenuItems} />
      {children}
    </div>
  );
}
