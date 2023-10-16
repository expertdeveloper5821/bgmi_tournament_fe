'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/landingpage.module.scss';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(false);

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
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const offsetTop = element.offsetTop -100;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  };
  return (
    <div className={styles.main_container}>
      <nav className={scrolling ? `${styles.scrollnav}` : `${styles.navbar}`}>
        <Link href="/">
          <div>
            <span className={styles.logo}>
              <img 
               src={scrolling ?  `../assests/logo.svg` :'./assests/logolightmode.svg'}
              />
            </span>
          </div>
        </Link>
        {width >= 969 ? (
          <ul className={scrolling ? `${styles.scrollmenu}` : `${styles.menu}`}>
            <li>
              <a onClick={() => scrollToSection('bannerSection')}>Home</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('WelcomeSection')}>About Us</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('UpcomingMatches')}>Upcoming Matches</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('Footer')}>Contact Us</a>
            </li>
            <Link href="/auth/login">
              <button className={scrolling ? `${styles.scrollloginBtn}` : `${styles.loginBtn}`}>
                Login
              </button>
            </Link>
          </ul>
        ) : (
          <div>
            {isMenuOpen ? (
              <>
                <div
                  className={scrolling ? `${styles.scrollmenuToggle}` : `${styles.menuToggle}`}
                  onClick={toggleMenu}
                >
                  X
                </div>
                <ul className={scrolling ? `${styles.scrollmenumob}` : `${styles.menumob}`}>
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
                    <button
                      className={
                        scrolling ? `${styles.scrollloginBtnMob}` : `${styles.loginBtnMob}`
                      }
                    >
                      Login
                    </button>
                  </Link>
                </ul>
              </>
            ) : (
              <div
                className={scrolling ? `${styles.scrollmenuToggle}` : `${styles.menuToggle}`}
                onClick={toggleMenu}
              >
                ☰
              </div>
            )}
          </div>
        )}
      </nav>
      <div className={styles.bannertextcontainer}>
        <div className={styles.banner_center_text}>
          <h1 className={styles.banner_heading}>PATT SE</h1>
          <p className={styles.banner_subheading}>Warriors Wanted</p>
        </div>
      </div>
    </div>
  );
};

export default page;
