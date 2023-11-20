'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { Table, TableBody } from 'technogetic-iron-smart-ui';
import { Button } from 'technogetic-iron-smart-ui';
import { useRouter } from 'next/navigation';
import { sendRequest } from '@/utils/axiosInstanse';
import { getItemFromLS } from '@/utils/globalfunctions';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import { toast } from 'react-toastify';
import { GameRoomType, winnerFormType } from '@/types/roomsTypes';

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
  const roomID = getItemFromLS('roomId');
  const roomUuid = getItemFromLS('roomUuid');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomUsers, setRoomUsers] = useState<null | []>(null);
  const [winnnerTeamData, setWinnnerTeamData] = useState<null | GameRoomType>(null);
  const [formData, setFormData] = useState<winnerFormType | object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);

  console.log('checking values before submit', formData);

  const getAllTeams = async () => {
    try {
      const roomTeamsGet = await sendRequest(`/room/getTeam/${roomID}`);
      setRoomUsers(roomTeamsGet?.data?.teams);
    } catch (error) {
      console.log('Error in get team data', error);
    }
  };

  const getWinningTeams = async () => {
    try {
      const winnerTeamsResult = await sendRequest(`/winners/get-players/${roomUuid}`);
      setWinnnerTeamData(winnerTeamsResult?.data);
      if (roomUsers?.length === 0) {
        toast.error('No team data found !');
      }
    } catch (error) {
      console.log('Error in get team data', error);
    }
  };

  const getWinnerPostData = (index: number, teamName: string) => {
    if (winnnerTeamData) {
      return winnnerTeamData.teams?.[index]?.teamName === teamName
        ? winnnerTeamData.teams?.[index]?.prizeTitles
        : '';
    }
  };

  const submitWinningTeam = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest(`/winners/players/${roomUuid}`, {
        method: `${winnnerTeamData ? 'PUT' : 'POST'}`,
        data: Object.values(formData),
      });
      toast.success('Winning team update successfully');
      router.push('/spectatorDashboard');
      if (response.status !== 200) {
        toast.error('Fail to update Winning team data !');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTeams();
    getWinningTeams();
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

  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.inner_specter_cls}>
            <h1 className={styles.r_main_title}>Your Room</h1>
            <button onClick={() => setIsEdit(true)}>Edit</button>
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
                                getWinnerPostData(index, teamName)?.includes(td.key) ? true : false
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
              <Button
                onClick={() => router.push('/spectatorDashboard')}
                className={styles.cancel_button}
              >
                Cancel
              </Button>
              <Button
                id="add"
                disabled={isLoading}
                className={styles.submitbutton}
                variant="contained"
                type="submit"
                onClick={submitWinningTeam}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default postWinners;
