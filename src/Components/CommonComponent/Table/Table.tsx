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
export interface StudentProfile {
  Course: string;
  Mobile: string;
  Student: string;
  StudentName: string;
  studentID: string;
}

interface StudentProfilePropsType {
  studentData: any;
  showAdditionalButton?: boolean;
  columns: string[];
  deleteroom?: any;
  type?: string;
  handleEdit?: any;
}

interface studentData {
  [key: string]: string;
}

const TableData = ({
  studentData,
  columns,
  showAdditionalButton,
  deleteroom,
  type,
  handleEdit,
}: StudentProfilePropsType) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    setSortedData(studentData);
  }, [studentData]);

  function toCamelCase(inputString) {
    return inputString
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join('');
  }

  const handleSort = (key: string, arrow: any) => {
    const newKey = toCamelCase(key);
    let newSortedData;
    if (type !== 'ROOMS') {
      if (arrow === 'upArrow') {
        newSortedData = [
          ...sortedData.sort((a, b) =>
            a[newKey].localeCompare(b[newKey], 'fr', { ignorePunctuation: true }),
          ),
        ];
      } else if (arrow === 'downArrow') {
        newSortedData = [
          ...sortedData.sort((a, b) =>
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
            ...sortedData.sort((a, b) =>
              a[newKey].localeCompare(b[newKey], 'fr', { ignorePunctuation: true }),
            ),
          ];
        } else if (arrow === 'downArrow') {
          newSortedData = [
            ...sortedData.sort((a, b) =>
              b[newKey].localeCompare(a[newKey], 'fr', { ignorePunctuation: true }),
            ),
          ];
        }
        setSortedData(newSortedData);
      }
    }
  };

  const getFormattedDateOrTime = (dateAndTime: any, Type: string) => {
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
          {sortedData?.map((studentData: any, index: number) => {
            if (type === 'ROOMS') {
              return (
                <TableRow className={styles.table_rowdata} key={index}>
                  <TableCell className={styles.table_cell}>{studentData?.createdBy}</TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.roomId}</TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.password}</TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.gameName}</TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.gameType}</TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.mapType}</TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.version}</TableCell>
                  <TableCell className={styles.table_cell}>
                    {getFormattedDateOrTime(studentData?.dateAndTime, 'Time')}
                  </TableCell>
                  <TableCell className={styles.table_cell}>
                    {getFormattedDateOrTime(studentData?.dateAndTime, 'Date')}
                  </TableCell>
                  <TableCell className={styles.table_cell}>
                    {
                      <>
                        <IconButton onClick={() => deleteroom(studentData?._id)}>
                          <img
                            src="/assests/Tabledelete.svg"
                            alt="studentProfileDelete"
                            className={styles.cell_icon}
                          ></img>
                        </IconButton>
                        <IconButton onClick={() => handleEdit(studentData)}>
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
                  <TableCell className={styles.table_cell}>{studentData?.fullName}</TableCell>
                  <TableCell className={styles.table_cell}>
                    {studentData?.userName || '--'}
                  </TableCell>
                  <TableCell className={styles.table_cell}>{studentData?.email}</TableCell>
                  <TableCell className={styles.table_cell}>
                    <>
                      {type === 'SPECTATOR' && (
                        <IconButton onClick={() => handleEdit(studentData)}>
                          <img
                            src="/assests/editIcon.svg"
                            alt="studentProfileEdit"
                            className={styles.cell_icon}
                          ></img>
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => {
                          deleteroom(studentData?.userUuid);
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
