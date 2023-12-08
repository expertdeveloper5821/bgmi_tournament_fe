'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/TableData.module.scss';
//@ts-ignore
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from 'technogetic-iron-smart-ui';
import { TableDataType, TablePropsType } from '@/types/tableTypes';
import { getFormattedDateOrTime, toCamelCase } from '@/utils/commonFunction';
import { FaLongArrowAltDown, FaLongArrowAltUp, FaPlay } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import Pagination from '../Pagination';
import Image from 'next/image';
import { ToggleComponent } from '../ToggleComponent';
import Popup from '../Popup';
import ReactPlayer from 'react-player';

const TableData = ({
  data,
  columns,
  deleteroom,
  type,
  handleEdit,
  handleUpdate,
}: TablePropsType) => {
  const [sortedData, setSortedData] = useState<TableDataType[] | []>([]);
  const [activeFilter, setactiveFilter] = useState<number>(0);
  const filterKeys = ['Created By', 'Game Name', 'Game Type', 'Map Type', 'Version'];
  const [isPopupOpen, setPopupOpen] = useState(false);

  // const openPopup = () => {
  //   setPopupOpen(true);
  // };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const [selectedVideo, setSelectedVideo] = useState<TableDataType | null>(null);

  const openPopup = (video: TableDataType) => {
    setSelectedVideo(video);
    setPopupOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = sortedData.length;
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (data) {
      setSortedData(data as TableDataType[]);
    }
  }, [data]);

  const handleSort = (key: string, arrow: string) => {
    const newKey = toCamelCase(key);
    let newSortedData;
    if (type !== 'ROOMS') {
      if (arrow === 'upArrow') {
        newSortedData = [
          ...sortedData.sort((a: TableDataType, b: TableDataType) =>
            a[newKey].localeCompare(b[newKey], 'fr', { ignorePunctuation: true }),
          ),
        ];
      } else if (arrow === 'downArrow') {
        setactiveFilter(2);
        newSortedData = [
          ...sortedData.sort((a: TableDataType, b: TableDataType) =>
            b[newKey].localeCompare(a[newKey], 'fr', { ignorePunctuation: true }),
          ),
        ];
      }

      setSortedData(newSortedData);
    } else if (type === 'ROOMS') {
      if (filterKeys.includes(key)) {
        if (arrow === 'upArrow') {
          newSortedData = [
            ...sortedData.sort((a: TableDataType, b: TableDataType) =>
              a[newKey].localeCompare(b[newKey], 'fr', { ignorePunctuation: true }),
            ),
          ];
        } else if (arrow === 'downArrow') {
          newSortedData = [
            ...sortedData.sort((a: TableDataType, b: TableDataType) =>
              b[newKey].localeCompare(a[newKey], 'fr', { ignorePunctuation: true }),
            ),
          ];
        }
        setSortedData(newSortedData);
      }
    }
  };

  return (
    <>
      {sortedData.length ? (
        <Table className={styles.table_content}>
          <TableHeader className={styles.tableHeader}>
            <TableRow className={styles.tableRow}>
              {columns?.map((columnName) => (
                <TableHead className={styles.table_head} key={columnName}>
                  <div className={styles.filter}>
                    {columnName}
                    {filterKeys.includes(columnName) && (
                      <div>
                        <FaLongArrowAltUp
                          style={{ color: `${activeFilter === 1 ? '#FF7A00' : ''}` }}
                          onClick={() => {
                            setactiveFilter(1);
                            handleSort(columnName, 'upArrow');
                          }}
                        />
                        <FaLongArrowAltDown
                          style={{ color: `${activeFilter === 2 ? '#FF7A00' : ''}` }}
                          onClick={() => {
                            setactiveFilter(2);
                            handleSort(columnName, 'downArrow');
                          }}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}

              {type !== 'leaderboard' && (
                <TableHead className={styles.table_head}>
                  <div className={styles.filter}>Actions</div>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody className={styles.table_body}>
            {sortedData.slice(startIndex, endIndex)?.map((data: TableDataType, index: number) => {
              if (type === 'ROOMS') {
                return (
                  <TableRow className={styles.table_rowdata} key={index}>
                    <TableCell className={styles.table_cell}>{data?.createdBy}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.roomId}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.password}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.gameName}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.gameType}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.mapType}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.version}</TableCell>
                    <TableCell className={styles.table_cell}>
                      {getFormattedDateOrTime(data?.dateAndTime, 'Time')!}
                    </TableCell>
                    <TableCell className={styles.table_cell}>
                      {getFormattedDateOrTime(data?.dateAndTime, 'Date')!}
                    </TableCell>
                    <TableCell className={styles.table_cell}>
                      <ToggleComponent />
                    </TableCell>
                    <TableCell className={`${styles.table_cell} ${styles.action_td}`}>
                      <RiDeleteBin6Line
                        className={styles.del}
                        onClick={() => deleteroom && deleteroom(data._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              } else if (type === 'SPECTATOR') {
                return (
                  <TableRow className={styles.table_rowdata} key={index}>
                    <TableCell className={styles.table_cell}>{data?.fullName}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.userName || '--'}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.email}</TableCell>
                    <TableCell className={styles.table_cell}>
                      <ToggleComponent />
                    </TableCell>
                    <TableCell className={`${styles.table_cell} ${styles.action_td}`}>
                      <MdEdit
                        className={styles.del}
                        onClick={() => handleEdit && handleEdit(data)}
                      />
                      <RiDeleteBin6Line
                        className={styles.del}
                        onClick={() => deleteroom && deleteroom(data.userUuid)}
                      />
                    </TableCell>
                  </TableRow>
                );
              } else if (type === 'VIDEO' || type === 'VIDEOUSER') {
                return (
                  <TableRow className={styles.table_rowdata} key={index}>
                    {type === 'VIDEO' && (
                      <TableCell className={styles.table_cell}>
                        {typeof data?.createdBy === 'object' && data?.createdBy?.fullName
                          ? data.createdBy.fullName
                          : data?.createdBy || 'Unknown'}
                      </TableCell>
                    )}
                    <TableCell className={`${styles.table_cell} ${styles.table_imgvideo_cell}`}>
                      <Image
                        src={data?.mapImg ? data?.mapImg : '/assests/about.jpg'}
                        className={styles.video_card}
                        alt="Image"
                        width={120}
                        height={75}
                      />
                      <div className={styles.play_button}>
                        <FaPlay className={styles.fa_play_btn} onClick={() => openPopup(data)} />
                      </div>
                    </TableCell>
                    <TableCell className={styles.table_cell}>{data?.title || '--'}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.gameType || '--'} </TableCell>
                    <TableCell className={styles.table_cell}>
                      {getFormattedDateOrTime(data?.dateAndTime, 'Date')!}
                    </TableCell>
                    <TableCell className={styles.table_cell}>
                      {getFormattedDateOrTime(data?.dateAndTime, 'Time')!}
                    </TableCell>
                    <TableCell className={styles.table_cell}>
                      {type === 'VIDEOUSER' && (
                        <MdEdit
                          className={styles.del}
                          onClick={() => handleUpdate && handleUpdate(data)}
                        />
                      )}
                      <RiDeleteBin6Line
                        className={styles.del}
                        onClick={() => deleteroom && deleteroom(data._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              } else if (type === 'USERS') {
                return (
                  <TableRow className={styles.table_rowdata} key={index}>
                    <TableCell className={styles.table_cell}>{data?.fullName}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.userName || '--'}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.email}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.phoneNumber || '--'}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.upiId || '--'}</TableCell>
                    <TableCell className={styles.table_cell}>{'--'}</TableCell>
                    <TableCell className={styles.table_cell}>{'--'}</TableCell>
                    <TableCell className={styles.table_cell}>
                      <ToggleComponent />
                    </TableCell>
                    <TableCell className={`${styles.table_cell} ${styles.action_td}`}>
                      <RiDeleteBin6Line
                        className={styles.del}
                        onClick={() => deleteroom && deleteroom(data.userUuid)}
                      />
                    </TableCell>
                  </TableRow>
                );
              } else if (type === 'leaderboard') {
                return (
                  <TableRow className={styles.table_rowdata} key={index}>
                    <TableCell className={styles.table_cell}>{data?.teamName || ''}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.totalPoints || 0}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.matchType || 'N/A'}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.totalWins || 0}</TableCell>
                    <TableCell className={styles.table_cell}>{data?.totalLosses || 0}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Table>
      ) : (
        <h1 className={styles.no_data_found_heading}>No data found</h1>
      )}

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        dynamicClass={styles.sec_inner_popup}
        CloseBtn={styles.video_popup_del}
        MainClose={styles.main_close_btn}
      >
        {selectedVideo && (
          <div>
            <ReactPlayer
              className={styles.react_player}
              url={selectedVideo?.videoLink}
              controls={true}
            />
          </div>
        )}
      </Popup>
    </>
  );
};

export default TableData;
