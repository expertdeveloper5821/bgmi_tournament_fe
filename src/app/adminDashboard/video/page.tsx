'use client';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import React from 'react';
import styles from '@/styles/Dashboard.module.scss';

const page = () => {
  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div id="sidebar_wrapper" className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.popupbutton} style={{ justifyContent: 'center' }}>
            <h1 className={styles.heading}>Site under maintenance !!</h1>
          </div>
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
};

export default page;
