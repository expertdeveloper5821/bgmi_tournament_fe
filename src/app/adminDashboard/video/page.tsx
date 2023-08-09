'use client'
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/video.module.scss';
import {Navbar} from '@/Components/Navbar/Navbar';
import VideoCard from './videoCard/videoCard';
import CenterText from './videoCard/centerText';
import ReviewSection from './videoCard/reviewSection';
const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
    
    {
      isLoading ? <div className={styles.loader}> Please wait...</div> :  <div className={styles.main_container}>
      <div>
        <Navbar />
      </div>
      <div className={styles.sub_container}>
        <div className={styles.header}>
          <h2>VIDEOS</h2>
          <span>Dashboard / videos</span>
        </div>
        <div className={styles.selectContainer}>
            <img src='/assests/sort.svg' className={styles.sortIcon}/>
            <img src='/assests/downarrow.svg' className={styles.arrowicon}/>
          <select className={styles.select}>
            <option className={styles.sortByOption}> Sort By</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.videoCard}>
          <VideoCard />
        </div>
        <div className={styles.centerText}>
          <CenterText />
        </div>
        <div className={styles.reviewSection}>
          <ReviewSection />
        </div>
      </div>
    </div>
    }
    </>
   
  );
};

export default Page;
