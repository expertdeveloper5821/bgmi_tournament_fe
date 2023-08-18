'use client';
import React, {useState} from 'react';
import styles from '../../styles/landingpage.module.scss';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
import NavBar from './navBar/page';
const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [width] = useWindowSize();
  return (
    <>
    <div className={styles.main_container}>
      <div>
      <NavBar />
      </div>
      <div className={styles.banner_center_text}>
      <h1 className={styles.banner_heading}>PATT SE</h1>
      <p className={styles.banner_subheading}>Warriors Wanted</p>
      </div>
    </div>
      <div className={styles.upcoming_mathces_container}>
      <div className={styles.rn_text}>
        <h2>EARN CASH REWARDS FOR CONQUERING</h2>
      </div>
      <div className={styles.upcoming_mathces}>
        <h3 className={styles.upComingHeading}>Upcoming Matches</h3>
        <p className={styles.upComingPara}>
          Are you ready to take your BGMI gaming to the next level? Look no
          further! BGMI Rewards brings you an exhilarating platform where your
          gaming skills translate into real cash rewards. Join thousands of
          enthusiastic players who have already unlocked the true potential of
          their gaming passion.
        </p>
      </div>
      <div className={styles.upcoming_mathces_sub_container}>
      <div className={styles.banner_bgmi_img}>
          <img
            src="/assests/matches_banner.svg" alt="bg" className={styles.banner_image}
          />
        </div>
        <div>
          here will bw the ocntwnr
        </div>
      </div>
      <div className={styles.rn_images_container}>
          <img src='../assests/1.svg'  className={styles.rn_images}/>
          <img src='../assests/1.svg' className={styles.rn_images}/>
          <img src='../assests/1.svg' className={styles.rn_images}/>
        </div>
      </div>

   <div>
    
   </div>
      </>
  );
};

export default page;
