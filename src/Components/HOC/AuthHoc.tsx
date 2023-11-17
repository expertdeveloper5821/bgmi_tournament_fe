import Image from 'next/image';
import React from 'react';
import styles from '@/styles/auth.module.scss';

const AuthHoc = ({ children, heading, subheading }) => {
  return (
    <div className={styles.main_container}>
      {/* <div className={styles.background_container}> */}
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="../assests/logoWithBg.svg" alt="Tg-logo" width={250} height={100} />
        </div>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subheading}>{subheading}</p>
        </div>
        <div className={styles.formWrapper}>{children}</div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AuthHoc;
