// Sidebar.tsx
import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/DashboardSidebar.module.scss";
import { FaBars } from "react-icons/fa";
import Image from 'next/image';

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

interface SidebarProps {
  menuItem: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuItem);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      <div style={{ width: isOpen ? "220px" : "100px" }} className={styles.sidebar}>
        <div className={styles.top_section}>
          <h1 style={{ display: isOpen ? "block" : "none" }} className={styles.Logo}>
            Logo
            {/* <Image src="../assests/logoWithBg.svg" alt="Tg-logo" width={150} height={100} /> */}
          </h1>
          <div style={{ marginLeft: isOpen ? "100px" : "0px" }} className={styles.bars}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div>
          {menuItem?.length > 0 ? (
            menuItem.map((item: MenuItem, index: number) => (
              <Link href={item.path} key={index} passHref>
                <div className={styles.link}>
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.link_text}>{item.name}</div>
                </div>
              </Link>
            ))
          ) : (
            <div>No Data Found</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;

