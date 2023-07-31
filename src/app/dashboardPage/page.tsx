'use client'
import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import Sidebar from "../Components/SideBar/Sidebar";
import { Navbar } from "../Components/Navbar/Navbar";
import TableData, { StudentProfile } from "../Components/Table/TableData";
import assignmentData from "../../Utils/CreateAssignment.json";
//@ts-ignore
import { Pagination } from "technogetic-iron-smart-ui";
import { BtnDashboard } from "../Components/CommonComponent/BtnDashboard";

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
    })
  );

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
    "Squad",
    "Room Id",
    "Spectator Id",
    "Date and Time",
    "Map",
  ];

  return (
    <>

      <div className={styles.main_container}>
        <Sidebar />
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



    </>
  );
}

