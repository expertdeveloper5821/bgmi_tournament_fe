'use client';
import React, { useEffect } from 'react';
import { Button } from 'technogetic-iron-smart-ui';
import { toast } from 'react-toastify';
import { HiRefresh } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { configData } from '@/utils/config';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllRooms, getRegRooms, joinMatch } from '@/redux/actions/userDashboardActions';
import withAuth from '@/Components/HOC/WithAuthHoc';
import MatchComponent from '@/Components/MatchComponent/MatchComponent';
import TournamentCard from '@/Components/CommonComponent/TournamentCard';
import UpcomingSlider from '@/Components/CommonComponent/Slider/UpcomingSlider';
import RegisteredMatchSlider from '@/Components/CommonComponent/Slider/RegisteredMatchSlider';
import Loading from '@/app/userDashboard/loading';
import styles from '@/styles/Dashboard.module.scss';
import { ITournament } from '@/redux/types';
import { onResetJoinMessage } from '@/redux/slices/userDashboardSlice';

function Tournament() {
  const {
    allRooms,
    regRooms,
    allRoomsLoading,
    regRoomsLoading,
    joinMatchMessage,
    joinMatchLoading,
    selectedMatch: matchDetails,
  } = useSelector((state: RootState) => state.userDashboard);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getRegRooms());
  }, []);

  useEffect(() => {
    if (joinMatchMessage) {
      toast.success(joinMatchMessage);
      setTimeout(() => {
        dispatch(onResetJoinMessage(''));
      }, 2000);
    }
  }, [joinMatchMessage]);

  const addRegMatch = async (match: ITournament) => {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    const data: {
      upiId: string;
      matchAmount: number;
      name: string;
      id: string | undefined;
      roomid: string;
    } = {
      upiId: 'success@payment',
      matchAmount: 60,
      name: userData.fullName,
      id: configData?.paymentID,
      roomid: match.roomUuid,
    };
    dispatch(joinMatch(data)).then(() => {
      dispatch(getAllRooms());
      dispatch(getRegRooms());
    });
  };

  return (
    <>
      {(allRoomsLoading || regRoomsLoading) && <Loading />}
      <>
        <div className={styles.tournamentContainer}>
          <div className={styles.tCardContainer}>
            <TournamentCard imageUrl={matchDetails?.mapImg} />
          </div>
          {!Array.isArray(allRooms) ? (
            <div className={styles.register_match_room}>There is no room created till now</div>
          ) : (
            <div className={styles.tMiniContainer}>
              <div style={{ padding: '16px' }}>
                <MatchComponent
                  gameName={matchDetails?.gameName}
                  dateAndTime={matchDetails?.dateAndTime.toString()}
                  lastSurvival={matchDetails?.lastSurvival}
                  highestKill={matchDetails?.highestKill}
                  secondWin={matchDetails?.secondWin}
                  thirdWin={matchDetails?.thirdWin}
                  entryFee={matchDetails?.entryFee}
                  gameType={matchDetails?.gameType}
                  version={matchDetails?.version}
                  mapType={matchDetails?.mapType}
                />
                <div className={styles.winnings_sec_secton}>
                  <div className={styles.spot_line}></div>
                  <Button
                    disabled={joinMatchLoading}
                    className={styles.join_button}
                    onClick={() => addRegMatch(matchDetails)}
                  >
                    {joinMatchLoading ? 'Loading...' : 'Join'}
                  </Button>
                </div>
              </div>
              {allRooms?.length > 0 && (
                <div className={styles.tSliderContainer}>
                  <UpcomingSlider />
                </div>
              )}
            </div>
          )}
        </div>

        <h1 className={styles.register_match_title}>
          Registered Matches
          <HiRefresh
            onClick={() => dispatch(getRegRooms())}
            style={{ cursor: 'pointer', color: 'orange', fontSize: '18px', marginLeft: '8px' }}
          />
        </h1>
        {Array.isArray(regRooms) && !regRooms.length ? (
          <div className={styles.register_match}>There is no Registered Match till now</div>
        ) : (
          <div className={styles.sliderStyles}>
            <RegisteredMatchSlider />
          </div>
        )}
      </>
    </>
  );
}

export default withAuth(Tournament);
