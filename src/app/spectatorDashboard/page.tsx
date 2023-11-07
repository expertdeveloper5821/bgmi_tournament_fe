'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { sendRequest } from '@/utils/axiosInstanse';
import RoomTable from '@/Components/spectatorDashboard/rooms/Table';
import { SpectatorRoomDataType } from '@/types/roomsTypes';
import CreateRoomForm from '@/Components/spectatorDashboard/rooms/RoomForm';

function spectatorDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [roomIdToUpdate, setRoomIdToUpdate] = useState({});
  const [Spect, setSpect] = useState<SpectatorRoomDataType[]>([]);

  const getAllSpectator = async () => {
    const spectatorResponse = await sendRequest('room/user-rooms');
    setSpect(spectatorResponse?.data);
  };

  useEffect(() => {
    return () => {
      getAllSpectator();
    };
  }, []);

  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div>
            <div className={styles.inner_specter_cls}>
              <h1 className={styles.r_main_title}>Rooms</h1>
              <CreateRoomForm
                showModal={showModal}
                setShowModal={setShowModal}
                roomIdToUpdate={roomIdToUpdate}
                setRoomIdToUpdate={setRoomIdToUpdate}
                callSpecatator={() => getAllSpectator()}
              />
            </div>
            <div>
              <RoomTable
                Spect={Spect}
                showModal={showModal}
                setShowModal={setShowModal}
                setRoomIdToUpdate={setRoomIdToUpdate}
                getAllSpectator={getAllSpectator}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default spectatorDashboard;
