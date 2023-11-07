'use client';
import React, { useState, useEffect } from 'react';
//@ts-ignore
import { toast } from 'react-toastify';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import TableData from '@/Components/CommonComponent/Table/Table';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import {
  deleteRoomService,
  getAllFilteredRoomsListService,
  getAllRoomsService,
} from '@/services/authServices';
import {
  deleteRoomService,
  getAllFilteredRoomsListService,
  getAllRoomsService,
} from '@/services/authServices';
import { RoomsDataType } from '@/types/roomsTypes';

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
    const token = localStorage.getItem('jwtToken') || '';
    try {
      const response = await getAllRoomsService(token);
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getAllTournaments();
  }, []);

  const deleteroom = async (_id: string) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await deleteRoomService({ _id, token });
      getAllTournaments();
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  const fetchTournaments = async (searchVal: string) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await getAllFilteredRoomsListService({ token, searchVal });
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const filteredResults = wholeRoomData.filter(
      (data: RoomsDataType) =>
        data?.createdBy?.toLowerCase().includes(value.toLowerCase()) ||
        data?.gameName?.toLowerCase().includes(value.toLowerCase()) ||
        data?.gameType?.toLowerCase().includes(value.toLowerCase()) ||
        data?.mapType?.toLowerCase().includes(value.toLowerCase()) ||
        data?.version?.toLowerCase().includes(value.toLowerCase()),
    );
    setRoomData(filteredResults);
  };

  return (
    <>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.flex}>
              <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
              <SearchFilter handleSearch={fetchTournaments} onChange={handleSearch} />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <TableData data={roomData} columns={columns} deleteroom={deleteroom} type={'ROOMS'} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(page);
