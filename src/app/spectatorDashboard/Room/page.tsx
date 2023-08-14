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
import Deletespec from '../Deletespec/page';
import UpdateRoom from '../Updatespec/page';
export interface RoomData {
  roomId: string;
  _id: string;
  password: string;
  gameName: string;
  gameType: number;
  mapType: string;
  version: number;
  highestKill: number;
  lastServival: number;
  thirdWin: number;
  secondWin: number;
  time: string;
  uuid: number;
  createdBy: number;
  updatedAt: number;
  createdAt: number;
}

const Room = () => {
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const columns: string[] = [
    'roomId',
    'password',
    'gameName',
    'gameType',
    'mapType',
    'createdBy',
    'createdAt',
  ];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [Spect, setSpect] = useState<RoomData[]>([]);
  const rowPerPage = 8;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const getAllSpectator = async () => {
      const token = localStorage.getItem('jwtToken');
      const spectatorResponse = await sendRequest('room/user-rooms', {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      });
      setSpect(spectatorResponse.data);
    };
    getAllSpectator();
  }, []);

  // const handleUpdate = (updatedRoom: any) => {
  //   // Update the Spect state with the updated room data
  //   const updatedSpect = Spect.map((spec) => {
  //     if (spec._id === updatedRoom._id) {
  //       return updatedRoom;
  //     }
  //     return spec;
  //   });

  //   setSpect(updatedSpect);
  // };
  return (
    <RequireAuthentication>
      <div className={styles.main_container}>
        <div className={styles.inner_main_container}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.inner_specter_cls}>
              <h1 className={styles.r_main_title}>Room </h1>
              <Form />
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
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>RoomId</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>gameName</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>gameType</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>mapType</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>version</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>highestKill</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>lastServival</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>thirdWin</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>secondWin</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>time</div>
                    </TableHead>
                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}> createdBy</div>
                    </TableHead>

                    <TableHead className={styles.table_head}>
                      <div className={styles.filter}>action</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {Spect?.map((spec: any, index: number) => (
                  <TableBody className={styles.table_body} key={index}>
                    <TableCell> {spec.roomId}</TableCell>
                    <TableCell> {spec.gameName}</TableCell>
                    <TableCell> {spec.gameType}</TableCell>
                    <TableCell> {spec.mapType}</TableCell>
                    <TableCell> {spec.version}</TableCell>
                    <TableCell> {spec.highestKill}</TableCell>
                    <TableCell> {spec.lastServival}</TableCell>
                    <TableCell> {spec.thirdWin}</TableCell>
                    <TableCell>{spec.secondWin}</TableCell>
                    <TableCell> {spec.time}</TableCell>
                    <TableCell> {spec.uuid}</TableCell>
                    <TableCell>{spec.createdBy}</TableCell>
                    <TableCell>
                      <Deletespec Id={spec._id} />
                    </TableCell>
                    <TableCell>
                      <UpdateRoom roomData={spec} />
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
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

export default Room;
