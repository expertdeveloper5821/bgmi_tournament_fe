'use client';

import styles from '@/styles/Dashboard.module.scss';
import { FaVideo } from 'react-icons/fa';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
import ErrorBoundary from '@/Components/HOC/ErrorBoundaery';
import { FaTh } from 'react-icons/fa';

const dynamicMenuItems = [
  {
    path: '/spectatorDashboard',
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
    <ErrorBoundary>
      <div className={styles.main_container}>
        <Sidebar menuItem={dynamicMenuItems} />
        <div className={styles.content__container} id="subMainLayoutContainer">
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}
