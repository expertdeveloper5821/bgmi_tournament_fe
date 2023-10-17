'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData from '@/Components/CommonComponent/Table/Table';
//@ts-ignore
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import RequireAuthentication from '../../../utils/requireAuthentication';
// import apiServices from '@/services/api/apiServices';
import { sendRequest } from '@/utils/axiosInstanse';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { toast } from 'react-toastify';
import {SpectatorDataType} from '.././spectator/page';

export interface IAppProps { }


function page() {
  const [ wholeUserData, setWholeUserData] = useState<SpectatorDataType[] | []>([]);
  const [userData, setUserData] = useState<SpectatorDataType[] | []>([]);;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imageIcon: string = 'user';
  const columns: string[] = [
    'Full Name',
    'User Name',
    'Email',
  ];

  const fetchTournaments = async (searchVal:string) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await sendRequest(`/user/getalluser?search=${searchVal}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.status === 200) {
        const allUsersData:SpectatorDataType[]= response?.data?.data;
        const filteredData = allUsersData?.filter((user: any) => {
          return user?.role?.role === 'user';
        })
        setWholeUserData(filteredData);
        setUserData(filteredData);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments('');
  }, []);

  const deleteroomId = async (userUuid: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await sendRequest(`/role/deleterole/${userUuid}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTournaments('');
      toast.success(response?.data?.message); 
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    const filteredResults = wholeUserData.filter((data:SpectatorDataType) =>
    data?.fullName
    ?.toLowerCase().includes(value.toLowerCase()) || data?.userName?.toLowerCase().includes(value.toLowerCase()) || data?.email
    ?.toLowerCase().includes(value.toLowerCase())
    );
    setUserData(filteredResults);
  };

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container} id="mainLayoutContainerInner">
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <div className={styles.flex}>
                <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
                <SearchFilter handleSearch={fetchTournaments} onChange={handleSearch}/></div>
              {isLoading ? (
                <Loader />
              ) : (
                <TableData
                  // imageIcon={imageIcon}
                  deleteroom={deleteroomId}
                  studentData={userData}
                  columns={columns}
                  showAdditionalButton={true} 
                  type={'USERS'}

                  // roomData={[]} 
                  // teamData={[]} 
                  // spectatorData={[]} 
                  // setSetSpectatorId={undefined} 
                  // setModal={undefined} 
                  // updateSpectatorByid={undefined} 
                  />
              )}
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default page;