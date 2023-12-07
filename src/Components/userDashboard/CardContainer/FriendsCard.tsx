import React from 'react';
import styles from '@/styles/card.module.scss';
import { userProfileImg } from '@/utils/constant';

export const FriendsCard = ({ user, setOpen, setUserMail }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviews}>
        <img
          src={user?.profilePic ? user?.profilePic : userProfileImg}
          alt="user photo"
          className={styles.profile}
        />
        <div className={styles.reviewer}>
          <div className={styles.name}>
            <h2>{user?.fullName}</h2>
            <span className={styles.greenCircle}></span>
          </div>
          <p>{user?.email}</p>
        </div>
      </div>
      <span
        className={styles['deleteBtn']}
        onClick={() => {
          setOpen(true);
          setUserMail(user?.email);
        }}
      >
        x
      </span>
    </div>
  );
};
