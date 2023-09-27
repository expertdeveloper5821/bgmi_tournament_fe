import React from 'react';
import styles from '@/styles/card.module.scss';

const centerText = () => {
  return (
    <div className={styles.textContainer}>
      <span className={styles.yellowtext}> TOP </span>
      <span className={styles.yellowtext}> 10 </span>
      <span className={styles.whitetext}>BGMI</span>
      <span className={styles.hollowtext}>WINNERS</span>
    </div>
  );
};

export default centerText;
