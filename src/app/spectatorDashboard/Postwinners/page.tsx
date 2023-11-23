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
import { GameRoomType, winnerFormDataType, winnerFormType } from '@/types/roomsTypes';
import {
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
  const roomUuid = getItemFromLS('roomUuid') || '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [winnnerTeamData, setWinnnerTeamData] = useState<null | GameRoomType>(null);
  const [formData, setFormData] = useState<winnerFormType[]>([]);

  const obj: { teamName: string; title: string | undefined; value?: number }[] = [];
  const ts: winnerFormDataType = {};
  useEffect(() => {
    if (!winnnerTeamData) {
      getWinningTeamsService(roomUuid)
        .then((res) => {
          setIsLoading(true);
          res.data.teams.forEach((i) => {
            ts[i.teamName] = {
              teamName: i.teamName,
              chickenDinner: 0,
              highestKill: 0,
              firstWinner: 0,
              secondWinner: 0,
            };
            i.prizeTitles.forEach((j) => {
              const m = rowData.find((k) => {
                if (k.key === j) {
                  return k;
                }
                return 0;
              });
              obj.push({
                teamName: i.teamName,
                title: m?.name,
                value: m?.value,
              });
            });
          });

          obj.forEach((i) => {
            if (i && i.title) {
              ts[i.teamName][i.title] = i.value;
            }
          });

          setFormData(Object.entries(ts).map(([, value]) => value));
          setIsLoading(false);
          setWinnnerTeamData(res.data);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, teamName: string) => {
    const { value, name } = e.target;
    const point = Number(value);
    const filteredData = [...formData]
      .map((i) => {
        i[name] = 0;
        return i;
      })
      .map((i) => {
        if (i.teamName === teamName) {
          i[name] = point;
        }
        return i;
      });
    setFormData(filteredData);
  };

  const handleSubmitWinner = async () => {
    setIsLoading(true);
    const payload = {};
    formData.forEach((i) => {
      payload[i.teamName] = {
        ...i,
      };
    });
    handleSubmitWinningTeamService(payload, winnnerTeamData, roomUuid)
      .then((res) => {
        setIsLoading(false);
        router.push('/spectatorDashboard');
        toast.success(res?.data.message);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
        toast.error('Fail to update Winning team data !');
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
            {isLoading ? (
              <Loader />
            ) : formData?.length === 0 ? (
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
                  {formData?.map((team: { teamName: string }) => {
                    const { teamName } = team;
                    return (
                      <TableRow className={styles.table_row_winner}>
                        <td className={styles.table_data}> {teamName}</td>
                        {rowData.map((td) => {
                          return (
                            <td className={styles.table_data}>
                              <input
                                type="radio"
                                checked={team[td.name] ? true : false}
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

            {formData?.length !== 0 && (
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
