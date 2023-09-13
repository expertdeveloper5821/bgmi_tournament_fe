'use client';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dashboard.module.scss';
import { FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt, FaVideo } from 'react-icons/fa';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
const inter = Inter({ subsets: ['latin'] });

const dynamicMenuItems = [
  {
    path: '/userDashboard/tournament',
    name: 'Tournament',
    icon: <FaTh />,
  },
  // {
  //   path: '/userDashboard/transactions',
  //   name: 'Transactions',
  //   icon: <FaUserAlt />,
  // },
  // {
  //   path: '/userDashboard/friends',
  //   name: 'Friends',
  //   icon: <FaRegChartBar />,
  // },
  // {
  //   path: '/userDashboard/videos',
  //   name: 'Videos',
  //   icon: <FaVideo />,
  // },
  // {
  //   path: '/userDashboard/kyc',
  //   name: 'KYC',
  //   icon: <FaCommentAlt />,
  // },
  // {
  //   path: '/userDashboard/registerMatches',
  //   name: 'register',
  //   icon: <FaCommentAlt />,
  // },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main_container}>
      <Sidebar menuItem={dynamicMenuItems} />
      {children}
    </div>
  );
}
