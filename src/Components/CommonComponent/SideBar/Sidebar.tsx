import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/DashboardSidebar.module.scss';
import { FaBars } from 'react-icons/fa';
import useWindowSize from '@/hooks/useWindowSize';
import { usePathname } from 'next/navigation';
import { MenuItem, SidebarProps } from '@/types/sidebarType';

const Sidebar: React.FC<SidebarProps> = ({ menuItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width] = useWindowSize();
  const pathName = usePathname();

  const toggle = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
  };

  useEffect(() => {
    const subMainLayout = document.getElementById('subMainLayoutContainer')!;

    if (isOpen) {
      subMainLayout.style.width = `calc(${width}px - 220px)`;
    } else {
      subMainLayout.style.width = `calc(${width}px - 50px)`;
    }
  }, [isOpen, width]);

  return (
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

      {menuItem &&
        menuItem.map((item: MenuItem, index: number) => (
          <Link href={item.path} key={index} passHref>
            <div className={`${styles.link} ${pathName === item.path ? styles.selected : ''}`}>
              <div className={styles.icon}>{item.icon}</div>
              {isOpen && <div className={styles.link_text}>{item.name}</div>}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
