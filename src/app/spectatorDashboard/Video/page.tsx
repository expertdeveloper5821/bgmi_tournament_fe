'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { Select } from 'technogetic-iron-smart-ui';
import { getAllVideo, deleteVideoService, getVideoById } from '@/services/authServices';
import { getVideo } from '@/types/spectatorTypes';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import TableData from '@/Components/CommonComponent/Table/Table';
import { VidoColumns } from '@/utils/constant';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';

const Video = () => {
  const [data, setData] = useState<getVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getAllVideos = async () => {
    const token = localStorage.getItem('jwtToken') || '';
    try {
      const response = await getAllVideo(token);
      setData(response || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleClickUpdate = async (data: getVideo) => {
    try {
      const { _id } = data;
      const token = localStorage.getItem('jwtToken') || '';
      const videoData = await getVideoById({ token, _id });

      if (videoData) {
        router.push(`/spectatorDashboard/Matchhistorydetails?id=${_id}`);
      } else {
        toast.error('Failed to fetch video data.');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred while fetching video data.');
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
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.inner_specter_cls}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 className={styles.title_video}>Welcome to Spectator Dashboard</h1>
              <div className={styles.breadcrumbs_container}>
                <Breadcrumb />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Select
                onChange={function noRefCheck() {}}
                option={['Status Timeline', 'Match Type', 'Date']}
                placeholder="Sort By"
                className={styles.sort}
                optionClassName={styles.popdown}
              />
            </div>
          </div>

          <div>
            {isDeleteModalOpen && (
              <DeleteModal handleCloseModal={handleCloseModal} handleDeleteUser={deleteVideo} />
            )}
            {isLoading ? (
              <Loader />
            ) : (
              <TableData
                deleteroom={handleDeleteUser}
                columns={VidoColumns}
                data={data}
                handleUpdate={handleClickUpdate}
                type={'VIDEOUSER'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
