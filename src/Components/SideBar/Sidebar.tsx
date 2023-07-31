import { useState } from "react";
import Link from "next/link";
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
      path: "/",
      name: "Book Slots",
      icon: <FaTh />,
    },
    {
      path: "/createServer",
      name: "Create Server",
      icon: <FaUserAlt />,
    },
    {
      path: "/manageTeam",
      name: "Manage Team",
      icon: <FaRegChartBar />,
    },
    {
      path: "/createTeam",
      name: "Create Team",
      icon: <FaCommentAlt />,
    },
    {
      path: "/notification",
      name: "Notification",
      icon: <FaShoppingBag />,
    },
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
        <Link href={item.path} key={index} passHref>
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
