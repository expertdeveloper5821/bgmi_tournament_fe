import React from 'react'
import styles from '../../../../styles/winner_review.module.scss';
import ReviewCard from './reviewCard';

const reviewSection = () => {
  return (
    <div>
        <div className={styles.container}>
        <img src='/assests/trophy.svg' alt='trophy' className={styles.cornerone}/>
        <img src='/assests/trophy.svg' alt='trophy' className={styles.middleone}/>
        <img src='/assests/trophy.svg' alt='trophy' className={styles.middleone}/>
        <img src='/assests/trophy.svg' alt='trophy' className={styles.cornerone}/>
        </div>
        <div className={styles.reviewsContainer}>
            <ReviewCard />
        </div>
    </div>
  )
}

export default reviewSection