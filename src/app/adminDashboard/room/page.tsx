'use client';
import React, { useState, useEffect } from 'react';
//@ts-ignore
import { toast } from 'react-toastify';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import TableData from '@/Components/CommonComponent/Table/Table';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import {
  deleteRoomService,
  getAllFilteredRoomsListService,
  getAllRoomsService,
} from '@/services/authServices';
import { RoomsDataType } from '@/types/roomsTypes';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminRoomColumns } from '@/utils/constant';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';

function page() {
  const [wholeRoomData, setWholeRoomData] = useState<RoomsDataType[] | []>([]);
  const [roomData, setRoomData] = useState<RoomsDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const getAllTournaments = async () => {
    try {
      const response = await getAllRoomsService();
      setIsLoading(true);
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllTournaments();
  }, []);

  const deleteroom = async () => {
    setIsLoading(true);
    try {
      const response = await deleteRoomService({ _id: idToDelete });
      setIdToDelete('');
      setIsDeleteModalOpen(false);
      getAllTournaments();
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchTournaments = async (searchVal: string) => {
    try {
      const token = localStorage.getItem('jwtToken')!;
      const response = await getAllFilteredRoomsListService({ token, searchVal });
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
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

  const handleDeleteUser = (_id: string) => {
    setIdToDelete(_id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIdToDelete('');
    setIsDeleteModalOpen(false);
  };

  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div className={styles.abcd}>
          <div id="sidebar_wrapper" className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.flex}>
              <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
              <SearchFilter handleSearch={fetchTournaments} onChange={handleSearch} />
            </div>
            {isDeleteModalOpen && (
              <DeleteModal handleCloseModal={handleCloseModal} handleDeleteUser={deleteroom} />
            )}
            {isLoading ? (
              <Loader />
            ) : (
              <TableData
                data={roomData}
                columns={adminRoomColumns}
                deleteroom={handleDeleteUser}
                type={'ROOMS'}
              />
            )}
          </div>
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
}

export default page;
