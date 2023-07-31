import React, { useState, useEffect } from "react";
import styles from "../../../Pages/DashboardPage/Dashboard.module.scss";
import Sidebar from "../../Sidebar";
import { Navbar } from "../../../Navbar/Navbar";
import TableData, { StudentProfile } from "../../../Table/TableData";
import assignmentData from "../../../../../Utils/CreateAssignment.json";
// @ts-ignore
import { Pagination } from "technogetic-iron-smart-ui";
import { BtnDashboard } from "../../../CommonComponent/BtnDashboard";
import { useRouter, NextRouter } from "next/router";

export interface IAppProps { }

export function Spectator() {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<StudentProfile[]>([]);
    const router: NextRouter = useRouter();
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

        "Room Id",
        "List of Room",
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
                            router={router}
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


