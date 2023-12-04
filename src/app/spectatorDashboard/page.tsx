'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import RoomTable from '@/Components/spectatorDashboard/rooms/Table';
import { SpectatorRoomDataType } from '@/types/roomsTypes';
import CreateRoomForm from '@/Components/spectatorDashboard/rooms/RoomForm';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { getAllSpectatorService } from '@/services/specDashboardServices';

function spectatorDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [roomIdToUpdate, setRoomIdToUpdate] = useState({});
  const [spect, setSpect] = useState<SpectatorRoomDataType[] | null>(null);

  const getAllRooms = async () => {
    getAllSpectatorService()
      .then((res) => setSpect(res.data))
      .catch(console.error);

  };

  useEffect(() => {
    if (!spect) {
      getAllRooms();
    }
  }, []);

  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div className={styles.inner_main_container}>
          <div id="sidebar_wrapper" className={styles.sidebar_wrapper}>
            <Navbar />
            <div>
              <div className={styles.inner_specter_cls}>
                <h1 className={styles.r_main_title}>Rooms</h1>
                <CreateRoomForm
                  showModal={showModal}
                  setShowModal={setShowModal}
                  roomIdToUpdate={roomIdToUpdate}
                  setRoomIdToUpdate={setRoomIdToUpdate}
                  getAllRooms={getAllRooms}
                />
              </div>
              <div>
                {!spect ? (
                  <Loader />
                ) : (
                  <RoomTable
                    Spect={spect}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setRoomIdToUpdate={setRoomIdToUpdate}
                    getAllRooms={getAllRooms}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
}

export default spectatorDashboard;
