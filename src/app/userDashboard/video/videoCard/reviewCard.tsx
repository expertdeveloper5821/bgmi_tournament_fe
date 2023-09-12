import React from 'react';
import styles from '@/styles/winner_review.module.scss';
import Image from 'next/image';

const reviewCard: React.FC = () => {
  return (
    <>
      <div className={styles.reviewCard}>
        <div className={styles.reviews}>
          <Image
            src="/assests/reviewer.svg"
            alt="trophy"
            height={100}
            width={100}
            className={styles.profile}
          />
          <div className={styles.reviewer}>
            <h2>jaspreeet singh</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, accusantium eveniet.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.reviewCard}>
        <div className={styles.reviews}>
          <Image
            src="/assests/reviewer.svg"
            alt="trophy"
            height={100}
            width={100}
            className={styles.profile}
          />
          <div className={styles.reviewer}>
            <h2>jaspreeet singh</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, accusantium eveniet.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.reviewCard}>
        <div className={styles.reviews}>
          <Image
            height={100}
            width={100}
            src="/assests/reviewer.svg"
            alt="trophy"
            className={styles.profile}
          />
          <div className={styles.reviewer}>
            <h2>jaspreeet singh</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, accusantium eveniet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default reviewCard;
