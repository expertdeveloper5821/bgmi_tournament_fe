'use client';
import React, { useState, useEffect } from 'react';
//@ts-ignore
// import apiServices from '@/services/api/apiServices';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import TableData from '@/Components/CommonComponent/Table/Table';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';

export interface IAppProps {}

interface RoomsDataType {
    availableSlots: number;
    createdAt: string;
    createdBy: string;
    dateAndTime: string;
    entryFee: string;
    gameName: string;
    gameType: string;
    highestKill: string;
    lastSurvival: string;
    mapImg: string;
    mapType: string;
    password: string;
    registerTeams: [];
    roomId: string;
    roomUuid: string;
    secondWin: string;
    thirdWin: string;
    updatedAt: string;
    version: string;
    __v: number;
    _id: string;
}

function page() {
  const [wholeRoomData, setWholeRoomData] = useState<RoomsDataType[] | []>([]);
  const [roomData, setRoomData] = useState<RoomsDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  
  const getAllTournaments = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const tournamentResponse = await sendRequest('/room/rooms', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      setWholeRoomData(tournamentResponse?.data);
      setRoomData(tournamentResponse?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getAllTournaments();
  }, []);

  const deleteroom = async (_id:string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await sendRequest(`/room/rooms/${_id}`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
      });
      getAllTournaments();
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    } 
  };

  const fetchTournaments = async (searchVal:string) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await sendRequest(`/room/rooms?search=${searchVal}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    const { name, value } = e.target;
    const filteredResults = wholeRoomData.filter((data:RoomsDataType) =>
    data?.createdBy
    ?.toLowerCase().includes(value.toLowerCase()) || data?.gameName?.toLowerCase().includes(value.toLowerCase()) || data?.gameType
    ?.toLowerCase().includes(value.toLowerCase()) || data?.mapType
    ?.toLowerCase().includes(value.toLowerCase()) || data?.version
    ?.toLowerCase().includes(value.toLowerCase())
    );
    setRoomData(filteredResults);
  };

  return (
    <>
        <div className={styles?.main_container} id="mainLayoutContainerInner">
          <div className={styles?.abcd}>
            <div className={styles?.sidebar_wrapper}>
              <Navbar />
              <div className={styles?.flex}>
                <h1 className={styles?.heading}>Welcome to Admin Dashboard</h1>
                <SearchFilter handleSearch={fetchTournaments} onChange={handleSearch} /></div>              
              {isLoading ? (
                <Loader />
              ) : (
                <TableData studentData={roomData} columns={columns} showAdditionalButton={true} deleteroom={deleteroom} type={'ROOMS'} />
              )}
            </div>
          </div>
        </div>
    </>
  );
}

export default withAuth(page);
