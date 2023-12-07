import React from 'react';
import styles from '@/styles/card.module.scss';
import { userProfileImg } from '@/utils/constant';

export const AddFriendCard = ({ user, setUserMail, forwardModalOpen }) => {
  return (
    <div className={`${styles.reviewCard} ${styles.addFriendCard}`}>
      <div className={styles.reviews}>
        <img
          src={user?.profilePic ? user?.profilePic : userProfileImg}
          alt="user photo"
          className={styles.profile}
        />
        <div className={styles.reviewer}>
          <div className={styles.name}>
            <h2>{user?.fullName}</h2>
          </div>
          <p>{user?.email}</p>
        </div>
      </div>
      <button
        className={styles['addFriendBtn']}
        onClick={() => {
          setUserMail(user?.email);
          forwardModalOpen(true);
        }}
      >
        Add Friend
      </button>
    </div>
  );
};
