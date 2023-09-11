'use client';
import React, {useEffect, useState} from 'react';
import styles from '../../../styles/landingpage.module.scss';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [width] = useWindowSize();

  const handleScroll = () => {
    if (window.scrollY >= 500) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={scrolling ? `${styles.scrollnav}` : `${styles.navbar}`}>
        <Link href="/">
          <div>
            <span className={styles.logo}>
              <img src={"../assests/logo.svg"}/>
            </span>
          </div>
        </Link>
        {width >= 969 ? (
          <ul className={ scrolling ? `${styles.scrollmenu}`: `${styles.menu}`}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/about">Upcoming Matches</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <Link href="/auth/login">
              <button  className={ scrolling ? `${styles.scrollloginBtn}`:`${styles.loginBtn}`}>Login</button>
            </Link>
          </ul>
        ) : (
          <div>
            {isMenuOpen ? (
              <>
                <div className={ scrolling ?`${styles.scrollmenuToggle}`:`${styles.menuToggle}`} onClick={toggleMenu}>
                  X
                </div>
                <ul className={ scrolling ? `${styles.scrollmenumob}`:`${styles.menumob}`}>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/about">Upcoming Matches</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                  <Link href="/auth/login">
                    <button className={ scrolling ? `${styles.scrollloginBtnMob}`:`${styles.loginBtnMob}`}>Login</button>
                  </Link>
                </ul>
              </>
            ) : (
              <div className={ scrolling ?`${styles.scrollmenuToggle}`:`${styles.menuToggle}`} onClick={toggleMenu}>
                ☰
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default page;
