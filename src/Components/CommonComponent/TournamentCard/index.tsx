import React from 'react';
import styles from '@/styles/Dashboard.module.scss';
import Image from 'next/image';

const TournamentCard = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className={styles.registeredmatches}>
      <div className={styles.imgSection}>
        <Image
          src={imageUrl || '../assests/userdashboardbg.svg'}
          alt="userdashboardbg"
          className={styles.wrapperimg}
          width={200}
          height={200}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default TournamentCard;
