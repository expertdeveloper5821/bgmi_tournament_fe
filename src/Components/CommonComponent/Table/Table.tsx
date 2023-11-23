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
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import Pagination from '../Pagination';

const TableData = ({ data, columns, deleteroom, type, handleEdit }: TablePropsType) => {
  const [sortedData, setSortedData] = useState<TableDataType[] | []>([]);
  const filterKeys = ['Created By', 'Game Name', 'Game Type', 'Map Type', 'Version'];

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
      <Table className={styles.table_content}>
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {columns?.map((columnName) => (
              <TableHead className={styles.table_head} key={columnName}>
                <div className={styles.filter}>
                  {columnName}
                  {filterKeys.includes(columnName) && (
                    <div>
                      <FaLongArrowAltUp onClick={() => handleSort(columnName, 'upArrow')} />
                      <FaLongArrowAltDown
                        style={{ color: '#FF7A00' }}
                        onClick={() => handleSort(columnName, 'downArrow')}
                      />
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
            <TableHead className={styles.table_head}>
              <div className={styles.filter}>Actions</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className={styles.table_body}>
          {sortedData?.slice(startIndex, endIndex)?.map((data: TableDataType, index: number) => {
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
                  <TableCell className={`${styles.table_cell} ${styles.action_td}`}>
                    <RiDeleteBin6Line onClick={() => deleteroom && deleteroom(data._id)} />
                  </TableCell>
                </TableRow>
              );
            } else if (type === 'SPECTATOR' || type === 'USERS') {
              return (
                <TableRow className={styles.table_rowdata} key={index}>
                  <TableCell className={styles.table_cell}>{data?.fullName}</TableCell>
                  <TableCell className={styles.table_cell}>{data?.userName || '--'}</TableCell>
                  <TableCell className={styles.table_cell}>{data?.email}</TableCell>
                  <TableCell className={`${styles.table_cell} ${styles.action_td}`}>
                    {type === 'SPECTATOR' && (
                      <MdEdit onClick={() => handleEdit && handleEdit(data)} />
                    )}
                    <RiDeleteBin6Line onClick={() => deleteroom && deleteroom(data._id)} />
                  </TableCell>
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
    </>
  );
};

export default TableData;
