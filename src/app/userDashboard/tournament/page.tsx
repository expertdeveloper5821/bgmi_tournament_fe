'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { Navbar } from '@/components/CommonComponent/Navbar/Navbar';
//@ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { formatDate, formatTime } from '../../../Components/CommonComponent/moment';
import { configData } from '@/utils/config';
import MatchComponent from '@/Components/MatchComponent/MatchComponent';


export interface tournament {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  dateAndTime: Date | string;
  roomId: string;
  lastSurvival: string;
  roomUuid: string;
  mapImg: string;
  entryFee?: string;
  highestKill: string;
  secondWin: string;
  thirdWin: string;
}

function Tournament() {
  const [poolModal, setPoolModal] = useState(false);
  const [allRoomsData, setAllRoomsData] = useState<any>([]);
  const [regMatches, setRegMatches] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleRooms, setVisibleRooms] = useState([])
  const initialValues: tournament = {
    gameName: "",
    mapType: "",
    gameType: "",
    version: "",
    roomUuid: "",
    dateAndTime: new Date(),
    lastSurvival: "",
    roomId: "",
    mapImg: "",
    entryFee: '',
    highestKill: '',
    secondWin: '',
    thirdWin: ''

  }
  const [matchDetails, setMatchDetails] = useState<tournament>(initialValues)
  const router = useRouter();
  const regMatchRedirect = (matchID: string) => {
    router.push(`/userDashboard/registerMatches?id=${matchID}`);
  };

  const getAllTournaments = async () => {
    try {
      const res = await sendRequest('room/rooms', {
        method: 'GET',
      });

      if (res.status === 200 || res.status === 201) {
        if (res.data.length > 0) {
          const lastTournament = res.data[res.data.length - 1]
          const formatDateTime = ` ${formatDate({ date: lastTournament?.dateAndTime })} and ${formatTime({ time: lastTournament?.dateAndTime, format: 'LT' })}`
          setAllRoomsData(res.data);
          // setMatchDetails({...res.data[0], dateAndTime: formatDateTime})
        }
      } else {
        if (res.status === 204) {
          setAllRoomsData([])
        } else {
          throw Error()
        }
      }

    } catch (err) {
      console.error("Error in Get All Tournaments => ", err)
      toast.error('Something went wrong, please try again later!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }

  };

  const getRegisteredMatches = async () => {
    try {
      const registeredMatchesRes = await sendRequest('team/register-room ', {
        method: 'GET',
      });
      if (registeredMatchesRes.status === 200 || registeredMatchesRes.status === 201) {
        setRegMatches(registeredMatchesRes.data.rooms);
      } else {
        if (registeredMatchesRes.status === 204) {
          setRegMatches([])
        } else {
          throw Error()
        }
      }
    } catch (err) {
      console.error("Error in Get All Registered Tournaments => ", err)
      toast.error('Something went wrong, please try again later!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }


  };

  useEffect(() => {
    getAllTournaments();
    getRegisteredMatches();
  }, []);

  const updateMainData = (match: tournament
  ) => {
    const updatedformattedDandt = ` ${formatDate({ date: match?.dateAndTime })} and ${formatTime({ time: match?.dateAndTime, format: 'LT' })}`;
    setMatchDetails({
      ...match,
      dateAndTime: updatedformattedDandt
    })
  };

  const addRegMatch = async (match: tournament) => {
    setIsLoading(true);
    try {
      const userData: any = JSON.parse(localStorage.getItem('userData'));
      const response = await sendRequest('payment/create-payment', {
        method: 'POST',
        data: {
          upiId: 'success@payment',
          matchAmount: 60,
          name: userData.fullName,
          id: configData.paymentID,
          roomid: match?.roomUuid,
        },
      });

      if (response.status === 200) {
        getAllTournaments();
        getRegisteredMatches()
        toast.success('Contest Joined Successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
        });
        setIsLoading(false)
      } else {
        throw Error()
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error('Already registered', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  const [numItemsToShow, setNumItemsToShow] = useState(1);

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getIdPass = (dateAndTime: string, roomUuid: string) => {
    if (dateAndTime && roomUuid) {
      setInterval(() => {
        const REDUCE_TIME = 15 * 60 * 1000;
        const currentTime = new Date().getTime();
        let dateNumber = new Date(dateAndTime).getTime();
        const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
        if (currentTime >= reducedTime) {
          setVisibleRooms([...visibleRooms, roomUuid])
        }
      }, 60000)
    }
  };

  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.abcd}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.content}>
            <div className={styles.dashboard}>
              {/* <h1 className={styles.page_title}>Welcome <span className={styles.fullname_title}>{userName}</span></h1> */}
              <span className={styles.head_desc}>Upcoming Matches</span>
              <small className={styles.subhead_desc}>
                Dashboard / Upcoming Matches
              </small>
            </div>
          </div>
          <div className={styles.room_wrapper}>
            <div className={styles.room_container}>
              <div className={styles.registeredmatches}>
                <div className={styles.imgSection}>
                  <Image
                    src={matchDetails?.mapImg || "../assests/userdashboardbg.svg"}
                    alt="userdashboardbg"
                    className={styles.wrapperimg}
                    width={200}
                    height={200}
                  />
                </div>
              </div>


              {allRoomsData && allRoomsData.length === 0 ? (
                <div className={styles.register_match_room}>
                  There is no room created till now
                </div>
              ) : (
                <div>  
                  <div className={styles.squad_match}>
                    <div className={styles.inner_squad_match}>
                    <MatchComponent gameName={matchDetails?.gameName} dateAndTime={matchDetails?.dateAndTime.toString()} lastSurvival={matchDetails?.lastSurvival} highestKill={matchDetails?.highestKill} secondWin={matchDetails?.secondWin} thirdWin={matchDetails?.thirdWin} entryFee={matchDetails?.entryFee} gameType={matchDetails?.gameType} version={matchDetails?.version} mapType={matchDetails?.mapType} />
                      <div className={styles.spot_line_sec}>
                      
                      </div>
                      <div className={styles.winnings_sec_secton}>
                        <div className={styles.spot_line}>
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
                    <div className={styles.winnings_sec_slider}>

                      <div className={styles.game_imgsection}>
                        {allRoomsData &&
                          allRoomsData.map((match: tournament, index: number) => (

                            <Image
                              key={index}
                              width={100}
                              height={100}
                              className={styles.img_slider_one}
                              src={match?.mapImg || "../assests/cards.svg"}
                              alt="slides"
                              onClick={() =>
                                updateMainData(match)
                              }
                            />
                          ))}
                      </div>

                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
          <span className={styles.register_match_title}>Registered Matches</span>
          {!regMatches.length ? (
            <div className={styles.register_match}>
              There is no Registered Match till now
            </div>
          ) : (
            <>
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
                        .map((match: any, index: any) => {
                        getIdPass(match.dateAndTime, match.roomUuid)
                          return (
                            <div className={styles.container3} key={index} >
                              <div className={styles.reg_match_image_container}>
                                <Image
                                  src={match?.mapImg || "../assests/registeredmatches.svg"}
                                  alt={`${styles.slide}`}
                                  className={styles.container3_img}
                                  width={100}
                                  height={100}
                                  onClick={() => regMatchRedirect(match?._id)}
                                />
                              </div>
                              <div className={styles.Tournaments}>
                                <div className={styles.tournament_slider}>
                                  <div className={styles.winning_prize}>
                                    <span> TYPE</span>
                                    <span
                                      className={styles.tvm_font}
                                      style={{ color: 'rgba(255, 214, 0, 1)' }}
                                    >
                                      {match?.gameType}
                                    </span>
                                  </div>
                                  <div className={styles.winning_prize}>
                                    <span>Version</span>
                                    <span
                                      className={styles.tvm_font}
                                      style={{ color: 'rgba(255, 214, 0, 1)' }}
                                    >
                                      {match?.version}
                                    </span>
                                  </div>
                                  <div className={styles.winning_prize}>
                                    <span>MAP</span>
                                    <span
                                      className={styles.tvm_font}
                                      style={{ color: 'rgba(255, 122, 0, 1)' }}
                                    >
                                      {match?.mapType}
                                    </span>
                                  </div>
                                </div>
                                <div className={styles.room_create}>
                                  <div className={styles.winning_prize}>
                                    <span> Match start Date </span>
                                    <span>{formatDate({ date: match?.dateAndTime })}</span>
                                  </div>
                                  <div className={styles.winning_prize}>
                                    <span>Time</span>
                                    <span>{formatTime({ time: match?.dateAndTime, format: 'LT' })}</span>

                                  </div>
                                </div>
                                <div className={styles.id_password}>

                                  <span>Room Id: {visibleRooms?.find(room => room === match.roomUuid) ? match.roomId : '*****'}</span>
                                  <span>Room password: {visibleRooms?.find(room => room === match.roomUuid) ? match.password : '*****'}</span>
                                </div>

                              </div>
                              <div className={styles.container_btn}>
                                <button
                                  onClick={goToPrevSlide}
                                  className={styles.prevButton_small}
                                  disabled={currentIndex === 0}

                                >
                                  <AiOutlineLeft className={styles.outline_icon} />
                                </button>
                                <button
                                  onClick={goToNextSlide}
                                  className={styles.nextButton_small}
                                  disabled={
                                    currentIndex === regMatches.length - numItemsToShow
                                  }
                                >
                                  <AiOutlineRight className={styles.outline_icon} />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                  <button
                    onClick={goToNextSlide}
                    className={styles.nextButton}
                    disabled={
                      currentIndex === regMatches.length - numItemsToShow
                    }
                  >
                    <AiOutlineRight className={styles.outline_icon} />
                  </button>


                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Tournament);
