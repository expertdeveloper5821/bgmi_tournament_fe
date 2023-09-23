'use client';
import React, { useState, useEffect } from 'react';
//@ts-ignore
import RequireAuthentication from '../../../utils/requireAuthentication';
// import apiServices from '@/services/api/apiServices';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import Loader from '@/Components/Loader/Loader';
import router from 'next/router';
import styles from '@/styles/Dashboard.module.scss';
import assignmentData from '../../../utils/CreateAssignmment.json';
//@ts-ignore
import RequireAuthentication from '../../../utils/requireAuthentication';
import TableData, { StudentProfile } from '@/Components/CommonComponent/Table/Table';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';


export interface IAppProps { }

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<StudentProfile[]>([]);
  const rowPerPage = 8;
  const [roomData, setRoomData] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const imageIcon: string = 'room';

  const transformedStudentData = assignmentData.studentData.map((item: StudentProfile) => ({
    StudentName: item.StudentName,
    Student: item.Student,
    studentID: item.studentID,
    Mobile: item.Mobile,
    Course: item.Course,
  }));

  useEffect(() => {
    // Simulate data loading or any async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const getAllTournaments = async () => {
    const tokens = localStorage.getItem('jwtToken');
    const tournamentResponse = await sendRequest('/room/rooms', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokens}` }
    });
    setRoomData(tournamentResponse.data);
  }

  useEffect(() => {
    getAllTournaments();
  }, [])

  const deleteroomId = async (_id: any) => {
    setIsLoading(true);
    try {
      const tokens = localStorage.getItem('jwtToken');
      const response = await sendRequest(`/room/rooms/${_id}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${tokens}` }
      });
      getAllTournaments();
      if (response) {
        const success = response.data.message;
        toast.success(success);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };


  const columns: string[] = [
    'Created By',
    'Room Id',
    'Password',
    'Game Name',
    'Game Type',
    'Map Type',
    'Version',
    'Time',
    'Date',
  ];


  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container} id="mainLayoutContainerInner">
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
              {/* <SearchFilter /> */}
              {isLoading ? (
                <Loader />
              ) : (
                <TableData
                studentData={roomData}
                  columns={columns}
                  showAdditionalButton={true} />
              )}
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}



export default page;


