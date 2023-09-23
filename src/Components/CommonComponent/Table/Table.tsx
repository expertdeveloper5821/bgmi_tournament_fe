'use client';
import { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';
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

export interface StudentProfile {
  Course: string;
  Mobile: string;
  Student: string;
  StudentName: string;
  studentID: string;
}

interface StudentProfilePropsType {
  studentData: StudentProfile[];
  showAdditionalButton?: boolean;
  columns: string[];
}

interface studentData {
  [key: string]: string;
}

const TableData = (props: StudentProfilePropsType) => {
  const [sortedData, setSortedData] = useState(props?.studentData || []);
  const [isDescending, setIsDescending] = useState(false);
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    setSortedData(props?.studentData);
  }, [props?.studentData]);

  const handleSort = (key: keyof studentData) => {
    let sorted = [];

    if (sortKey === key) {
      sorted = [...sortedData].reverse();
      setIsDescending(!isDescending);
    } else {
      sorted = [...sortedData].sort((a: any, b: any) => {
        if (a[key] < b[key]) return isDescending ? 1 : -1;
        if (a[key] > b[key]) return isDescending ? -1 : 1;
        return 0;
      });
      setIsDescending(false);
    }
    setSortedData(sorted);
    setSortKey(String(key));
  };

  function handleDelete({ studentData }: { studentData: studentData }): void {
    const updatedData = sortedData.filter((data: any) => data.studentID !== studentData.studentID);
    setSortedData(updatedData);
    console.log('data', updatedData);
  }

  const handleEdit = (studentData: studentData) => {
    console.log('Edit student data:', studentData);
  };

  return (
    <div>
      <Table className={styles.table_content}>
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {props.columns.map((columnName) => (
              <TableHead className={styles.table_head} key={columnName}>
                <div className={styles.filter}>
                  {columnName}
                  <div>
                    <img
                      src="/assests/upArrow.svg"
                      alt="filterup"
                      onClick={() => handleSort(columnName)}
                    ></img>
                    <img
                      src="/assests/downArrow.svg"
                      alt="filterdown"
                      onClick={() => handleSort(columnName)}
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
          {sortedData.map((studentData: any, index: number) => {
            const additionalImagePath = props.showAdditionalButton
              ? './assests/StudentProfile.svg'
              : null;

            return (
              <TableRow className={styles.table_rowdata} key={index}>
                <TableCell className={styles.table_cell}>{studentData.StudentName}</TableCell>

                <TableCell className={styles.table_cell}>{studentData.Student}</TableCell>
                <TableCell className={styles.table_cell}>{studentData.studentID}</TableCell>
                <TableCell className={styles.table_cell}>{studentData.Mobile}</TableCell>
                <TableCell className={styles.table_cell}>{studentData.Course}</TableCell>
                <TableCell className={styles.table_cell}>
                  {additionalImagePath ? (
                    <IconButton>
                      <div className={styles.iconWrapper}>
                        <img
                          src="/assests/studentprofile.svg"
                          alt="studentProfileView"
                          className={styles.table_icon}
                        ></img>
                        <span>View Profile</span>
                      </div>
                    </IconButton>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(studentData)}>
                        <img
                          src="/assests/TableEdit.svg"
                          alt="studentProfileEdit"
                          className={styles.cell_icon}
                        ></img>
                      </IconButton>
                      <IconButton onClick={() => handleDelete({ studentData })}>
                        <img
                          src="/assests/Tabledelete.svg"
                          alt="studentProfileDelete"
                          className={styles.cell_icon}
                        ></img>
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableData;
