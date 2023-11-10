import React from 'react';
import styles from '@/styles/Spectator.module.scss';
//@ts-ignore
import { Table, TableBody, TableCell } from 'technogetic-iron-smart-ui';
//@ts-ignore
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { formatDate, formatTime } from '@/Components/CommonComponent/moment';
import Image from 'next/image';
import { specRoomColumns } from '@/utils/constant';
import DeleteSpectatorModal from '@/Components/spectatorDashboard/rooms/DeleteSpectatorModal';
import { setItemToLS } from '@/utils/globalfunctions';
import { GiPodiumWinner } from 'react-icons/gi';
import Link from 'next/link';

const RoomTable = ({ Spect, showModal, setShowModal, setRoomIdToUpdate, getAllSpectator }) => {
  // const router: AppRouterInstance = useRouter();

  const handleRoomID = (id: string, roomUuid: string) => {
    setItemToLS('roomId', id);
    setItemToLS('roomUuid', roomUuid);
  };

  return (
    <Table className={styles.table_content}>
      <TableHeader className={styles.tableHeader}>
        <TableRow className={styles.tableRow}>
          {specRoomColumns?.map((column, index) => (
            <TableHead className={styles.table_head_sectat} key={index}>
              <div className={styles.filter}>{column}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Spect?.map((spec, index) => (
          <TableRow key={index} className={styles.table_row_cell}>
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
              <DeleteSpectatorModal Id={spec._id} getAllSpectator={getAllSpectator} />
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
    </Table>
  );
};

export default RoomTable;
