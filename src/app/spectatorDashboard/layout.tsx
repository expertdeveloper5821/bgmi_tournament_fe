'use client';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dashboard.module.scss';
import { FaTh, FaVideo } from 'react-icons/fa';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
const inter = Inter({ subsets: ['latin'] });

const dynamicMenuItems = [
  {
    path: '/spectatorDashboard/Room',
    name: 'Room',
    icon: <FaTh />,
  },
  {
    path: '/spectatorDashboard/Video',
    name: 'Video',
    icon: <FaVideo />,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main_container} id="mainLayoutContainer">
      <>
        <Sidebar menuItem={dynamicMenuItems} />
        <div className={styles.content__container}>{children}</div>
      </>
    </div>
  );
}
