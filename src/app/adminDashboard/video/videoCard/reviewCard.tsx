import React from 'react';
import styles from '../../../../styles/winner_review.module.scss';
const reviewCard = () => {
  return (
    <>
    <div className={styles.reviewCard}>
      <div className={styles.reviews}>
        <img
          src="/assests/reviewer.svg"
          alt="trophy"
          className={styles.profile}
        />
        <div className={styles.reviewer}>
          <h2>jaspreeet singh</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            accusantium eveniet. Architecto eum deleniti amet autem eaque quae,
            labore similique minima, laboriosam harum sint voluptatum
            perferendis qui facilis vitae ab.
          </p>
        </div>
      </div>
    </div>


    <div className={styles.reviewCard}>
      <div className={styles.reviews}>
        <img
          src="/assests/reviewer.svg"
          alt="trophy"
          className={styles.profile}
        />
        <div className={styles.reviewer}>
          <h2>jaspreeet singh</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            accusantium eveniet. Architecto eum deleniti amet autem eaque quae,
            labore similique minima, laboriosam harum sint voluptatum
            perferendis qui facilis vitae ab.
          </p>
        </div>
      </div>
    </div>

    <div className={styles.reviewCard}>
      <div className={styles.reviews}>
        <img
          src="/assests/reviewer.svg"
          alt="trophy"
          className={styles.profile}
        />
        <div className={styles.reviewer}>
          <h2>jaspreeet singh</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            accusantium eveniet. Architecto eum deleniti amet autem eaque quae,
            labore similique minima, laboriosam harum sint voluptatum
            perferendis qui facilis vitae ab.
          </p>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default reviewCard;
