'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { useSearchParams } from 'next/navigation';
import { formatDate, formatTime } from '@/Components/CommonComponent/moment';
import { toast } from 'react-toastify';
import CountdownTimer from '../../../Components/CountdownTimer/CountdownTimer';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import MatchComponent from '@/Components/MatchComponent/MatchComponent';

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
  highestKill: string;
  secondWin: string;
  thirdWin: string;
}

const regMatches = () => {
  const searchParams = useSearchParams();
  const matchID = searchParams.get('id');
  const [matchData, setMatchData] = useState<RegMatch>();
  const [visibleRooms, setVisibleRooms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRegisterMatchWithId = async () => {
    setIsLoading(true);
    try {
      const token: any = localStorage.getItem('jwtToken');
      const resMatch = await sendRequest(`room/rooms/${matchID}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resMatch.status === 200 || resMatch.status === 201) {
        const formatDateTime = ` ${formatDate({ date: matchData?.dateAndTime })} and ${formatTime({
          time: matchData?.dateAndTime,
          format: 'LT',
        })}`;
        setMatchData({ ...resMatch.data.room, dateAndTime: formatDateTime });
        CountdownTimer(matchData?.dateAndTime, matchData?.roomUuid, setVisibleRooms);
        setIsLoading(false);
      } else {
        if (resMatch.status === 202) {
          toast.success(resMatch.data.message);
        } else {
          throw Error();
        }
      }
    } catch (err) {
      toast.error('Something went wrong, please try again later!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    getRegisterMatchWithId();
  }, []);

  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.abcd}>
        <div className={styles.sidebar_wrapper}>
          <div className={styles.content}>
            <div className={styles.dashboard}>
              <span className={styles.head_desc}>Registered Matches</span>
              <h1 className={styles.subhead_desc}>Dashboard /registered matches</h1>
            </div>
            <div className={styles.sendmailbtnContainer}></div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.room_wrapper}>
              <div className={styles.room_container}>
                <div className={styles.registeredmatches}>
                  <div className={styles.imgSection}>
                    <Image
                      src={matchData?.mapImg || '../assests/userdashboardbg.svg'}
                      alt="userdashboardbg"
                      className={styles.wrapperimg}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
                <div className={styles.squad_match}>
                  <MatchComponent
                    gameName={matchData?.gameName}
                    dateAndTime={matchData?.dateAndTime.toString()}
                    lastSurvival={matchData?.lastSurvival}
                    entryFee={matchData?.entryFee}
                    gameType={matchData?.gameType}
                    version={matchData?.version}
                    mapType={matchData?.mapType}
                    highestKill={matchData?.highestKill}
                    secondWin={matchData?.secondWin}
                    thirdWin={matchData?.thirdWin}
                  />
                  <div className={styles.winnings}>
                    <span>
                      Room Id:{' '}
                      {visibleRooms?.find((room) => room === matchData.roomUuid)
                        ? matchData.roomId
                        : '*****'}
                    </span>
                    <span>
                      Room password:{' '}
                      {visibleRooms?.find((room) => room === matchData.roomUuid)
                        ? matchData.password
                        : '*****'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default regMatches;
