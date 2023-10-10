import React from 'react';
import styles from '@/styles/winner_review.module.scss';
import ReviewCard from './reviewCard';
import Image from 'next/image';

const reviewSection = () => {
  return (
    <div>
      <div className={styles.container}>
        <Image
          src="/assests/trophy.svg"
          alt="trophy"
          width={100}
          height={100}
          className={styles.cornerone}
        />
        <Image src="/assests/trophy.svg" alt="trophy" width={65} height={65} />
        <Image
          src="/assests/trophy.svg"
          alt="trophy"
          width={65}
          height={65}
          className={styles.middletwo}
        />
        <Image
          src="/assests/trophy.svg"
          alt="trophy"
          width={100}
          height={100}
          className={styles.cornerone}
        />
      </div>
      <div className={styles.reviewsContainer}>
        <ReviewCard />
      </div>
    </div>
  );
};

export default reviewSection;
