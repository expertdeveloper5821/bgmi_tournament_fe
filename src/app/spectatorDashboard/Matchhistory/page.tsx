'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/matchHistory.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import { getItemFromLS } from '@/utils/globalfunctions';
import { GameRoomType } from '@/types/roomsTypes';

const matchHistory = () => {
  const roomUuid = getItemFromLS('roomUuid');
  const [winnnerTeamData, setWinnnerTeamData] = useState<GameRoomType | null>(null);

  const getWinningTeams = async () => {
    try {
      const roomTeamsGet = await sendRequest(`/winners/get-players/${roomUuid}`);
      setWinnnerTeamData(roomTeamsGet?.data);
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  useEffect(() => {
    getWinningTeams();
  }, []);

  let gameName = '',
    gameType = '',
    mapType = '';

  if (winnnerTeamData) {
    ({ gameName, gameType, mapType } = winnnerTeamData.room);
  }

  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.inner_specter_cls}>
            <h1 className={styles.r_main_title}>Match History</h1>
          </div>
          <div className={styles.winner_container}>
            {winnnerTeamData &&
              winnnerTeamData?.teams.map((team) => (
                <div className={styles.winner_card}>
                  <div className={styles.timingStyle}>
                    <span>Fri, 29 Oct</span>
                    <span>5:00 PM</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.prizepool}>
                      <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                      <p>
                        <li>Prize Pool</li>:
                        <strong className={styles.winnerBold}> {team.prizeTitle}</strong>
                      </p>
                    </div>
                    <p>
                      <span> Match Name</span>: <strong>{gameName}</strong>
                    </p>
                    <p>
                      <span>Match Type</span>: <strong> {gameType}</strong>
                    </p>
                    <p>
                      <span>Team Name</span>: <strong>{team.teamName}</strong>
                    </p>
                    <div className={`${styles.flex_row} ${styles.mapNameStyle}`}>
                      <p>
                        <span> Map Name</span>: <strong>{mapType}</strong>
                      </p>
                      <div className={styles.usersImg}>
                        {team?.teamMembers?.map((e) => (
                          <img
                            className={styles.img1}
                            src={`${e?.profilePic}` || '/assests/avatar.png'}
                            alt="img"
                          />
                        ))}
                        {/* <img className={`${styles.img1}`} src="/assests/avatar.png" alt="img" /> */}
                        <img className={styles.img2} src="/assests/avatar.png" alt="img" />
                        <img className={styles.img3} src="/assests/avatar.png" alt="img" />
                        <img className={styles.img4} src="/assests/avatar.png" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default matchHistory;
