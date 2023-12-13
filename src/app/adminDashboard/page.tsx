import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import styles from '@/styles/Dashboard.module.scss';
import React from 'react';

const page = () => {
  return (
    <IsAuthenticatedHoc>
      <div className={styles.temperarly_added}>Welcome to Admin Dashboard</div>
    </IsAuthenticatedHoc>
  );
};

export default page;
