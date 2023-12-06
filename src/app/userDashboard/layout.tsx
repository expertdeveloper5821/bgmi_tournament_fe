'use client';
import { FaTh, FaVideo } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Sidebar from '@/Components/CommonComponent/SideBar/Sidebar';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
// import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';
import { getPageName } from '@/utils/commonFunction';
import styles from '@/styles/Dashboard.module.scss';
import { GiThreeFriends } from 'react-icons/gi';
import { TbScoreboard } from 'react-icons/tb';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';

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
  {
    path: '/userDashboard/friends',
    name: 'Friends',
    icon: <GiThreeFriends size="20px" />,
  },
  {
    path: '/userDashboard/videos',
    name: 'Videos',
    icon: <FaVideo />,
  },
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
  {
    path: '/userDashboard/leaderboard',
    name: 'Leaderboard',
    icon: <TbScoreboard size="20px" />,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const asPath = usePathname();

  const pathSegments = asPath?.split('/').filter((segment) => segment);

  return (
    <main className={styles.main_container}>
      <Provider store={store}>
        <Sidebar menuItem={dynamicMenuItems} />
        <div id="subMainLayoutContainer">
          <Navbar />

          <div className={styles.main_container}>
            <div className={styles.sidebar_wrapper}>
              <div className={styles.content}>
                <div className={styles.dashboard}>
                  <span className={styles.head_desc}>{getPageName(pathSegments?.at(-1))}</span>
                  <Breadcrumb />
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </Provider>
    </main>
  );
}
