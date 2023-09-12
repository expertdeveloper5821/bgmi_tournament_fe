

'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData from '../../../Components/Table/Table';
import assignmentData from '../../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
import RequireAuthentication from '../../../utils/requireAuthentication';
// import apiServices from '@/services/api/apiServices';
import { sendRequest } from '@/services/auth/auth_All_Api';
import Loader from '@/Components/Loader/Loader';




export interface IAppProps { }

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const rowPerPage = 8;
  const [teamData, setTeamData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await sendRequest('/team/getallteam', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response?.data?.data) {
          setTeamData(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setIsLoading(false);
      }
    };

    fetchAllTeams();
  }, []);

  console.log('TeamData', teamData);



  const columns: string[] = [
    'leadPlayer',
    'Team Member',
    'teammates',
  ];

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1>Welcome to Admin Dashboard</h1>
              <BtnDashboard />
              {isLoading ? (
                <Loader />
              ) : (
                <TableData
                  teamData={teamData}
                  columns={columns}
                  showAdditionalButton={true} roomData={[]} userData={[]} spectatorData={[]} />
              )}

            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default page;

