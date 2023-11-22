import React, { useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
//@ts-ignore
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from 'technogetic-iron-smart-ui';
import { formatDate, formatTime } from '@/Components/CommonComponent/moment';
import Image from 'next/image';
import { specRoomColumns } from '@/utils/constant';
import DeleteSpectatorModal from '@/Components/spectatorDashboard/rooms/DeleteSpectatorModal';
import { setItemToLS } from '@/utils/globalfunctions';
import { GiPodiumWinner } from 'react-icons/gi';
import Link from 'next/link';
import Pagination from '@/Components/CommonComponent/Pagination';

const RoomTable = ({ Spect, showModal, setShowModal, setRoomIdToUpdate, getAllRooms }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = Spect.length;
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleRoomID = (id: string, roomUuid: string) => {
    setItemToLS('roomId', id);
    setItemToLS('roomUuid', roomUuid);
  };

  return (
    <Table className={styles.table_content}>
      <TableHeader className={styles.tableHeader}>
        <TableRow className={styles.tableRow}>
          {specRoomColumns?.map((column) => (
            <TableHead className={styles.table_head_sectat} key={column}>
              <div className={styles.filter}>{column}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Spect?.slice(startIndex, endIndex)?.map((spec) => (
          <TableRow key={spec.roomId} className={styles.table_row_cell}>
            <TableCell className={styles.el_tb_cell}>{spec?.roomId ?? '--'}</TableCell>
            <TableCell className={styles.tb_cell_body}>{spec?.gameName ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.gameType ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.mapType ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.version ?? '--'}</TableCell>
            <TableCell className={styles.tb_cell_body}>{spec?.highestKill ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.lastSurvival ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.thirdWin ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.secondWin ?? '--'}</TableCell>
            <TableCell className={styles.tb_cell_body}>
              {spec?.dateAndTime ? formatTime({ time: spec.dateAndTime, format: 'LT' }) : '--'}
            </TableCell>

            <TableCell className={styles.tb_cell_body}>
              {spec?.dateAndTime
                ? formatDate({ date: spec.dateAndTime, format: 'DD/MM/YYYY' })
                : '--'}
            </TableCell>

            <TableCell className={styles.el_tb_cell}>{spec?.entryFee ?? '--'}</TableCell>

            <TableCell className={styles.tb_cell_action}>
              <DeleteSpectatorModal Id={spec._id} getAllRooms={getAllRooms} />
              <div
                onClick={() => {
                  setShowModal(!showModal);
                  setRoomIdToUpdate(spec);
                }}
              >
                <Image src="assests/update.svg" alt="Image" width={22} height={14} />
              </div>
            </TableCell>
            <TableCell className={styles.winnder_btn}>
              {!spec.winnerUuid ? (
                <Link href={'/spectatorDashboard/Postwinners'}>
                  <div onClick={() => handleRoomID(spec._id, spec.roomUuid)}>
                    <Image src="assests/add.svg" alt="Image" width={22} height={22} />
                  </div>
                </Link>
              ) : (
                <Link href={'/spectatorDashboard/Postwinners'}>
                  <span
                    className={styles.edit_btn}
                    onClick={() => handleRoomID(spec._id, spec.roomUuid)}
                  >
                    Edit
                  </span>
                </Link>
              )}
            </TableCell>
            <TableCell className={styles.tb_cell_action}>
              {spec.winnerUuid ? (
                <Link href="/spectatorDashboard/Matchhistory">
                  <span
                    onClick={() => handleRoomID(spec._id, spec.roomUuid)}
                    className={styles.winnder_btn}
                  >
                    <GiPodiumWinner className={styles.winner} />
                  </span>
                </Link>
              ) : (
                <span className={styles.noInfoBtn}>NA</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Table>
  );
};

export default RoomTable;
