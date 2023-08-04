import React, { useState } from "react";
import Link from "next/link";
import styles from "./DashboardSidebar.module.scss";
import { FaBars } from "react-icons/fa";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
  active: boolean;
}

interface SidebarProps {
  menuItem: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuItem);
  const toggle = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (index: number) => {
    const updatedMenuItems = menuItem.map((item, i) => ({
      ...item,
      active: i === index,
    }));
    setMenuItems(updatedMenuItems);
  };

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
          <Link href={item.path} key={index}>
            <div
              className={`${styles.link} ${item.active ? styles.active : ""}`}
              onClick={() => handleMenuItemClick(index)}
            >
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.link_text}>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div >
  );
};

export default Sidebar;
