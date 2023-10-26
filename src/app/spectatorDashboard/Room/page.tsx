'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import Form from '../Form/page';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
//@ts-ignore
import { Table, TableBody, TableCell } from 'technogetic-iron-smart-ui';
//@ts-ignore
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { formatDate, formatTime } from '../../../Components/CommonComponent/moment';
import Image from 'next/image';
import Deletespec from '../Deletespec/page';
import { sendRequest } from '@/utils/axiosInstanse';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { toast } from 'react-toastify';

export interface RoomData {
  dateAndTime: string;
  roomId: string;
  _id: string | number;
  password: string;
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  highestKill: string;
  lastSurvival: string;
  thirdWin: string;
  secondWin: string;
  time: string;
  date: string;
  createdBy: number;
  updatedAt: number;
  createdAt: number;
  entryFee: string;
  mapImg: string;
}

const Room = () => {
  const [Spect, setSpect] = useState<RoomData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [roomIdToUpdate, setRoomIdToUpdate] = useState({});
  const columns: string[] = [
    'Room Id',
    'Game Name',
    'Game Type',
    'Map Type',
    'Version',
    'Highest Kill',
    'Last Survival',
    'Third Win',
    'Second Win',
    'Time',
    'Date',
    'Entry Fee',
    'Action',
  ];
  const getAllSpectator = async () => {
    try {
      const spectatorResponse = await sendRequest('room/user-rooms', {
        method: 'GET',
      });
      setSpect(spectatorResponse.data);
    } catch (error) {
      // Todo fix this
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllSpectator();
  }, []);
  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.inner_specter_cls}>
            <h1 className={styles.r_main_title}>Rooms</h1>
            <Form
              showModal={showModal}
              setShowModal={setShowModal}
              roomIdToUpdate={roomIdToUpdate}
              setRoomIdToUpdate={setRoomIdToUpdate}
            />
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
                {Spect?.map((spec: RoomData) => (
                  <TableRow key={spec._id} className={styles.table_row_cell}>
                    <TableCell className={styles.el_tb_cell}>{spec?.roomId ?? '--'}</TableCell>
                    <TableCell className={styles.tb_cell_body}>{spec?.gameName ?? '--'}</TableCell>
                    <TableCell className={styles.el_tb_cell}>{spec?.gameType ?? '--'}</TableCell>
                    <TableCell className={styles.el_tb_cell}>{spec?.mapType ?? '--'}</TableCell>
                    <TableCell className={styles.el_tb_cell}>{spec?.version ?? '--'}</TableCell>
                    <TableCell className={styles.tb_cell_body}>
                      {spec?.highestKill ?? '--'}
                    </TableCell>
                    <TableCell className={styles.el_tb_cell}>
                      {spec?.lastSurvival ?? '--'}
                    </TableCell>
                    <TableCell className={styles.el_tb_cell}>{spec?.thirdWin ?? '--'}</TableCell>
                    <TableCell className={styles.el_tb_cell}>{spec?.secondWin ?? '--'}</TableCell>
                    <TableCell className={styles.tb_cell_body}>
                      {spec?.dateAndTime
                        ? formatTime({ time: spec.dateAndTime, format: 'LT' })
                        : '--'}
                    </TableCell>

                    <TableCell className={styles.el_tb_cell}>
                      {spec?.dateAndTime
                        ? formatDate({ date: spec.dateAndTime, format: 'DD/MM/YYYY' })
                        : '--'}
                    </TableCell>

                    <TableCell className={styles.el_tb_cell}>{spec?.entryFee ?? '--'}</TableCell>

                    <TableCell className={styles.tb_cell_action}>
                      <div className={styles.flex}>
                        <Deletespec specId={spec?._id} getAllSpectator={getAllSpectator} />
                        <button
                          className={styles.editbtn}
                          onClick={() => {
                            setShowModal(!showModal);
                            setRoomIdToUpdate(spec);
                          }}
                        >
                          {' '}
                          <Image src="assests/update.svg" alt="Image" width={12} height={12} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Room);
