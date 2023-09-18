'use client';
import { useState, useEffect } from 'react';
// import { useRouter, NextRouter } from 'next/router';
import styles from '../../styles/TableData.module.scss';
import Image from 'next/image';
import { formatDate, formatTime } from '../CommonComponent/moment';
//@ts-ignore
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton
} from 'technogetic-iron-smart-ui';
// import Accordion from '../CommonComponent/TeammatesDropdownModal';
// import TeammatesDropdownModal from '../CommonComponent/TeammatesDropdownModal';

export interface UserData {
  fullName: string;
  userName: string;
  email: string;
  // role?: [];
}
export interface RoomData {
  createdBy: string;
  roomId: string;
  password: string;
  gameName: string;
  gameType: number;
  mapType: string;
  mapImg: string;
  version: string;
  time: any;
  date: number;
  lastServival: number;
  highestKill: number;
  secondWin: number;
  thirdWin: number;
  createdAt: number;

}

export interface SpectatorData {
  roomId: any;
  fullName: string;
  userName: any;
  email: any;
  // password: any;
}
interface StudentProfilePropsType {
  updateSpectatorByid: any;
  setSetSpectatorId: any;
  setModal: any;
  deleteroomId(_id: string): unknown;
  showAdditionalButton?: boolean;
  columns: string[];
  userData: UserData[];
  roomData: RoomData[];
  spectatorData: SpectatorData[];
  teamData: RoomData[];
  editDetails?: (details: any) => void;
  imageIcon: string
}

type TableDataType = UserData | RoomData | SpectatorData;

interface StudentData {
  [key: string]: string;
}

const TableData = (props: StudentProfilePropsType) => {
  const [deletModal, setDeleteModal] = useState(false); //modal
  const { roomData, userData, teamData, spectatorData } = props;
  const [sortedData, setSortedData] = useState<TableDataType[]>([]);
  const [isDescending, setIsDescending] = useState(false);
  const [sortKey, setSortKey] = useState('');
  const [isShowData, setIsShowData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  let colAdded = [
    'Last Servival',
    'Highest Kill',
    'Second Win',
    'Third Win',
  ]

  useEffect(() => {
    const updateSortedData = () => {
      if (window.location.href.includes('users')) {
        setSortedData(userData);
      } else if (window.location.href.includes('teams')) {
        setSortedData(teamData);
      } else if (window.location.href.includes('room')) {
        setSortedData(roomData);
      } else if (window.location.href.includes('spectator')) {
        setSortedData(spectatorData)
      }
    };
    updateSortedData();
  }, [props]);

  const handleSort = (
    key: keyof TableDataType,
    dataType: 'room' | 'user' | 'spectator'
  ) => {
    let sorted = [];

    if (sortKey === key) {
      sorted = [...sortedData].reverse();
      setIsDescending(!isDescending);
    } else {
      sorted = [...sortedData].sort((a: TableDataType, b: TableDataType) => {
        const aValue = dataType === 'room' ? a[key] : a[key];
        const bValue = dataType === 'room' ? b[key] : b[key];

        if (aValue < bValue) return isDescending ? 1 : -1;
        if (aValue > bValue) return isDescending ? -1 : 1;
        return 0;
      });
      setIsDescending(false);
    }
    setSortedData(sorted);
    setSortKey(String(key));
  };

  const handleDelete = async (_id: string) => {
    try {
      await props.deleteroomId(_id);
    } catch (error) {
    }
  };

  const sortableColumnsMap = new Map<string, boolean>([
    ['Created By', true],
    ['Game Name', true],
    ['Time', true],
    ['Date', true],
    ['FullName', true],
    ['UserName', true],
    ['Email', true]
  ]);



  return (
    <div style={isShowData ? { display: 'flex' } : undefined}  >
      <Table style={isShowData ? { flex: "1 1 80%" } : undefined} className={styles.table_content}>
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {props.columns.map((columnName, index) => (
              <TableHead className={styles.table_head} key={index}>
                <div className={styles.header_room}>
                  <div className={styles.filter}>
                    <h1 className={styles.room_header}>  {columnName}</h1>
                    {sortableColumnsMap.get(columnName) && (
                      <div className={styles.arrow}>
                        <Image
                          src="/assests/upArow.svg"
                          alt="filterup"
                          width={10}
                          height={10}
                          onClick={() => handleSort(columnName as keyof TableDataType, 'room' || 'spectator')}
                        ></Image>
                        <Image
                          src="/assests/downarow.svg"
                          alt="filterdown"
                          width={10}
                          height={10}
                          onClick={() => handleSort(columnName as keyof TableDataType, 'room' || 'spectator')}
                        ></Image>
                      </div>
                    )}
                  </div>
                </div>
              </TableHead>
            ))}
            <TableHead className={styles.table_head}>
              {!window.location.href.includes('teams') && (
                <div className={styles.filter}>Actions</div>)}
            </TableHead>
            {/* {isModalOpen ?
              // <div className={styles.main_del_sec}>
              //   <div className={styles.inner_del_sec}>

              //   </div>
              // </div> : ""} */}
            {isShowData && colAdded.map(col =>
              <TableHead className={styles.table_head}>
                <div className={styles.filter}>{col}</div>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody className={styles.table_body}>
          {sortedData?.map((elm: any, index: number) => {
            const teammateKey = `teammate-${index}`;
            const additionalImagePath = props.showAdditionalButton
              ? './assests/StudentProfile.svg'
              : null;

            const deleteroomId = (_id: any) => {
            }
            return (
              <>
                <TableRow className={styles.table_rowdata} key={index}>
                  {elm.createdBy && (
                    <TableCell className={styles.table_cell}>
                      {elm.createdBy}
                    </TableCell>
                  )}
                  {elm.roomId && (
                    <TableCell className={styles.table_cell}>
                      {elm.roomId}
                    </TableCell>
                  )}
                  {elm.password && (
                    <TableCell className={styles.table_cell}>
                      {elm.password}
                    </TableCell>
                  )}
                  {elm.gameName && (
                    <TableCell className={styles.table_cell}>
                      {elm.gameName}
                    </TableCell>
                  )}
                  {elm.gameType && (
                    <TableCell className={styles.table_cell}>
                      {elm.gameType}
                    </TableCell>
                  )}
                  {elm.mapType && (
                    <TableCell className={styles.table_cell}>
                      {elm.mapType}
                    </TableCell>
                  )}
                  {/* {elm.mapImg && (
                    <TableCell className={styles.table_cell}>
                      <Image src={elm.mapImg} alt='mapImage' width={30} height={30} />
                    </TableCell>
                  )} */}
                  {elm.version && (
                    <TableCell className={styles.table_cell}>
                      {elm.version}
                    </TableCell>
                  )}
                  {/* {elm.time && (
                    <TableCell className={styles.table_cell}>
                      {formatTime({ time: elm.time, format: 'LT' })}
                    </TableCell>
                  )} */}
                  {window.location.href.includes("spectator") ? "" :
                    <TableCell className={styles.table_cell}>
                      {elm.time || "--"}
                    </TableCell>
                  }
                  {window.location.href.includes("spectator") ? "" :
                    <TableCell className={styles.table_cell}>
                      {formatDate({ date: elm.date, format: 'l' })}
                    </TableCell>
                  }
                  {elm.fullName && (
                    <TableCell className={styles.table_cell}>
                      {elm.fullName}
                    </TableCell>
                  )}
                  {elm.userName && (
                    <TableCell className={styles.table_cell}>
                      {elm.userName}
                    </TableCell>
                  )}
                  {elm.email && (
                    <TableCell className={styles.table_cell}>
                      {elm.email}
                    </TableCell>
                  )}
                  {elm.leadPlayer && (
                    <TableCell className={styles.table_cell}>
                      {elm.leadPlayer}
                    </TableCell>
                  )}{' '}
                  {elm.registeredGame && (
                    <TableCell className={styles.table_cell}>
                      {elm.registeredGame}
                    </TableCell>
                  )}
                  {elm.teammates && <TableCell className={styles.table_cell}>
                    {elm.teammates.length}
                  </TableCell>}
                  {elm.teammates && (
                    <TableCell className={styles.table_cell}>
                      {/* <Accordion>
                        <TeammatesDropdownModal teammates={elm.teammates} onClose={() => { }} />
                      </Accordion> */}
                    </TableCell>
                  )}
                  <TableCell className={styles.table_cell}>
                    {additionalImagePath ? (
                      <IconButton>
                        {props.imageIcon === 'spectator' ?
                          <div className={styles.iconWrapper}>
                            <Image
                              src="/assests/Tabledeleted.svg"
                              alt="studentProfileView"
                              width={15}
                              height={15}
                              className={styles.table_icon}
                              // onClick={() => deleteroomId(elm._id)}
                              onClick={() => props.deleteroomId(elm._id || elm.userUuid)}
                            />
                            <Image
                              src="/assests/update.svg"
                              alt="studentProfileEdit"
                              width={15}
                              height={15}
                              className={styles.cell_icon}
                              onClick={() => {
                                props.setSetSpectatorId(elm)
                                props.setModal(true)
                                props.updateSpectatorByid(elm.userUuid)
                              }
                              }
                            />
                          </div>
                          :
                          <div className={styles.iconWrapper}>
                            {!window.location.href.includes('teams') && (
                              <div className={styles.showdata}>
                                <div onClick={() => setDeleteModal(true)}>
                                  <Image
                                    src="/assests/Tabledeleted.svg"
                                    alt="studentProfileView"
                                    width={15}
                                    height={15}
                                    className={styles.table_icon}
                                  // onClick={() => props.deleteroomId(elm._id || elm.userUuid)}
                                  />
                                </div>
                                <div onClick={() => setIsModalOpen(true)}>
                                  <div onClick={() => setIsShowData(!isShowData)}><Image src="/assests/eye.png" alt='show' width={15} height={15} /></div></div>
                              </div>
                            )}
                            {deletModal ? (
                              <div className={styles.main_del_sec}>
                                <div className={styles.inner_del_sec}>
                                  <h4 className={styles.del_title}>Delete</h4>
                                  <p className={styles.sec_heading}>
                                    Are you sure want to delete this room?
                                  </p>
                                  <div className={styles.del_btn_sec}>
                                    <button className={styles.dele_btn} onClick={() => {
                                      setDeleteModal(false)
                                      props.deleteroomId(elm._id || elm.userUuid)
                                    }}>
                                      Delete
                                    </button>
                                    <button
                                      className={styles.canc_btn}
                                      onClick={() => setDeleteModal(false)}
                                    >
                                      cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        }
                      </IconButton>
                    ) : (
                      <>
                      </>
                    )}
                  </TableCell>
                  {isShowData && elm.lastServival && (
                    <TableCell className={styles.table_cell}>
                      {elm.lastServival}
                    </TableCell>
                  )}
                  {isShowData && elm.highestKill && (
                    <TableCell className={styles.table_cell}>  <Image
                      src="/assests/rupee-icon.svg"
                      alt="studentProfileView"
                      width={11}
                      height={11}
                    /> &nbsp;
                      {elm.highestKill}
                    </TableCell>
                  )}
                  {isShowData && elm.secondWin && (
                    <TableCell className={styles.table_cell}>  <Image
                      src="/assests/rupee-icon.svg"
                      alt="studentProfileView"
                      width={11}
                      height={11}
                    />&nbsp;
                      {elm.secondWin}
                    </TableCell>
                  )}
                  {isShowData && elm.thirdWin && (
                    <TableCell className={styles.table_cell}>
                      <Image
                        src="/assests/rupee-icon.svg"
                        alt="studentProfileView"
                        width={11}
                        height={11}
                      />
                      {elm.thirdWin}
                    </TableCell>
                  )}
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>

    </div >
  );
};

export default TableData;



