// Sidebar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/DashboardSidebar.module.scss';
import { FaBars } from 'react-icons/fa';
import useWindowSize from '@/hooks/useWindowSize';
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
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1); // Initialize as -1, no item selected
  const [width] = useWindowSize();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {width > 768 ? (
        <div className={styles.container}>
          <div style={{ width: isOpen ? '220px' : '100px' }} className={styles.sidebar}>
            <div className={styles.top_section}>
              <h1 style={{ display: isOpen ? 'block' : 'none' }} className={styles.logo}>
                <img src="/assests/logo.svg" />
              </h1>
              <div style={{ marginLeft: isOpen ? '100px' : '10px' }} className={styles.bars}>
                {isOpen ? (
                  <div onClick={toggle} className={styles.lap_sidebar_cancel}>
                    X
                  </div>
                ) : (
                  <FaBars onClick={toggle} />
                )}
              </div>
            </div>
            <div>
              {menuItem?.length > 0 ? (
                menuItem.map((item: MenuItem, index: number) => (
                  <Link href={item.path} key={index} passHref>
                    <div
                      className={`${styles.link} ${
                        selectedItemIndex === index ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedItemIndex(index)}
                    >
                      <div className={styles.icon}>{item.icon}</div>
                      {isOpen && <div className={styles.link_text}>{item.name}</div>}
                    </div>
                  </Link>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mob_container}>
          <div className={styles.mobile_top_section}>
            <h1 style={{ display: isOpen ? 'block' : 'none' }} className={styles.logo}>
              <img src="/assests/logo.svg" />
            </h1>
            <div className={isOpen ? `${styles.bars}` : `${styles.mob_bars}`}>
              {isOpen ? (
                <div onClick={toggle} className={styles.sidebar_cancel}>
                  X
                </div>
              ) : (
                <FaBars onClick={toggle} />
              )}
            </div>
          </div>
          {isOpen && (
            <div className={styles.listitems}>
              {menuItem?.length > 0 ? (
                menuItem.map((item: MenuItem, index: number) => (
                  <Link href={item.path} key={index} passHref>
                    <div className={styles.link}>
                      {isOpen && (
                        <div className={styles.mob_link_text}>
                          <span className={styles.itemname}>{item.name}</span>
                          {item.icon}
                        </div>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
