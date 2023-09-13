'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import Form from '../Form/page';
import RequireAuthentication from '../../../utils/requireAuthentication';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
//@ts-ignore
import { Table, TableBody, TableCell } from 'technogetic-iron-smart-ui';
//@ts-ignore
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import Deletespec from '../Deletespec/page';
import Updatespec from '../Updatespec/page';
import { sendRequest } from '@/utils/axiosInstanse';
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
  // uuid: number; //Not Available in response
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
    // 'Map Image',
    'Action',
  ];
  const getAllSpectator = async () => {
    try {
      const spectatorResponse = await sendRequest('room/user-rooms', {
        method: 'GET',
      });
      console.log('check user ==>', spectatorResponse);
      setSpect(spectatorResponse.data);
    } catch (error: any) {
      console.log('check error', error);
    }
  };

  useEffect(() => {
    getAllSpectator();
  }, []);

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.inner_main_container}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <div className={styles.inner_specter_cls}>
                <h1 className={styles.r_main_title}>Room </h1>
                <Form getAllSpectator={getAllSpectator} />
              </div>

              <div>
                <Table className={styles.table_content}>
                  <TableHeader className={styles.tableHeader}>
                    <TableRow className={styles.tableRow}>
                      {columns?.map((column, index) => (
                        <TableHead className={styles.table_head_sectat} key={index}>
                          <div className={styles.filter}>{column}</div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {Spect?.map((spec: any, index) => (
                      <TableRow key={index} className={styles.table_row_cell}>
                        <TableCell className={styles.el_tb_cell}>{spec?.roomId ?? '--'}</TableCell>

                        <TableCell className={styles.tb_cell_body}>
                          {spec?.gameName ?? '--'}
                        </TableCell>
                        <TableCell className={styles.el_tb_cell}>
                          {spec?.gameType ?? '--'}
                        </TableCell>
                        <TableCell className={styles.el_tb_cell}>{spec?.mapType ?? '--'}</TableCell>
                        <TableCell className={styles.el_tb_cell}>{spec?.version ?? '--'}</TableCell>
                        <TableCell className={styles.tb_cell_body}>
                          {spec?.highestKill ?? '--'}
                        </TableCell>
                        <TableCell className={styles.el_tb_cell}>
                          {spec?.lastServival ?? '--'}
                        </TableCell>
                        <TableCell className={styles.el_tb_cell}>
                          {spec?.thirdWin ?? '--'}
                        </TableCell>
                        <TableCell className={styles.el_tb_cell}>
                          {spec?.secondWin ?? '--'}
                        </TableCell>
                        <TableCell className={styles.el_tb_cell}>{spec?.time ?? '--'}</TableCell>
                        <TableCell className={styles.tb_cell_body}>{spec?.date ?? '--'}</TableCell>
                        {/* <TableCell className={styles.tb_cell_body}>
                          <Image
                            src={spec?.mapImg}
                            alt="mapImage"
                            width={30}
                            height={30}
                          />
                        </TableCell> */}
                        <TableCell className={styles.tb_cell_action}>
                          <Deletespec Id={spec._id} getAllSpectator={getAllSpectator} />
                          <Updatespec
                            updateRoom={Room}
                            roomData={spec}
                            getAllSpectator={getAllSpectator}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
};

export default withAuth(Room);
