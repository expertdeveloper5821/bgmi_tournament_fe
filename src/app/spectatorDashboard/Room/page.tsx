'use client';
import TableData from '@/Components/Table/Table';
import React, {useEffect, useState} from 'react';
import {Navbar} from '../../../Components/Navbar/Navbar';
//import styles from '../../../styles/Dashboard.module.scss';
import styles from '../../../styles/Spectator.module.scss';
import {Pagination} from 'technogetic-iron-smart-ui';
import Form from '../Form/page';
//import RequireAuthentication from '../../../utils/requireAuthentication';
import sendRequest from '../../../services/api/apiServices';

const Room = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [Spect, setSpect] = useState('');
  const rowPerPage = 8;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const getAllSpectator = async () => {
      const token = localStorage.getItem('jwtToken');
      const spectatorResponse = await sendRequest('room/rooms', {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      });
      setSpect(spectatorResponse.data);
      console.log('check', spectatorResponse.data);
    };

    getAllSpectator();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.inner_specter_cls}>
            <h1 className={styles.r_main_title}>Room </h1>
            <Form />
          </div>

          {/* <TableData
          userData={paginatedData}
          columns={columns}
          showAdditionalButton={true}
        />*/}
          <Pagination currentPage={currentPage} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
};

export default Room;
