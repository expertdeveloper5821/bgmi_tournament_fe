'use client';
import React from 'react';
import styles from '@/styles/Spectator.module.scss';
import dashStyles from '@/styles/Dashboard.module.scss';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

function spectatorDashboard() {
  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div className={dashStyles.temperarly_added}>Welcome to Spectator Dashboard</div>
      </div>
    </IsAuthenticatedHoc>
  );
}

export default spectatorDashboard;
