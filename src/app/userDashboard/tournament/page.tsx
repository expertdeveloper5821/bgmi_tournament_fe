'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { sendRequest } from '@/utils/axiosInstanse';
import styles from '@/styles/Dashboard.module.scss';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { configData } from '@/utils/config';
import MatchComponent from '@/Components/MatchComponent/MatchComponent';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';
import { ITournament } from '../types';
import {
  CONTEST_SUCCESS_MESSAGE,
  NETWORK_ERR_MESSAGE,
  USER_REGISTERED_MESSAGE,
  formatDateAndTime,
  initialValues,
} from '../constants';
import MiniMatchComponent from '@/Components/MatchComponent/MiniMatchComponent';

function Tournament() {
  const [allRoomsData, setAllRoomsData] = useState<any>([]); //types
  const [regMatches, setRegMatches] = useState<any>(''); //types
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleRooms, setVisibleRooms] = useState([]);
  const [matchDetails, setMatchDetails] = useState<ITournament>(initialValues);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [numItemsToShow, setNumItemsToShow] = useState(1);

  const getAllTournaments = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await sendRequest('room/rooms', {
        method: 'GET',
      });
      if ((status === 200 || status === 201) && data.length > 0) {
        const firstTournament = data[0];
        setAllRoomsData(data);
        setMatchDetails({
          ...data[0],
          dateAndTime: formatDateAndTime(
            firstTournament.dateAndTime,
            firstTournament.dateAndTime,
            'LT',
          ),
        });
        setIsLoading(false);
      } else {
        if (status === 204) {
          setAllRoomsData([]);
          setIsLoading(false);
        } else {
          throw Error();
        }
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(NETWORK_ERR_MESSAGE, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const getRegisteredMatches = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await sendRequest('team/register-room ', {
        method: 'GET',
      });
      if ((status === 200 || status === 201) && data) {
        setRegMatches(data.rooms);
        setIsLoading(false);
      } else {
        if (status === 204) {
          setRegMatches([]);
          setIsLoading(false);
        } else {
          throw Error();
        }
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(NETWORK_ERR_MESSAGE, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNumItemsToShow(2);
      } else {
        setNumItemsToShow(1);
      }
      if (window.innerWidth >= 1000) {
        setNumItemsToShow(1);
      } else {
        setNumItemsToShow(1);
      }
      if (window.innerWidth >= 1280) {
        setNumItemsToShow(2);
      } else {
        setNumItemsToShow(1);
      }
    };

    getAllTournaments();
    getRegisteredMatches();
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateMainData = (match: ITournament) => {
    const { dateAndTime } = match;
    const updatedFormat = formatDateAndTime(dateAndTime, dateAndTime, 'LT');
    setMatchDetails({
      ...match,
      dateAndTime: updatedFormat,
    });
  };

  const addRegMatch = async (match: ITournament) => {
    setIsLoading(true);
    try {
      const userData: any = JSON.parse(localStorage.getItem('userData'));
      const { status } = await sendRequest('payment/create-payment', {
        method: 'POST',
        data: {
          upiId: 'success@payment',
          matchAmount: 60,
          name: userData.fullName,
          id: configData.paymentID,
          roomid: match?.roomUuid,
        },
      });

      if (status === 200) {
        getAllTournaments();
        getRegisteredMatches();
        toast.success(CONTEST_SUCCESS_MESSAGE, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
        });
        setIsLoading(false);
      } else {
        throw Error();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(USER_REGISTERED_MESSAGE, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const goToNextSlide = () => {
    const newIndex = currentIndex + 1;

    if (newIndex < regMatches.length) {
      setCurrentIndex(newIndex);
    }
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex - 1;

    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  const goToNextSlide1 = () => {
    const newIndex = currentIndex1 + 1;

    if (newIndex < allRoomsData.length) {
      setCurrentIndex1(newIndex);
    }
  };

  const goToPrevSlide1 = () => {
    const newIndex = currentIndex1 - 1;

    if (newIndex >= 0) {
      setCurrentIndex1(newIndex);
    }
  };

  //info required
  const getIdPass = (dateAndTime: string, roomUuid: string) => {
    if (dateAndTime && roomUuid) {
      setInterval(() => {
        const REDUCE_TIME = 15 * 60 * 1000;
        const currentTime = new Date().getTime();
        let dateNumber = new Date(dateAndTime).getTime();
        const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
        if (currentTime >= reducedTime) {
          setVisibleRooms([...visibleRooms, roomUuid]);
        }
      }, 60000);
    }
  };

  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.abcd}>
        <div className={styles.sidebar_wrapper}>
          <div className={styles.content}>
            {/* one more generic component */}
            <div className={styles.dashboard}>
              <span className={styles.head_desc}>Upcoming Matches</span>
              <Breadcrumb />
            </div>
          </div>
          <div className={styles.room_wrapper}>
            <div className={styles.room_container}>
              <div className={styles.registeredmatches}>
                <div className={styles.imgSection}>
                  <Image
                    src={matchDetails?.mapImg || '../assests/userdashboardbg.svg'}
                    alt="userdashboardbg"
                    className={styles.wrapperimg}
                    width={200}
                    height={200}
                  />
                </div>
              </div>

              {allRoomsData && allRoomsData.length === 0 ? (
                <div className={styles.register_match_room}>There is no room created till now</div>
              ) : (
                <div className={styles.squad_match}>
                  <div className={styles.inner_squad_match}>
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
                    <div className={styles.spot_line_sec}></div>
                    <div className={styles.winnings_sec_secton}>
                      <div className={styles.spot_line}>
                        {/* add new component */}
                        {/* <span className={styles.bar_font}>
                      Only 30 spots Left
                    </span>
                    <span className={styles.bar_font}>20/50</span> */}
                      </div>
                      <Button
                        disabled={isLoading}
                        className={styles.join_button}
                        onClick={() => addRegMatch(matchDetails)}
                      >
                        {isLoading ? 'Loading...' : 'Join'}
                      </Button>
                    </div>
                  </div>
                  <div className={styles.container2} style={{ padding: '0px' }}>
                    <div className={styles.inner_cont}>
                      <button
                        onClick={goToPrevSlide1}
                        style={{ background: 'transparent', border: 'none' }}
                        disabled={currentIndex1 === 0}
                      >
                        <AiOutlineLeft className={styles.outline_icon} />
                      </button>
                      <div
                        className={styles.slideContainer}
                        style={{ width: '100%', overflow: 'hidden' }}
                      >
                        {allRoomsData &&
                          allRoomsData
                            .slice(currentIndex1, currentIndex1 + 2)
                            .map((match: ITournament, index: number) => {
                              return (
                                <Image
                                  key={index}
                                  width={100}
                                  height={100}
                                  className={styles.img_slider_one}
                                  src={match?.mapImg || '../assests/cards.svg'}
                                  alt="slides"
                                  onClick={() => updateMainData(match)}
                                />
                              );
                            })}
                      </div>
                      <button
                        onClick={goToNextSlide1}
                        style={{ background: 'transparent', border: 'none' }}
                        disabled={currentIndex1 === allRoomsData.length - 1}
                      >
                        <AiOutlineRight className={styles.outline_icon} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <span className={styles.register_match_title}>Registered Matches</span>
          {!regMatches.length ? (
            <div className={styles.register_match}>There is no Registered Match till now</div>
          ) : (
            <div className={styles.container2}>
              <div className={styles.inner_cont}>
                <button
                  onClick={goToPrevSlide}
                  className={styles.prevButton}
                  disabled={currentIndex === 0}
                >
                  <AiOutlineLeft className={styles.outline_icon} />
                </button>
                <div className={styles.slideContainer}>
                  {regMatches &&
                    regMatches
                      .slice(currentIndex, currentIndex + numItemsToShow)
                      .map((match: ITournament, index: number) => {
                        getIdPass(match.dateAndTime, match.roomUuid);
                        return (
                          <MiniMatchComponent
                            visibleRooms={visibleRooms}
                            match={match}
                            key={index}
                          />
                        );
                      })}
                </div>
                <button
                  onClick={goToNextSlide}
                  className={styles.nextButton}
                  disabled={currentIndex === regMatches.length - numItemsToShow}
                >
                  <AiOutlineRight className={styles.outline_icon} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Tournament);
