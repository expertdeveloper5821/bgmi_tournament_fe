'use client';
import React, { useState } from 'react';
import styles from '@/styles/landingpage.module.scss';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [width] = useWindowSize();
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <Link href="/">
          <div>
            <span className={styles.logo}>
              <img src="../assests/logo.svg" />
            </span>
          </div>
        </Link>
        {width >= 969 ? (
          <ul className={`${styles.menu}`}>
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
              <button className={styles.loginBtn}>Login</button>
            </Link>
          </ul>
        ) : (
          <div>
            {isMenuOpen ? (
              <>
                {' '}
                <div className={styles.menuToggle} onClick={toggleMenu}>
                  X
                </div>
                <ul className={`${styles.menu}`}>
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
                    <button className={styles.loginBtnMob}>Login</button>
                  </Link>
                </ul>
              </>
            ) : (
              <div className={styles.menuToggle} onClick={toggleMenu}>
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
