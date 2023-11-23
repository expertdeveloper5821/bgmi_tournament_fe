'use client';

import styles from '@/styles/Dashboard.module.scss';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
import ErrorBoundary from '@/Components/HOC/ErrorBoundaery';
import { FaTh } from 'react-icons/fa';

const dynamicMenuItems = [
  {
    path: '/spectatorDashboard',
    name: 'Dashboard',
    icon: <FaTh />,
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
