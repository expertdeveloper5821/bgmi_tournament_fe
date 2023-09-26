// Sidebar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/DashboardSidebar.module.scss';
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
  const toggle = () => {
    setIsOpen(isOpen => {
      if (width > 768) {
        const mainElem = document.getElementById('mainLayoutContainer')
        const mainElemInner = document.getElementById('mainLayoutContainerInner')
        if (mainElem) {
          mainElem.style.width = !isOpen ? '73.5vw' : '96vw';
        }

        if (mainElemInner) {
          mainElemInner.style.width = !isOpen ? '85vw' : '96vw';
        }
      }
      return !isOpen
    });
  }

  return (
    <>
      {width > 768 ? (
        <div className={styles.container} >
          <div
            style={{ width: isOpen ? '220px' : '50px' }}
            className={styles.sidebar}
          >
            <div className={styles.top_section}>
              <h1
                style={{ display: isOpen ? 'block' : 'none' }}
                className={styles.logo}
              >
                <img src='/assests/logo.svg' />
              </h1>
              <div
                style={{ marginLeft: isOpen ? '100px' : '10px' }}
                className={styles.bars}
              >
                {
                  isOpen ? <div onClick={toggle} className={styles.lap_sidebar_cancel}>X</div> : <FaBars onClick={toggle} />
                }
              </div>
            </div>
            <div>
              {menuItem?.length > 0 ? (
                menuItem.map((item: MenuItem, index: number) => (
                  <Link href={item.path} key={index} passHref>
                    <div className={`${styles.link} ${selectedItemIndex === index ? styles.selected : ''}`}
                      onClick={() => setSelectedItemIndex(index)}>

                      <div className={styles.icon}>{item.icon}</div>
                      {isOpen && (
                        <div className={styles.link_text}>{item.name}</div>
                      )}
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
            <h1
              style={{ display: isOpen ? 'block' : 'none' }}
              className={styles.logo}
            >
              <img src='/assests/logo.svg' />
            </h1>
            <div
              className={isOpen ? `${styles.bars}` : `${styles.mob_bars}`}
            >
              {
                isOpen ? <div onClick={toggle} className={styles.sidebar_cancel}>X</div> : <FaBars onClick={toggle} />
              }

            </div>
          </div>
          {
            isOpen && <div className={`${styles.listitems} ${isOpen ? styles.open : ''}`}>
              {menuItem?.length > 0 ? (
                menuItem.map((item: MenuItem, index: number) => (
                  <Link href={item.path} key={index} passHref>
                    <div className={styles.link}>
                      {isOpen && (
                        <div className={styles.mob_link_text}>
                          <div className={styles.itemname}>
                            <span className={styles.mob_icon}>{item.icon}</span>
                            <span className={styles.mob_name}> {item.name}</span>
                          </div>

                        </div>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          }

        </div>
      )}
    </>
  );
};

export default Sidebar;
