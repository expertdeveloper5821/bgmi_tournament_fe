'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import TableData from '@/Components/CommonComponent/Table/Table';
import { SearchFilter } from '@/Components/CommonComponent/SearchFilter';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { toast } from 'react-toastify';
import { winnerListTypes } from '@/types/usersTypes';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { LeaderBoardColumns } from '@/utils/constant';
import { getAllWinnerService } from '@/services/userDashboardServices';

function LeaderBoard() {
  // const [sortWinnerList, setSortWinnerList] = useState<winnerListTypes[] | []>([]);
  const [winnerList, setWinnerList] = useState<winnerListTypes[] | []>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchAllWinnders = async () => {
    setLoading(true);
    try {
      const { data } = await getAllWinnerService();
      const winnerList: winnerListTypes[] = await data?.leaderboard;
      // setSortWinnerList(winnerList);
      setWinnerList(winnerList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllWinnders();
  }, []);

  const handleSearch = (e: { target: { value: string } }) => {
    const { value } = e.target;
    console.log(value);
    // const filteredResults = sortWinnerList.filter(
    //   (obj: winnerListTypes) =>
    //     obj?.point?.toLowerCase().includes(value.toLowerCase()) ||
    //     obj?.matchtype?.toLowerCase().includes(value.toLowerCase()),
    // );
    // setWinnerList(filteredResults);
  };

  return (
    <IsAuthenticatedHoc>
      <div>
        <h1 className={styles.heading}>Leaderboard</h1>
        <SearchFilter handleSearch={fetchAllWinnders} onChange={handleSearch} />
      </div>
      {isLoading && <Loader />}
      <TableData data={winnerList} columns={LeaderBoardColumns} type={'leaderboard'} />
    </IsAuthenticatedHoc>
  );
}

export default LeaderBoard;
