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
  assignRoleService,
  deleteRoomService,
  getAllFilteredRoomsListService,
  getAllRoomsService,
  getAllUsersDataService,
} from '@/services/authServices';
import { RoomsDataType } from '@/types/roomsTypes';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminRoomColumns } from '@/utils/constant';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import { SpectatorDataType } from '@/types/spectatorTypes';

function page() {
  const [wholeRoomData, setWholeRoomData] = useState<RoomsDataType[] | []>([]);
  const [roomData, setRoomData] = useState<RoomsDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [spectatorData, setSpectatorData] = useState<SpectatorDataType[] | []>([]);

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

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await getAllUsersDataService(token);
      const allspectatorData = response?.data?.data;
      const filteredData = allspectatorData.filter((spectator: SpectatorDataType) => {
        return spectator?.role?.role === 'spectator';
      });
      setSpectatorData(filteredData);

      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const onAssignHandler = async (data: SpectatorDataType) => {
    try {
      const res = await assignRoleService({
        roomid: data?.role?._id,
        assignTo: data?.fullName,
      });

      if (res.response.status === 200) {
        toast.success('Assigned role successfully');
        getAllTournaments();
        getAllUsers();
      } else {
        toast.error(res.response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAllTournaments();
    getAllUsers();
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
      <div className={styles.sidebar_wrapper}>
        <Navbar />
        <div>
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
            assignModalData={spectatorData}
            columns={adminRoomColumns}
            deleteroom={handleDeleteUser}
            type={'ROOMS'}
            onAssignHandler={onAssignHandler}
          />
        )}
      </div>
    </IsAuthenticatedHoc>
  );
}

export default page;
