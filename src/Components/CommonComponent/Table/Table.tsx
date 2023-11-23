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
  IconButton,
} from 'technogetic-iron-smart-ui';
import moment from 'moment';
import { TableDataType, TablePropsType } from '@/types/tableTypes';
export interface StudentProfile {
  Course: string;
  Mobile: string;
  Student: string;
  StudentName: string;
  studentID: string;
}

const TableData = ({ data, columns, deleteroom, type, handleEdit }: TablePropsType) => {
  const [sortedData, setSortedData] = useState<TableDataType[] | []>([]);

  // useEffect(() => {
  //   setSortedData(data);
  // }, [data]);
  useEffect(() => {
    if (data) {
      setSortedData(data as TableDataType[]);
    }
  }, [data]);

  function toCamelCase(inputString) {
    return inputString
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join('');
  }

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
        newSortedData = [
          ...sortedData.sort((a: TableDataType, b: TableDataType) =>
            b[newKey].localeCompare(a[newKey], 'fr', { ignorePunctuation: true }),
          ),
        ];
      }

      setSortedData(newSortedData);
    } else if (type === 'ROOMS') {
      if (
        key === 'Created By' ||
        key === 'Game Name' ||
        key === 'Game Type' ||
        key === 'Map Type' ||
        key === 'Version'
      ) {
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

  const getFormattedDateOrTime = (dateAndTime: string | undefined, Type: string) => {
    const momentObj = moment(dateAndTime);
    if (Type === 'Date') {
      const formattedDate = momentObj?.format('M/D/YYYY');
      return formattedDate;
    } else if (Type === 'Time') {
      const formattedTime = momentObj?.format('h:mm A');
      return formattedTime;
    }
  };

  return (
    <>
      <Table className={styles.table_content}>
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {columns?.map((columnName) => (
              <TableHead className={styles.table_head} key={columnName}>
                <div className={styles.filter}>
                  {columnName}
                  <div>
                    <img
                      src="/assests/upArow.svg"
                      alt="filterup"
                      onClick={() => handleSort(columnName, 'upArrow')}
                    ></img>
                    <img
                      src="/assests/downarow.svg"
                      alt="filterdown"
                      onClick={() => handleSort(columnName, 'downArrow')}
                    ></img>
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
          {sortedData?.map((data: TableDataType, index: number) => {
            console.log('data', data);
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
                    {
                      <>
                        <IconButton
                          onClick={() => {
                            if (deleteroom) {
                              deleteroom(data._id);
                            }
                          }}
                        >
                          <img
                            src="/assests/Tabledelete.svg"
                            alt="studentProfileDelete"
                            className={styles.cell_icon}
                          ></img>
                        </IconButton>
                        <IconButton>
                          <img
                            src="/assests/eye.png"
                            alt="studentProfile"
                            className={`${styles.cell_icon} ${styles.eye_icon}`}
                          ></img>
                        </IconButton>
                      </>
                    }
                  </TableCell>
                </TableRow>
              );
            } else if (type === 'SPECTATOR' || type === 'USERS') {
              return (
                <TableRow className={styles.table_rowdata} key={index}>
                  <TableCell className={styles.table_cell}>{data?.fullName}</TableCell>
                  <TableCell className={styles.table_cell}>{data?.userName || '--'}</TableCell>
                  <TableCell className={styles.table_cell}>{data?.email}</TableCell>
                  <TableCell className={styles.table_cell}>
                    <>
                      {type === 'SPECTATOR' && (
                        <IconButton
                          onClick={() => {
                            if (handleEdit) {
                              handleEdit(data);
                            }
                          }}
                        >
                          <img
                            src="/assests/editIcon.svg"
                            alt="studentProfileEdit"
                            className={styles.cell_icon}
                          ></img>
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => {
                          if (deleteroom) {
                            deleteroom(data?.userUuid);
                          }
                          // deleteroom(data?.userUuid);
                        }}
                      >
                        <img
                          src="/assests/Tabledelete.svg"
                          alt="studentProfileDelete"
                          className={styles.cell_icon}
                        ></img>
                      </IconButton>
                    </>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TableData;
