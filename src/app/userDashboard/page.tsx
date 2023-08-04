'use client';
import React, {useState, useEffect} from 'react';
import styles from '../../styles/Dashboard.module.scss';
import Sidebar from '../../Components/SideBar/Sidebar';
import {Navbar} from '../../Components/Navbar/Navbar';
import TableData, {StudentProfile} from '../../Components/Table/TableData';
import assignmentData from '../../utils/CreateAssignment.json';
//@ts-ignore
import {Pagination} from 'technogetic-iron-smart-ui';
import {BtnDashboard} from '../../Components/CommonComponent/BtnDashboard';
import RequireAuthentication from '../../utils/requireAuthentication';
import {FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt} from 'react-icons/fa';

export interface IAppProps {}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<StudentProfile[]>([]);
  const rowPerPage = 8;

  const transformedStudentData = assignmentData.studentData.map(
    (item: StudentProfile) => ({
      StudentName: item.StudentName,
      Student: item.Student,
      studentID: item.studentID,
      Mobile: item.Mobile,
      Course: item.Course,
    }),
  );

  // const dynamicMenuItems = [
  //   {
  //     path: '/userDashboard/tournament',
  //     name: 'Tournament',
  //     icon: <FaTh />,
  //   },
  //   {
  //     path: '/userDashboard/transcation',
  //     name: 'Transcation',
  //     icon: <FaUserAlt />,
  //   },
  //   {
  //     path: '/userDashboard/friends',
  //     name: 'Friends',
  //     icon: <FaRegChartBar />,
  //   },
  //   {
  //     path: '/userDashboard/vedios',
  //     name: 'Vedios',
  //     icon: <FaCommentAlt />,
  //   },
  //   {
  //     path: '/userDashboard/kys',
  //     name: 'KYC',
  //     icon: <FaCommentAlt />,
  //   },
  // ];

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;
    const paginatedData = transformedStudentData.slice(startIndex, endIndex);
    setPaginatedData(paginatedData);
  }, [currentPage, transformedStudentData]);

  const onPageChange = (page: number) => {
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
              <h1>Welcome to user Dashboard</h1>
              <BtnDashboard />
              <TableData
                studentData={paginatedData}
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

  // import React from 'react'

  // const Friend = () => {
  //   return (
  //     <div>Default</div>
  //   )
  // }

  // export default Friend