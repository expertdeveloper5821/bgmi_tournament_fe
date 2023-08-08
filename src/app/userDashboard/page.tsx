'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import Sidebar from '../../Components/SideBar/Sidebar';
import { Navbar } from '../../Components/Navbar/Navbar';
import TableData, { UserProfile, USER_DATA } from '../../Components/Table/Table';
import assignmentData from '../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../Components/CommonComponent/BtnDashboard';
import RequireAuthentication from '../../utils/requireAuthentication';
import { FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt } from 'react-icons/fa'
export interface IAppProps { }

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<USER_DATA[]>([]);;
  const rowPerPage = 8;

  const transformedStudentData = assignmentData.StudentData.map(
    (item: USER_DATA) => ({
      StudentName: item.StudentName,
      Student: item.Student,
      studentID: item.studentID,
      Mobile: item.Mobile,
      Course: item.Course,
    }),
  );

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;
    const paginatedData = transformedStudentData.slice(startIndex, endIndex);
    console.log("paginationData ==>", paginatedData)
    setPaginatedData(paginatedData);
  }, [currentPage, transformedStudentData]);


  const onPageChange = (page: number): void => {
    setCurrentPage(page);
  };


  const columns: string[] = [
    'Squad',
    'Room Id',
    'Spectator Id',
    'Date and Time',
    'Map',
  ];

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1>Welcome to Admin Dashboard</h1>
              <BtnDashboard />
              <TableData
                userData={paginatedData}
                columns={columns}
                showAdditionalButton={true}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  transformedStudentData.length / rowPerPage,
                )}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default AdminDashboard;