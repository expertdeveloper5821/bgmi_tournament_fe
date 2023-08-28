'use client';
import React, {useState} from 'react';
import styles from '../../styles/landingpage.module.scss';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
import NavBar from './navBar/page';
import Image from 'next/image';

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
              src="/assests/matches_banner.svg"
              alt="bg"
              className={styles.banner_image}
            />
          </div>
          <div className={styles.time_container}>
            <div>
              <h2>Coming Soon</h2>
              <span>Time: 00-00-0000 at 00:00 pm</span>
            </div>
            <div className={styles.prizepool}>
              <div className={styles.prize_container}>
                <span>WINNING PRIZE</span>
                <h2>Last Survival: 200</h2>
              </div>
              <div className={styles.fee_container}>
                <span>ENTRY FEES</span>
                <h2>0</h2>
              </div>
            </div>
            <div className={styles.gameInfo}>
              <div className={styles.game}>
                <span>TYPE</span>
                <span>Squad</span>
              </div>
              <div className={styles.game}>
                <span>VERSION</span>
                <span>4*4</span>
              </div>
              <div className={styles.game}>
                <span>MAP</span>
                <span>ERANGEL</span>
              </div>
            </div>
            <div className={styles.range_container}>
              <div className={styles.range}>
                <input type='range' value={50}/>
                <span>Only 30 spots left 20/50</span>
              </div>
              <button className={styles.joinbtn}>JOIN</button>
            </div>
          </div>
        </div>
        <div className={styles.rn_images_container}>
          <img src="../assests/1.svg" className={styles.rn_images} />
          <img src="../assests/1.svg" className={styles.rn_images} />
          <img src="../assests/1.svg" className={styles.rn_images} />
        </div>
        <div className={styles.welcome_Container}>
        <div className={styles.stone} >
              <img src='../assests/stone.svg'/>
              <img src='../assests/Group20.svg'/>
            </div>
          <div className={styles.welcome_subcontainer} >
            
          <h2>WELCOME TO PATT SE HEADSHOT</h2>
          <p>
            Welcome to our cutting-edge esports platform designed exclusively
            for BGMI players. Engage in thrilling competitive tournaments, test
            your skills, and climb the leaderboards to showcase your mastery.
            Enjoy personalized team-building features, connect with fellow
            gamers, and strategize for victory. Our platform provides in-depth
            game analytics to enhance your performance and gain valuable
            insights. Embrace the ultimate battleground for mobile gaming
            enthusiasts, where the passion for esports meets unparalleled
            excitement. Join our growing community, fuel your competitive
            spirit, and seize the chance to win fantastic rewards. Elevate your
            gaming experience and be a part of the future of esports with us!
          </p>
          </div>
        
        </div>
        <div>
            <div className={styles.choseSection}>
              <h2>Why Choose PATT SE HEADSHOT</h2>
              <p>
          Join the ranks of those who have chosen us as their preferred esports
          platform for BGMI. Experience the future of gaming excellence and be
          part of our ever-growing success story.
        </p>
        <img src={'../assests/directionindicator.svg'} />
            </div>
            <div className={styles.scopeSection}>

              <div className={styles.centerscope}>
                <Image src='../assests/newscope.svg' alt='center scope' height={100} width={100}/>
              </div>
         
        </div>
            
          </div>
      </div>

    </>
  );
};

export default page;
