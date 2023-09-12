"use client"
import { Inter } from 'next/font/google'
import Sidebar from '@/Components/SideBar/Sidebar'
import styles from '../../styles/Dashboard.module.scss';
import {
  FaTh,
  FaUserAlt,
  FaRegChartBar,
  FaUserFriends,
  FaVideo
} from "react-icons/fa";
const inter = Inter({ subsets: ['latin'] })

const dynamicMenuItems = [
  {
    path: "/adminDashboard/room",
    name: "Room",
    icon: <FaTh />,
  },
  {
    path: "/adminDashboard/spectator",
    name: "Specatator",
    icon: <FaUserAlt />,
  },
  {
    path: "/adminDashboard/users",
    name: "Users",
    icon: <FaRegChartBar />,
  },
  {
    path: "/adminDashboard/teams",
    name: "Teams",
    icon: <FaUserFriends />,
  },
  // {
  //   path: "/adminDashboard/video",
  //   name: "video",
  //   icon: <FaVideo />,
  // }
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

