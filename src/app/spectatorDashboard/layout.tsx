'use client';

import styles from '@/styles/Dashboard.module.scss';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';

const dynamicMenuItems = [
  // {
  //   path: '/spectatorDashboard/Room',
  //   name: 'Room',
  //   icon: <FaTh />,
  // },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main_container} id="mainLayoutContainer">
      <Sidebar menuItem={dynamicMenuItems} />
      <div className={styles.content__container}>{children}</div>
    </div>
  );
}
