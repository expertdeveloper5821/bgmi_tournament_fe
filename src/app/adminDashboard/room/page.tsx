'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData, { RoomData } from '../../../Components/Table/Table'
import assignmentData from '../../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
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
    console.log("id__________", _id)
    setIsLoading(true);
    try {
      const tokens = localStorage.getItem('jwtToken');
      console.log(tokens)
      const response = await sendRequest(`/room/rooms/${_id}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${tokens}` }
      });
      // const updatedData = roomData.filter(data => data.roomId !== _id);
      // setRoomData(updatedData);
      getAllTournaments();
      if (response) {

        const success = response.data.message;
        toast.success(success);

      }

    } catch (error) {
      console.error('Error deleting room:', error);

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
    // 'MapImg',
    'Version',
    'Time',
    'Date',
    // 'Last Servival',
    // 'Highest Kill',
    // 'Second Win',
    // 'Third Win',


  ];


  return (
    <>
      <RequireAuthentication>

        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
              <BtnDashboard />
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


