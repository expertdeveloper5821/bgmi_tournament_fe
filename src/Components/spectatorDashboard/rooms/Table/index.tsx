import React, { useState } from 'react';
import styles from '@/styles/TableData.module.scss';

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
import { useRouter } from 'next/navigation';
import Popup from '@/Components/CommonComponent/Popup';

const RoomTable = ({ Spect, showModal, setShowModal, setRoomIdToUpdate, getAllRooms }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = Spect.length;
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const router = useRouter();

  const handleRoomID = (id: string, roomUuid: string) => {
    setItemToLS('roomId', id);
    setItemToLS('roomUuid', roomUuid);
  };

  // const handleButtonEdit = () => {
  //   router.push('/spectatorDashboard/Matchhistory')
  // }

  const handleButtonPostWinners = (uuid: string) => {
    router.push(`/spectatorDashboard/Matchhistorydetails?id=${uuid}`);
  };
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Table className={styles.table_content}>
      <TableHeader className={styles.tableHeader}>
        <TableRow className={styles.tableRow}>
          {specRoomColumns?.map((column) => (
            <TableHead className={styles.table_head} key={column}>
              <div className={styles.filter}>{column}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className={styles.table_body}>
        {Spect?.slice(startIndex, endIndex)?.map((spec) => (
          <TableRow key={spec._id} className={styles.table_rowdata}>
            <TableCell className={styles.el_tb_cell}>{spec?.roomId ?? '--'}</TableCell>
            <TableCell className={styles.tb_cell_body}>{spec?.gameName ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.gameType ?? '--'}</TableCell>

            <TableCell className={styles.el_tb_cell}>
              <Image
                className={styles.room_image_cls}
                src={spec?.mapImg ? spec?.mapImg : '/assests/about.jpg'}
                alt="Image"
                width={120}
                height={75}
              />
              <div className={styles.map_type_imgtxt}> {spec?.mapType ?? '--'}</div>
            </TableCell>
            <TableCell className={styles.el_tb_cell}>{spec?.version ?? '--'}</TableCell>
            <TableCell className={styles.el_tb_cell}>
              <p className={styles.winner_pop_icon} key={spec._id} onClick={openPopup}>
                <Image src="/assests/win.svg" alt="Image" width={30} height={30} />
              </p>

              <Popup
                key={spec._id}
                isOpen={isPopupOpen}
                onClose={closePopup}
                dynamicClass={styles.inner_pop_sec}
                CloseBtn={styles.close_button}
              >
                <div className={styles.prize_table}>
                  <h1 className={styles.pize_heading}>Winning Prize Pool</h1>
                </div>
                <p className={styles.span_cell}>
                  Highest Kill:<span className={styles.span_cell_rs}>₹</span>
                  {spec?.highestKill ?? '--'}
                </p>
                <p className={styles.span_cell}>
                  last Survival:<span className={styles.span_cell_rs}>₹</span>
                  {spec?.lastSurvival ?? '--'}
                </p>
                <p className={styles.span_cell}>
                  second Win:<span className={styles.span_cell_rs}>₹</span>
                  {spec?.secondWin ?? '--'}
                </p>
                <p className={styles.span_cell}>
                  Third Win:<span className={styles.span_cell_rs}>₹</span>
                  {spec?.thirdWin ?? '--'}
                </p>
              </Popup>
            </TableCell>
            <TableCell className={styles.tb_cell_body}>
              {spec?.dateAndTime ? (
                <>
                  {formatTime({ time: spec.dateAndTime, format: 'h:mm A' })} <br />
                  {formatDate({ date: spec.dateAndTime, format: 'DD/MM/YYYY' })}
                </>
              ) : (
                '--'
              )}
            </TableCell>
            <TableCell className={styles.el_tb_cell}>₹ {spec?.entryFee ?? '--'}</TableCell>

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
            {/* <TableCell>
              <div>
                <button className={styles.tooltip} data-title="Match History" onClick={handleButtonEdit}>
                  <Image src="/assests/trophy.svg" alt="Image" width={22} height={22} />
                </button>
              </div>
            </TableCell> */}
            <TableCell>
              <div>
                <button className={styles.video} onClick={() => handleButtonPostWinners(spec._id)}>
                  <Image src="/assests/postvideo.svg" alt="Image" width={22} height={22} />
                </button>
              </div>
            </TableCell>
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
