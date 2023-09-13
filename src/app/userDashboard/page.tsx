'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore

import RequireAuthentication from '../../utils/requireAuthentication';
import { BtnDashboard } from '@/Components/CommonComponent/BtnDashboard';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
export interface IAppProps {}

function UserDashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowPerPage = 8;

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1>Welcome to Admin Dashboard</h1>
              <BtnDashboard />
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default withAuth(UserDashboard);
