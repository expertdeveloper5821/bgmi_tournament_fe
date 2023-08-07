'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableComponent, { UserProfile } from "../../../Components/Table/TableData";
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
import sendRequest from '@/services/auth/auth_All_Api';
import { useRouter, NextRouter } from 'next/router';

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false)
  const [paginatedData, setPaginatedData] = useState<UserProfile[]>([]);
  const rowPerPage = 8;
  const totalPages = 10;

  const fetchDataFromAPI = async () => {
    setLoading(true)
    try {
      const response = await sendRequest('v1/getalluser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response) {
        throw new Error('API response is not valid');
      }

      const data: UserProfile[] = response.data.data;
      console.log("response", data);

      setPaginatedData(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setPaginatedData([]);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    console.log("FUN")
    fetchDataFromAPI();
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };


  const columns: string[] = ['fullName', 'userName', 'email', 'role'];


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <BtnDashboard />
            {/* <TableComponent
              userData={paginatedData}
              columns={columns}
              showAdditionalButton={true}
            /> */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(columns.length / rowPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
