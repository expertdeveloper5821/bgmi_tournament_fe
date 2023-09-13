'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import assignmentData from '../../utils/CreateAssignmment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import RequireAuthentication from '../../utils/requireAuthentication';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import TableData, {StudentProfile} from '@/Components/CommonComponent/Table/Table';
import { BtnDashboard } from '@/Components/CommonComponent/BtnDashboard';
import withAuth from '@/Components/HOC/WithAuthHoc';

export interface IAppProps {}

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<StudentProfile[]>([]);
  const rowPerPage = 8;

  const transformedStudentData = assignmentData.studentData.map((item: StudentProfile) => ({
    StudentName: item.StudentName,
    Student: item.Student,
    studentID: item.studentID,
    Mobile: item.Mobile,
    Course: item.Course,
  }));

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;
    const paginatedData = transformedStudentData.slice(startIndex, endIndex);
    setPaginatedData(paginatedData);
  }, [currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns: string[] = ['Squad', 'Room Id', 'Spectator Id', 'Date and Time', 'Map'];

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

export default withAuth(AdminDashboard);
