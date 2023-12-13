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
  getAllRoles,
  getAllRoomsService,
  getAllSpectators,
} from '@/services/authServices';
import { ROLES_DETAILS_TYPE, RoomsDataType } from '@/types/roomsTypes';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminRoomColumns } from '@/utils/constant';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import { SpectatorsDataType } from '@/types/spectatorTypes';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';

function page() {
  const [wholeRoomData, setWholeRoomData] = useState<RoomsDataType[] | []>([]);
  const [roomData, setRoomData] = useState<RoomsDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [spectatorData, setSpectatorData] = useState<SpectatorsDataType[] | []>([]);
  const [rolesDetails, setRolesDetails] = useState<[] | ROLES_DETAILS_TYPE[]>([]);

  const getAllTournaments = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRoomsService();
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const getRoles = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRoles();
      if (response.status === 200) {
        setRolesDetails(response.data.data);
      } else {
        toast.error(response.response.data.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const getSpectators = async (id) => {
    setIsLoading(true);
    try {
      const response = await getAllSpectators(id);
      if (response.status === 200) {
        setSpectatorData(response.data.findSpacatator);
      } else {
        toast.error(response.response.data.error);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setIsLoading(false);
    }
  };

  const onAssignHandler = async (data: SpectatorsDataType, roomId: string) => {
    setIsLoading(true);
    try {
      const res = await assignRoleService({
        roomid: roomId,
        assignTo: data?.fullName,
      });
      if (res.status === 200) {
        toast.success('Room Assigned Successfully');
        getAllTournaments();
        rolesDetails.length &&
          getSpectators(
            rolesDetails.find((role: ROLES_DETAILS_TYPE) => role.role === 'spectator')?._id,
          );
      } else {
        toast.error(res.response.data.error);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error('Assigning Role Failed');
    }
  };

  useEffect(() => {
    getRoles();
    getAllTournaments();
  }, []);

  useEffect(() => {
    rolesDetails.length &&
      !spectatorData.length &&
      getSpectators(
        rolesDetails.find((role: ROLES_DETAILS_TYPE) => role.role === 'spectator')?._id,
      );
  }, [rolesDetails]);

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
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken')!;
      const response = await getAllFilteredRoomsListService({ token, searchVal });
      toast.success('Rooms Found Successfully');
      setWholeRoomData(response?.data);
      setRoomData(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.data?.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const filteredResults = wholeRoomData.filter(
      (data: RoomsDataType) =>
        data?.createdBy?.fullName?.toLowerCase().includes(value.toLowerCase()) ||
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
          <div className={styles.breadcrumbs_container}>
            <Breadcrumb />
          </div>
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
