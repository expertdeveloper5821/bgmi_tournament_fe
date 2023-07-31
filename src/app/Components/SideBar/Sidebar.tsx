import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./DashboardSidebar.module.scss";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
} from "react-icons/fa";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem: MenuItem[] = [
    {
      path: "/dashboardPage/Room",
      name: "Room",
      icon: <FaTh />,
    },
    {
      path: "/dashboardPage/spectator",
      name: "Specatator",
      icon: <FaUserAlt />,
    },
    {
      path: "/dashboardPage/users",
      name: "Users",
      icon: <FaRegChartBar />,
    },
    {
      path: "/dashboardPage/teams",
      name: "Teams",
      icon: <FaCommentAlt />,
    }

  ];
  return (
    <div className={styles.container}>
      <div style={{ width: isOpen ? "220px" : "100px" }} className={styles.sidebar}>
        <div className={styles.top_section}>
          <h1 style={{ display: isOpen ? "block" : "none" }} className={styles.logo}>
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "100px" : "0px" }} className={styles.bars}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (

          <Link href={item.path} key={index} >
            <div className={styles.link}>
              <div className={styles.icon}>{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none", fontSize: "18px" }}
                className={styles.link_text}
              >
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;