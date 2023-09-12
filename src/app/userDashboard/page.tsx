'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import Sidebar from '../../components/commonComponent/SideBar/Sidebar';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../components/commonComponent/BtnDashboard';
import RequireAuthentication from '../../utils/requireAuthentication';
import { FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt } from 'react-icons/fa'
import withAuth from '@/components/hoc/WithAuthHoc';
import { Navbar } from '@/components/commonComponent/Navbar/Navbar';
export interface IAppProps { }

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