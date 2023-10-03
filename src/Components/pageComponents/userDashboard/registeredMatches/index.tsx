'use client';
import React, { useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { useSearchParams } from 'next/navigation';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import MatchComponent from '@/Components/MatchComponent/MatchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import TournamentCard from '@/Components/CommonComponent/TournamentCard';
import { getMatchDetails } from '@/redux/actions/userDashboardActions';
import { getIdPass } from '@/utils/commonFunction';

const RegisteredMatch = () => {
  const { matchData, matchDataLoading } = useSelector((state: RootState) => state.userDashboard);
  const searchParams = useSearchParams();
  const matchID = searchParams.get('id');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMatchDetails({ matchID }));
  }, []);

  return (
    <>
      {matchDataLoading ? (
        <Loader />
      ) : (
        <div className={styles.room_wrapper}>
          <div className={styles.room_container}>
            <TournamentCard imageUrl={matchData.mapImg} />
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
                  Room Id: {getIdPass(matchData.dateAndTime) ? matchData.roomId : '*****'}
                </span>
                <span>
                  Room password: {getIdPass(matchData.dateAndTime) ? matchData.password : '****'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisteredMatch;
