'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import Sidebar from '../../Components/SideBar/Sidebar';
import { Navbar } from '../../Components/Navbar/Navbar';
import assignmentData from '../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import RequireAuthentication from '../../utils/requireAuthentication';
import { FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt } from 'react-icons/fa'
import withAuth from '@/Components/HOC/WithAuthHoc';
import Tournament from './tournament/page';
export interface IAppProps { }

function UserDashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowPerPage = 8;


  return (
    <>
      <RequireAuthentication>
        <Tournament />
      </RequireAuthentication>
    </>
  );
}

export default withAuth(UserDashboard);