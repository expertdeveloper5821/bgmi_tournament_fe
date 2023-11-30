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
          mainElemInner.style.flex = !isOpen ? '0 1 70%' : '0 1 96%';
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

  console.log('menuItem ==>', menuItem);

  return (
    <>
      <div className={styles.container}>
        <div style={{ width: isOpen ? '220px' : '50px' }} className={styles.sidebar}>
          <div className={styles.top_section}>
            <Link href={'/'} style={{ display: isOpen ? 'block' : 'none' }} className={styles.logo}>
              <img src="/assests/logo.svg" alt="Brand Logo" />
            </Link>

            <div className={styles.bars}>
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
            {menuItem &&
              menuItem.map((item: MenuItem, index: number) => (
                <Link href={item.path} key={index} passHref>
                  <div
                    className={`${styles.link} ${pathName === item.path ? styles.selected : ''}`}
                  >
                    <div className={styles.icon}>{item.icon}</div>

                    {isOpen && <div className={styles.link_text}>{item.name}</div>}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
