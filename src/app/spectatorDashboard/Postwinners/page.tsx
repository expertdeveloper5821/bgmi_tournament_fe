'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { Table, TableBody } from 'technogetic-iron-smart-ui';
import { Button } from 'technogetic-iron-smart-ui';
import { useRouter } from 'next/navigation';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { GameRoomType, winnerFormType } from '@/types/roomsTypes';
import {
  getAllTeamsService,
  getWinningTeamsService,
  handleSubmitWinningTeamService,
} from '@/services/specDashboardServices';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getItemFromLS } from '@/utils/globalfunctions';

const columns: string[] = [
  'Team Name',
  'Chicken Dinner',
  'Highest Kill',
  'First Winner',
  'Second Winner',
];

const rowData = [
  { name: 'chickenDinner', value: 30, key: 'Chicken Dinner' },
  { name: 'highestKill', value: 20, key: 'Highest Kill' },
  { name: 'firstWinner', value: 10, key: 'First Winner' },
  { name: 'secondWinner', value: 5, key: 'Second Winner' },
];

const postWinners = () => {
  const router = useRouter();
  const roomID = getItemFromLS('roomId') || '';
  const roomUuid = getItemFromLS('roomUuid') || '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomUsers, setRoomUsers] = useState<null | []>(null);
  const [winnnerTeamData, setWinnnerTeamData] = useState<null | GameRoomType>(null);
  const [formData, setFormData] = useState<winnerFormType | object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const getWinnerPostData = (index: number, teamName: string) => {
    if (winnnerTeamData) {
      return winnnerTeamData.teams?.[index]?.teamName === teamName
        ? winnnerTeamData.teams?.[index]?.prizeTitles
        : '';
    }
  };

  useEffect(() => {
    if (!roomUsers?.length) {
      getAllTeamsService(roomID)
        .then((res) => setRoomUsers(res?.data?.teams))
        .catch(console.error);
    }
    if (!winnnerTeamData) {
      getWinningTeamsService(roomUuid)
        .then((res) => setWinnnerTeamData(res.data))
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    (roomUsers || []).forEach(({ teamName }) => {
      setFormData((prev) => ({
        ...prev,
        [teamName]: {
          //@ts-ignore
          ...prev[teamName],
          teamName: teamName,
          chickenDinner: 0,
          highestKill: 0,
          firstWinner: 0,
          secondWinner: 0,
        },
      }));
    });
  }, [roomUsers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, teamName: string) => {
    setIsEdit(true);
    const { value, name } = e.target;
    const point = Number(value);
    roomUsers?.forEach(({ teamName }) => {
      setFormData((prev) => ({
        ...prev,
        [teamName]: {
          //@ts-ignore
          ...prev[teamName],
          [name]: 0,
        },
      }));
    });
    setFormData((prev) => ({
      ...prev,
      [teamName]: {
        ...prev[teamName],
        [name]: point,
      },
    }));
  };

  const handleSubmitWinner = async () => {
    setIsLoading(true);
    handleSubmitWinningTeamService(formData, winnnerTeamData, roomUuid)
      .then((res) => {
        setIsLoading(false);
        router.push('/spectatorDashboard');
        toast.success(res?.data.message);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error('Fail to update Winning team data !');
        console.log(error);
      });
  };

  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div className={styles.inner_main_container}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.inner_specter_cls}>
              <h1 className={styles.r_main_title}>Your Room</h1>
            </div>
            {!roomUsers ? (
              <Loader />
            ) : roomUsers?.length === 0 ? (
              <div className={styles.noData}>No Team Data found !</div>
            ) : (
              <Table className={styles.table_content}>
                <TableHeader className={styles.tableHeader}>
                  <TableRow className={styles.tableRow}>
                    {columns?.map((column, index) => (
                      <TableHead className={styles.table_head_sectat} key={index}>
                        <div className={styles.filter}>{column}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody className={styles.postWinnerTbody}>
                  {roomUsers?.map((team: { teamName: string }, index: number) => {
                    const { teamName } = team;
                    return (
                      <TableRow className={styles.table_row_winner}>
                        <td className={styles.table_data}> {teamName}</td>
                        {rowData.map((td) => {
                          return isEdit ? (
                            <td className={styles.table_data}>
                              <input
                                type="radio"
                                value={td.value}
                                name={td.name}
                                className={styles.checkbox_round}
                                onChange={(e) => handleChange(e, teamName)}
                              />
                            </td>
                          ) : (
                            <td className={styles.table_data}>
                              <input
                                type="radio"
                                checked={
                                  getWinnerPostData(index, teamName)?.includes(td.key)
                                    ? true
                                    : false
                                }
                                value={td.value}
                                name={td.name}
                                className={styles.checkbox_round}
                                onChange={(e) => handleChange(e, teamName)}
                              />
                            </td>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}

            {roomUsers?.length !== 0 && (
              <div className={styles.button_wrapper_winner}>
                <Link href={'/spectatorDashboard'}>
                  <Button className={styles.cancel_button}>Cancel</Button>
                </Link>
                <Button
                  id="add"
                  disabled={isLoading}
                  className={styles.submitbutton}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmitWinner}
                >
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
};

export default postWinners;
