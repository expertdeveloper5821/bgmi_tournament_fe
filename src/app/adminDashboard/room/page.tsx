'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData, { RoomData } from '../../../Components/Table/Table'
import assignmentData from '../../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import RequireAuthentication from '../../../utils/requireAuthentication';
// import apiServices from '@/services/api/apiServices';
import { sendRequest } from '@/services/auth/auth_All_Api';
import { toast } from 'react-toastify';
import Loader from '@/Components/Loader/Loader';
import router from 'next/router';


export interface IAppProps { }

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<RoomData[]>([]);
  const rowPerPage = 8;
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const imageIcon: string = 'room';

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
      // console.log(tokens)
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
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
              {/* <SearchFilter /> */}
              {isLoading ? (
                <Loader />
              ) : (
                <TableData
                  imageIcon={imageIcon}
                  roomData={roomData}
                  columns={columns}
                  showAdditionalButton={true} userData={[]} teamData={[]} spectatorData={[]} deleteroomId={deleteroomId} setSetSpectatorId={undefined} setModal={undefined} updateSpectatorByid={undefined} />
              )}
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}



export default page;


