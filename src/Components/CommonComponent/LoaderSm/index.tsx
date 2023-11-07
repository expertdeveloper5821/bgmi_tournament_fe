import React from 'react';
import styles from '@/styles/LoaderSm.module.scss';

const LoaderSm = () => {
  return (
    <div className={styles['ripple-loader']}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoaderSm;
