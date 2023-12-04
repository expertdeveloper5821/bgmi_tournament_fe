import React from 'react';
import styles from '@/styles/card.module.scss';
import Image from 'next/image';

export const NotFoundCard = ({ handleOpenInviteModal }) => {
  return (
    <div className={styles.noDataCard}>
      <Image width={200} height={400} src="/assests/lamp.svg" alt="banner" />
      <div className={styles.sorryTag}>
        <strong>SORRY!</strong>
      </div>
      <h2>
        We couldn’t find your friend. Send <br /> invite your friend by email
      </h2>
      <button className={styles.sendMailBtn} onClick={handleOpenInviteModal}>
        SEND INVITE BY EMAIL
      </button>
    </div>
  );
};
