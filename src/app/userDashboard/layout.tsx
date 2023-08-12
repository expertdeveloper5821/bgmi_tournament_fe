"use client"
import { Inter } from 'next/font/google'
import Sidebar from '@/Components/SideBar/Sidebar'
import styles from '../../styles/Dashboard.module.scss';
import {
  FaTh,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaUserFriends,
  FaVideo,
  FaUserShield
} from "react-icons/fa";
const inter = Inter({ subsets: ['latin'] })

const dynamicMenuItems = [
  {
    path: "/userDashboard/tournament",
    name: "Tournament",
    icon: <FaTh />,
  },
  {
    path: "/userDashboard/transactions",
    name: "Transactions",
    icon: <FaUserAlt />,
  },
  {
    path: "/userDashboard/friends",
    name: "Friends",
    icon: <FaRegChartBar />,
  },
  {
    path: "/userDashboard/videos",
    name: "Videos",
    icon: <FaVideo />,
  },
  {
    path: "/userDashboard/kyc",
    name: "KYC",
    icon: <FaUserShield />,
  },
  {
    path: "/userDashboard/friends",
    name: "friends",
    icon: <FaUserFriends />,
  }
];
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.main_container}>
      <Sidebar menuItem={dynamicMenuItems} />
      {children}
    </div>
  )
}
