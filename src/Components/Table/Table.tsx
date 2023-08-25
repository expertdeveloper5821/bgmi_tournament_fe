'use client';
import { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';
import styles from '../../styles/TableData.module.scss';
import Image from 'next/image';
//@ts-ignore
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
} from 'technogetic-iron-smart-ui';

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

  const { roomData, userData, teamData, spectatorData } = props;
  const [sortedData, setSortedData] = useState<TableDataType[]>([]);
  const [isDescending, setIsDescending] = useState(false);
  const [sortKey, setSortKey] = useState('');






  useEffect(() => {
    const updateSortedData = () => {
      if (window.location.href.includes('users')) {
        setSortedData(userData);
        console.log("users", sortedData)
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
      console.error('Error deleting room:', error);

    }
  };

  console.log('sortedData type:', typeof sortedData);

  return (
    <div>
      <Table className={styles.table_content}>
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {props.columns.map((columnName, index) => (
              <TableHead className={styles.table_head} key={index}>
                <div className={styles.filter}>
                  {columnName}
                  <div>
                    <Image
                      src="/assests/upArrow.svg"
                      alt="filterup"
                      width={10}
                      height={10}
                      onClick={() => handleSort(columnName as keyof TableDataType, 'room')}
                    ></Image>
                    <Image
                      src="/assests/downArrow.svg"
                      alt="filterdown"
                      width={10}
                      height={10}
                      onClick={() => handleSort(columnName as keyof TableDataType, 'room')}
                    ></Image>
                  </div>
                </div>
              </TableHead>
            ))}
            <TableHead className={styles.table_head}>
              <div className={styles.filter}>Actions</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className={styles.table_body}>
          {sortedData?.map((elm: any, index: number) => {
            console.log('sortedData type:', typeof sortedData);
            const additionalImagePath = props.showAdditionalButton
              ? './assests/StudentProfile.svg'
              : null;


            const deleteroomId = (_id: any) => {
              console.log("deleteroomId=====>dddqq", deleteroomId);

            }

            return (
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

                {elm.mapImg && (
                  <TableCell className={styles.table_cell}>
                    <Image src={elm.mapImg} alt='mapImage' width={30} height={30} />
                  </TableCell>
                )}
                {elm.version && (
                  <TableCell className={styles.table_cell}>
                    {elm.version}
                  </TableCell>
                )}

                {elm.time && (
                  <TableCell className={styles.table_cell}>
                    {elm.time}
                  </TableCell>
                )}
                {elm.date && (
                  <TableCell className={styles.table_cell}>
                    {elm.date}
                  </TableCell>
                )}
                {elm.lastServival && (
                  <TableCell className={styles.table_cell}>
                    {elm.lastServival}
                  </TableCell>
                )} {elm.highestKill && (
                  <TableCell className={styles.table_cell}>
                    {elm.highestKill}
                  </TableCell>
                )}
                {elm.secondWin && (
                  <TableCell className={styles.table_cell}>
                    {elm.secondWin}
                  </TableCell>
                )}
                {elm.thirdWin && (
                  <TableCell className={styles.table_cell}>
                    {elm.thirdWin}
                  </TableCell>
                )}


                {elm.createdAt && (
                  <TableCell className={styles.table_cell}>
                    {elm.createdAt}
                  </TableCell>
                )}

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
                )}{' '}
                {/* {elm.password && (
                  <TableCell className={styles.table_cell}>
                    {elm.password}
                  </TableCell>
                )} */}

                {elm.uuid && (
                  <TableCell className={styles.table_cell}>
                    {elm.uuid}
                  </TableCell>
                )}{' '}
                {elm.leadPlayer && (
                  <TableCell className={styles.table_cell}>
                    {elm.leadPlayer}
                  </TableCell>
                )}{' '}
                {/* {elm.teammates && (
                  <TableCell className={styles.table_cell}>
                    {elm.teammates}
                  </TableCell>
                )} */}
                {elm.registeredGame && (
                  <TableCell className={styles.table_cell}>
                    {elm.registeredGame}
                  </TableCell>
                )}

                <TableCell className={styles.table_cell}>
                  {additionalImagePath ? (
                    <IconButton>
                      {props.imageIcon === 'spectator' ?
                        <div className={styles.iconWrapper}>

                          {/* <Image
                            src="/assests/studentprofile.svg"
                            alt="studentProfileView"
                            width={15}
                            height={15}
                            className={styles.table_icon}
                          />
 */}

                          <Image
                            src="/assests/Tabledelete.svg"
                            alt="studentProfileView"
                            width={15}
                            height={15}
                            className={styles.table_icon}
                            // onClick={() => deleteroomId(elm._id)}
                            onClick={() => props.deleteroomId(elm._id || elm.userUuid)}
                          />

                          <Image
                            src="/assests/TableEdit.svg"
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
                          <Image
                            src="/assests/Tabledelete.svg"
                            alt="studentProfileView"
                            width={15}
                            height={15}
                            className={styles.table_icon}
                            // onClick={() => deleteroomId(elm._id)}
                            onClick={() => props.deleteroomId(elm._id || elm.userUuid)}
                          />
                        </div>
                      }

                    </IconButton>
                  ) : (
                    <>
                      {/* <IconButton onClick={() => handleEdit(elm)}>
                        <Image
                          src="/assests/TableEdit.svg"
                          alt="studentProfileEdit"
                          width={10}
                          height={10}
                          className={styles.cell_icon}
                        ></Image>
                      </IconButton>
                      <IconButton onClick={() => handleDelete(elm)}>
                        <Image
                          src="/assests/Tabledelete.svg"
                          alt="studentProfileDelete"
                          width={10}
                          height={10}
                          className={styles.cell_icon}
                        ></Image>
                      </IconButton> */}
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div >
  );
};

export default TableData;

