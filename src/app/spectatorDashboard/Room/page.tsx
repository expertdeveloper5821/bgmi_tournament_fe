'use client';
import React, {useEffect, useState} from 'react';
import {Navbar} from '../../../Components/Navbar/Navbar';
import styles from '../../../styles/Spectator.module.scss';
//import SpectatorData, {RoomData} from '../spectatorData/page';
import Form from '../Form/page';
import sendRequest from '../../../services/api/apiServices';
import RequireAuthentication from '../../../utils/requireAuthentication';
//@ts-ignore
import {Table, TableBody, TableCell} from 'technogetic-iron-smart-ui';
//@ts-ignore
import {TableHeader, TableHead, TableRow} from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import Deletespec from '../Deletespec/page';
import Updatespec from '../Updatespec/page';
import CustomPagination from '@/Components/Pagination/Pagination';
import withAuth from '@/Components/HOC/WithAuthHoc';
export interface RoomData {
  roomId: string;
  _id: string;
  password: string;
  gameName: string;
  gameType: string;
  mapType: string;
  version: number;
  highestKill: number;
  lastServival: number;
  thirdWin: number;
  secondWin: number;
  time: string;
  date: string;
  uuid: number;
  createdBy: number;
  updatedAt: number;
  createdAt: number;
  mapImg: string;
}

const Room = () => {
  const [Spect, setSpect] = useState<RoomData[]>([]);

  const columns: string[] = [
    'Room Id',
    'Game Name',
    'Game Type',
    'Map Type',
    'Version',
    'HighestKill',
    'lastServival',
    'ThirdWin',
    'SecondWin',
    'Time',
    'Date',
    'Map Image',
    'Action',
  ];
  const getAllSpectator = async () => {
    const token = localStorage.getItem('jwtToken');
    const spectatorResponse = await sendRequest('room/user-rooms', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });
    setSpect(spectatorResponse.data);
  };

  useEffect(() => {
    getAllSpectator();
  }, []);

  return (
    <RequireAuthentication>
      <div className={styles.main_container}>
        <div className={styles.inner_main_container}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.inner_specter_cls}>
              <h1 className={styles.r_main_title}>Room </h1>
              <Form getAllSpectator={getAllSpectator} />
            </div>
            {/* <SpectatorData
            roomData={roomData}
            columns={columns}
            showAdditionalButton={true}
          /> */}

            <div>
              <Table className={styles.table_content}>
                <TableHeader className={styles.tableHeader}>
                  <TableRow className={styles.tableRow}>
                    {columns?.map((column, index) => (
                      <TableHead
                        className={styles.table_head_sectat}
                        key={index}
                      >
                        <div className={styles.filter}>{column}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                {Spect?.map((spec, index) => (
                  <TableBody key={index}>
                    <TableRow className={styles.table_row_cell}>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.roomId}
                      </TableCell>

                      <TableCell className={styles.tb_cell_body}>
                        {spec.gameName}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.gameType}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.mapType}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.version}
                      </TableCell>
                      <TableCell className={styles.tb_cell_body}>
                        {spec.highestKill}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.lastServival}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.thirdWin}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.secondWin}
                      </TableCell>
                      <TableCell className={styles.el_tb_cell}>
                        {spec.time}
                      </TableCell>
                      <TableCell className={styles.tb_cell_body}>
                        {spec.date}
                      </TableCell>
                      <TableCell className={styles.tb_cell_body}>
                        <Image
                          src={spec.mapImg}
                          alt=""
                          width={30}
                          height={30}
                        />
                      </TableCell>
                      <TableCell className={styles.tb_cell_action}>
                        <Deletespec
                          Id={spec._id}
                          getAllSpectator={getAllSpectator}
                        />
                        <Updatespec
                          updateRoom={Room}
                          roomData={spec}
                          getAllSpectator={getAllSpectator}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
              <CustomPagination data={Spect} />
            </div>
            {/* <TableData
          userData={paginatedData}
          columns={columns}
          showAdditionalButton={true}
        />*/}
            {/* <Pagination currentPage={currentPage} onPageChange={onPageChange} /> */}
          </div>
        </div>
      </div>
    </RequireAuthentication>
  );
};

export default withAuth(Room);
