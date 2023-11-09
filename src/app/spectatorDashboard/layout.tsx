'use client';

import styles from '@/styles/Dashboard.module.scss';
import { FaVideo } from 'react-icons/fa';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
import ErrorBoundary from '@/Components/HOC/ErrorBoundaery';

const dynamicMenuItems = [
  {
    path: '/spectatorDashboard/Video',
    name: 'Video',
    icon: <FaVideo />,
  },

];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className={styles.main_container} id="mainLayoutContainer">
        <Sidebar menuItem={dynamicMenuItems} />
        <div className={styles.content__container}>{children}</div>
      </div>
    </ErrorBoundary>
  );
}
