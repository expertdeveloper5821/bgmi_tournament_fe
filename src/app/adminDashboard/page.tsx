'use client';
import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import Sidebar from '../../Components/SideBar/Sidebar';
import { Navbar } from '../../Components/Navbar/Navbar';
import TableData, { StudentProfile } from '../../Components/Table/TableData';
import assignmentData from '../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../Components/CommonComponent/BtnDashboard';
import RequireAuthentication from "../../utils/requireAuthentication"
import {
  FaTh,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
} from "react-icons/fa";

export interface IAppProps { }

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

  const dynamicMenuItems = [
      {
        path: "/room",
        name: "Room",
        icon: <FaTh />,
      },
      {
        path: "/adminDashboard/spectator",
        name: "Specatator",
        icon: <FaUserAlt />,
      },
      {
        path: "/adminDashboard/users",
        name: "Users",
        icon: <FaRegChartBar />,
      },
      {
        path: "/adminDashboard/teams",
        name: "Teams",
        icon: <FaCommentAlt />,
      }
  ];

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
        <Sidebar menuItem={dynamicMenuItems} />
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <BtnDashboard />
              <TableData
                studentData={paginatedData}
                columns={columns}
                showAdditionalButton={true}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(transformedStudentData.length / rowPerPage)}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}