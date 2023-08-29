'use client'
import React, { useState } from 'react'
import styles from '../../../styles/landingpage.module.scss'
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
const page = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [width] = useWindowSize()
    return(
   <div className={styles.main_container}>
   <nav className={styles.navbar}>
      <Link href="/">
        <div>
        <span className={styles.logo}>
            <img src='../assests/logo.svg'/>
        </span>
        </div>
      </Link>
        <div className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </div>
      
      <ul className={`${styles.menu} ${ (isMenuOpen ) ? styles.active : ''}`}>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>                                                                   
        <li>
          <Link href="/about">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/about">
            Upcoming Matches
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Contact Us
          </Link>
        </li>
      <button className={styles.loginBtn}>Login</button>
      </ul>
    </nav>

   </div>
    )
}

export default page