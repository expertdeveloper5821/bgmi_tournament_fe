'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/CommonComponent/Navbar/Navbar';
import TableData from '@/Components/CommonComponent/Table/Table';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { toast } from 'react-toastify';
import { deleteVideoService } from '@/services/authServices';
import { adminGetVideo } from '@/types/spectatorTypes';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminVidoColumns } from '@/utils/constant';
import { getVideos } from '@/services/authServices';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';

function page() {
  const [userData, setUserData] = useState<adminGetVideo[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const getAllVideos = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await getVideos(token);
      const allVideoData: adminGetVideo[] = response?.data?.data;
      setUserData(allVideoData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const deleteVideo = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await deleteVideoService({ _id: idToDelete, token });
      setIdToDelete('');
      setIsDeleteModalOpen(false);
      getAllVideos();
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
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
      <div className={styles.main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div>
            <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
            <div className={styles.breadcrumbs_container}>
              <Breadcrumb />
            </div>
          </div>
          {isDeleteModalOpen && (
            <DeleteModal handleCloseModal={handleCloseModal} handleDeleteUser={deleteVideo} />
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <TableData
              deleteroom={handleDeleteUser}
              data={userData}
              columns={adminVidoColumns}
              type={'VIDEO'}
            />
          )}
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
}

export default page;
