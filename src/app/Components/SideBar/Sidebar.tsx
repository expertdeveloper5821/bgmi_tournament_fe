
import React, { useState } from "react";
import Link from "next/link";
import styles from "./DashboardSidebar.module.scss";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

interface SidebarProps {
  menuItem: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      <div style={{ width: isOpen ? "220px" : "100px" }} className={styles.sidebar}>
        {menuItem.map((item, index) => (
          <Link href={item.path} key={index}>
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
