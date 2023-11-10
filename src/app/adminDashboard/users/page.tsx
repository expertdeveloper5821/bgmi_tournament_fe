'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/CommonComponent/Navbar/Navbar';
import TableData from '@/Components/CommonComponent/Table/Table';
//@ts-ignore
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { toast } from 'react-toastify';
import { deleteRoleService, getAllFilteredUsersListService } from '@/services/authServices';
import { SpectatorDataType } from '@/types/spectatorTypes';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminUserColumns } from '@/utils/constant';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';

function page() {
  const [wholeUserData, setWholeUserData] = useState<SpectatorDataType[] | []>([]);
  const [userData, setUserData] = useState<SpectatorDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const fetchTournaments = async (searchVal: string) => {
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await getAllFilteredUsersListService({ searchVal, token });

      const allUsersData: SpectatorDataType[] = response?.data?.data;
      const filteredData = allUsersData?.filter((user) => {
        return user?.role?.role === 'user';
      });
      setWholeUserData(filteredData);
      setUserData(filteredData);

      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments('');
  }, []);

  const deleteroom = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await deleteRoleService({ userUuid: idToDelete, token });
      setIdToDelete('');
      setIsDeleteModalOpen(false);
      fetchTournaments('');
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const filteredResults = wholeUserData.filter(
      (data: SpectatorDataType) =>
        data?.fullName?.toLowerCase().includes(value.toLowerCase()) ||
        data?.userName?.toLowerCase().includes(value.toLowerCase()) ||
        data?.email?.toLowerCase().includes(value.toLowerCase()),
    );
    setUserData(filteredResults);
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
          <div className={styles.sidebar_wrapper}>
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
                deleteroom={handleDeleteUser}
                data={userData}
                columns={adminUserColumns}
                type={'USERS'}
              />
            )}
          </div>
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
}

export default page;
