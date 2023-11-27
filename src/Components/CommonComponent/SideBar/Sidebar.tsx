// Sidebar.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/DashboardSidebar.module.scss';
import { FaBars } from 'react-icons/fa';
import useWindowSize from '@/hooks/useWindowSize';
import { usePathname } from 'next/navigation';

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
  const [width] = useWindowSize();
  const pathName = usePathname();
  const toggle = () => {
    setIsOpen((isOpen) => {
      if (width > 768) {
        const mainElem = document.getElementById('mainLayoutContainer');
        const mainElemInner = document.getElementById('mainLayoutContainerInner');
        if (mainElem) {
          mainElem.style.flex = !isOpen ? '0 1 100%' : '0 1 100%';
        }

        if (mainElemInner) {
          mainElemInner.style.flex = !isOpen ? '0 1 70%' : '0 1 %';
        }
      }
      return !isOpen;
    });
  };

  useEffect(() => {
    const sidebarStyle = document.getElementById('sidebar_wrapper');

    if (sidebarStyle && width < 769) {
      sidebarStyle.style.width = '100vw';
    }
    if (width > 968) {
      if (sidebarStyle && isOpen) {
        sidebarStyle.style.width = 'calc(100vw - 220px)';
      }
      if (sidebarStyle && !isOpen) {
        sidebarStyle.style.width = 'calc(100vw - 50px)';
      }
    }
  }, [isOpen, width]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathName]);

  return (
    <>
      {width > 768 ? (
        <div className={styles.container}>
          <div style={{ width: isOpen ? '220px' : '50px' }} className={styles.sidebar}>
            <div className={styles.top_section}>
              <Link
                href={'/'}
                style={{ display: isOpen ? 'block' : 'none' }}
                className={styles.logo}
              >
                <img src="/assests/logo.svg" alt="Brand Logo" />
              </Link>
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
                      className={`${styles.link} ${pathName === item.path ? styles.selected : ''}`}
                    >
                      <div className={styles.icon}>{item.icon}</div>
                      {isOpen && <div className={styles.link_text}>{item.name}</div>}
                    </div>
                  </Link>
                ))
              ) : (
                <></>
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
                        <div
                          className={`${styles.mob_link_text} ${
                            pathName.includes(item.path) ? styles.selected : ''
                          }`}
                        >
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
                <></>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
