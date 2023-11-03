import React, { useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
//@ts-ignore
import { Table, TableBody, TableCell } from 'technogetic-iron-smart-ui';
//@ts-ignore
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { formatDate, formatTime } from '@/Components/CommonComponent/moment';
import DeleteSpectator from '@/app/spectatorDashboard/deleteSpectator/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { specRoomColumns } from '@/utils/constant';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

const RoomTable = ({ Spect, showModal, setShowModal, setRoomIdToUpdate, getAllSpectator }) => {
  const router: AppRouterInstance = useRouter();
  const [isWinner, setIsWinnder] = useState<boolean>(true);

  const handleRedirectPostWinner = () => {
    router.push('/spectatorDashboard/Postwinners');
  };

  const handleEditMatch = () => {
    router.push('/spectatorDashboard/Matchhistory');
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
              <DeleteSpectator Id={spec._id} getAllSpectator={getAllSpectator} />
              <div
                onClick={() => {
                  setShowModal(!showModal);
                  setRoomIdToUpdate(spec);
                }}
              >
                <Image src="assests/update.svg" alt="Image" width={22} height={14} />
              </div>
            </TableCell>
            <TableCell onClick={() => setIsWinnder(!isWinner)} className={styles.winnder_btn}>
              {isWinner ? (
                <div onClick={handleRedirectPostWinner}>
                  <Image src="assests/add.svg" alt="Image" width={22} height={22} />
                </div>
              ) : (
                <span className={styles.edit_btn} onClick={handleEditMatch}>
                  Edit
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RoomTable;
