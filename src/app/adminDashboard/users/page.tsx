'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData, { UserData } from '../../../Components/Table/Table';
//@ts-ignore
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import RequireAuthentication from '../../../utils/requireAuthentication';
// import apiServices from '@/services/api/apiServices';
import { sendRequest } from '@/services/auth/auth_All_Api';
import Loader from '@/Components/Loader/Loader';
import { toast } from 'react-toastify';

export interface IAppProps { }

function page() {
  const [userData, setUserData] = useState<UserData[]>([]);;
  const [isLoading, setIsLoading] = useState(true);
  const imageIcon: string = 'user';

  const fetchTournaments = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await sendRequest('/user/getalluser', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const allUsersData = response?.data?.data;
      const filteredData = allUsersData.filter((user: any) => {
        return user.role.role === 'user';
      })
      setUserData(filteredData)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching tournament data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const deleteroomId = async (userUuid: any) => {
    try {
      const tokens = localStorage.getItem('jwtToken');
      console.log(tokens)
      const response = await sendRequest(`/role/deleterole/${userUuid}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${tokens}` }
      });
      setUserData(userData);
      fetchTournaments();
      if (response) {
        const success = response.data.message;
        toast.success(success);
      }
    } catch (error) {
      console.error('Error deleting room:', error);

    }

  };


  const columns: string[] = [
    'Full Name',
    'User Name',
    'Email',
  ];

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container} id="mainLayoutContainerInner">
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              {/* <SearchFilter /> */}
              {isLoading ? (
                <Loader />
              ) : (
                <TableData
                  imageIcon={imageIcon}
                  deleteroomId={deleteroomId}
                  userData={userData}
                  columns={columns}
                  showAdditionalButton={true} roomData={[]} teamData={[]} spectatorData={[]} setSetSpectatorId={undefined} setModal={undefined} updateSpectatorByid={undefined} />
              )}
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default page;

