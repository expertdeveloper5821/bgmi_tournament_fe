'use client';
import styles from '@/styles/Dashboard.module.scss';
import { FaTh, FaUserAlt, FaRegChartBar, FaUserFriends, FaVideo } from 'react-icons/fa';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';

const dynamicMenuItems = [
  {
    path: '/adminDashboard/room',
    name: 'Room',
    icon: <FaTh />,
  },
  {
    path: '/adminDashboard/spectator',
    name: 'Specatator',
    icon: <FaUserAlt />,
  },
  {
    path: '/adminDashboard/users',
    name: 'Users',
    icon: <FaRegChartBar />,
  },
  {
    path: '/adminDashboard/teams',
    name: 'Teams',
    icon: <FaUserFriends />,
  },
  {
    path: '/adminDashboard/video',
    name: 'video',
    icon: <FaVideo />,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main_container} id="mainLayoutContainer">
      <>
        <Sidebar menuItem={dynamicMenuItems} />
        <div className={styles.content__container} id="subMainLayoutContainer">
          {children}
        </div>
      </>
    </div>
  );
}
