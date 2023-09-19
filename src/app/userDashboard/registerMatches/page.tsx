'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import Image from 'next/image';
import { sendRequest } from '@/services/auth/auth_All_Api';
import { useSearchParams } from 'next/navigation';
import { formatDate, formatTime } from '@/Components/CommonComponent/moment';
import { toast } from 'react-toastify';
import CountdownComponent from '../tournament/CountdownComponent'


export interface RegMatch {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  dateAndTime: string;
  lastSurvival: string;
  roomId: string;
  roomUuid: string;
  password: string;
  entryFee?: string;
  mapImg: string;
}

const regMatches = () => {
  const searchParams = useSearchParams();
  const matchID = searchParams.get('id');
  const [matchData, setMatchData] = useState<RegMatch>();
  const [visibleRooms, setVisibleRooms] = useState<string[]>([]);

  const getRegisterMatchWithId = async () => {
    try {
      const token: any = localStorage.getItem('jwtToken');
      const regMAtch = await sendRequest(`room/rooms/${matchID}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatchData(regMAtch.data.room);
      if (regMAtch.status === 200) {
        const formatDateTime = ` ${formatDate({ date: matchData?.dateAndTime })} and ${formatTime({ time: matchData?.dateAndTime, format: 'LT' })}`;
        setMatchData({ ...regMAtch.data.room, dateAndTime: formatDateTime })
       CountdownComponent(matchData?.dateAndTime, matchData?.roomUuid, setVisibleRooms)
      }
    } catch (err) {
      toast.error("not show data ")
    }
  };

  useEffect(() => {
    getRegisterMatchWithId();
    
  }, []);


  return (
    <div className={styles.main_container}>
      <div className={styles.abcd}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.content}>
            <div className={styles.dashboard}>
              <span className={styles.head_desc}>Registered Matches</span>
              <h1 className={styles.subhead_desc}>
                Dashboard /registered matches
              </h1>
            </div>
            <div className={styles.sendmailbtnContainer}>
            </div>
          </div>
          <div className={styles.room_wrapper}>
            <div className={styles.room_container}>
              <div className={styles.registeredmatches}>
                <div className={styles.imgSection}>
                  <Image
                    src={matchData?.mapImg || "../assests/userdashboardbg.svg"}
                    alt="userdashboardbg"
                    className={styles.wrapperimg}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className={styles.squad_match}>
                <span className={styles.register_match_gamename}>
                  {matchData?.gameName}
                </span>
                <span className={styles.winning_prize}>
                  Time: {matchData?.dateAndTime.toString()}
                </span>

                <div className={styles.winnings}>
                  <div>
                    <span className={styles.winning_prize}>WINNING PRIZE</span>
                    <span className={styles.survival_content}>
                      Last Survival: 
                      <span className="rs_logo">
                        <Image
                          src="../assests/rupee-icon.svg"
                          alt="rupeeIcon"
                          width={12}
                          height={12}
                        />
                      </span>
                      {matchData?.lastSurvival}
                    </span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}> Entry FEES :</span>
                    <span className={styles.survival_content}>
                      <span className="rs_logo">
                        <Image
                          src="../assests/rupee-icon.svg"
                          alt="rupeeIcon"
                          width={12}
                          height={12}
                        />
                      </span>
                      {matchData?.entryFee}
                    </span>
                  </div>
                </div>
                <div className={styles.winnings}>
                  <div>
                    <span className={styles.winning_prize}>TYPE</span>
                    <span
                      className={styles.tvm_font}
                      style={{ color: 'rgba(255, 214, 0, 1)' }}
                    >
                      {matchData?.gameType}
                    </span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>VERSION</span>
                    <span
                      className={styles.tvm_font}
                      style={{ color: 'rgba(255, 214, 0, 1)' }}
                    >
                      {matchData?.version}
                    </span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>MAP</span>
                    <span
                      className={styles.tvm_font}
                      style={{ color: 'rgba(255, 122, 0, 1)' }}
                    >
                      {matchData?.mapType}
                    </span>
                  </div>
                </div>
                <div className={styles.winnings}>
                <span>Room Id: {visibleRooms?.find(room => room === matchData.roomUuid) ? matchData.roomId : '*****'}</span>
                <span>Room password: {visibleRooms?.find(room => room === matchData.roomUuid) ? matchData.password : '*****'}</span>
                </div>
              </div>
            </div>
          </div>
          <div>

          </div>
          {/******  use this code for your team member  ****/}

          {/* <div className={styles.Teammembers}>Your Team Members</div>
          <div className={styles.container2}>
            <div className={styles.inner_cont}> */}
              {/* <div key={index} className={`${styles.slide}`}> */}
{/* 
              <div className={styles.reviewsContainer}>

                <div className={styles.reviewCard}>

                  <div className={styles.reviews}>

                    <img

                      src="/assests/reviewman.svg"

                      alt="image"

                      className={styles.profile}

                    />

                    <div className={styles.reviewer}>

                      <div className={styles.name}>

                        <h2>John doe</h2>

                        <div className={styles.greenCircle}></div>

                      </div>

                      <p>akshay@gmail.com</p>

                    </div>

                  </div>
                  <div className={styles.review_close}>
                    x
                  </div>
                </div>

              </div>
            */}

              {/* </Slider>

              )} */}

            {/* </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default regMatches;
