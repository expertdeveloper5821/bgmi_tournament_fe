'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import { decodeJWt } from '@/utils/globalfunctions';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { AiOutlineDown, AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import CountdownComponent from './CountdownComponent';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';

export interface tournament {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  date: string;
  time: string;
  lastServival: string;
  roomUuid: string;
  mapImg: string;
}

function Tournament() {
  const [poolModal, setPoolModal] = useState(false);
  const [alldata, setData] = useState<any>([]);
  const [lastTournament, setLastTournament] = useState<tournament>();
  const [allTournaments, setAllTournaments] = useState<[]>();
  const [regMatches, setRegMatches] = useState<any>('');
  const [gameName, setMatchName] = useState<String>('');
  const [gameType, setGameType] = useState<String>('');
  const [mapType, setMapType] = useState<String>('');
  const [version, setVersion] = useState<String>('');
  const [date, setDate] = useState<String>('');
  const [time, setTime] = useState<String>('');
  const [lastServival, setLastServival] = useState<String>('');
  const [roomId, setRoomId] = useState<String>('');
  const [mapImg, setMapImg] = useState<String>('');
  const [matchIndex, setMatchIndex] = useState<number[]>([]);

  const router = useRouter();
  const regMatchRedirect = (matchID: string) => {
    console.log('regMatchRedirect');
    router.push(`/userDashboard/registerMatches?id=${matchID}`);
  };
  const getAllTournaments = async () => {
    const token: any = localStorage.getItem('jwtToken');
    const roomids = localStorage.getItem('roomIds');
    const decodedToken: any = decodeJWt(token);
    const tournamentResponse = await sendRequest('room/rooms', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const filteredDataArray = tournamentResponse.data.filter(
      (item: { roomUuid: string; roomid: string }) => !roomids?.includes(item.roomUuid),
    );

    setData(filteredDataArray);
  };

  const getRegisteredMatches = async () => {
    const token: any = localStorage.getItem('jwtToken');
    const decodedToken: any = decodeJWt(token);
    const registeredMatches = await sendRequest('team/register-room ', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    setRegMatches(registeredMatches.data.rooms);
  };

  const getRoomidPwd = () => {
    var selectedMatchIndexes: number[] = [];
    for (let i = 0; i < regMatches.length; i++) {
      const currentTime = new Date();
      const dbTime = `${regMatches[i]?.date}T${regMatches[i]?.time}`;
      const matchTime = new Date(dbTime);
      const timeDifference = Number(matchTime) - Number(currentTime);
      if (timeDifference <= 900000) {
        console.log('timeDifference_', timeDifference);
        selectedMatchIndexes.push(i);
      }
    }
    setMatchIndex(selectedMatchIndexes);
  };

  useEffect(() => {
    getAllTournaments();
    getRegisteredMatches();
  }, []);

  useEffect(() => {
    setLastTournament(alldata[alldata.length - 1]);
    setAllTournaments(alldata?.slice(0, 2));
    getRegisteredMatches();
    getRoomidPwd();
  }, [alldata]);

  useEffect(() => {
    if (lastTournament) {
      setMatchName(lastTournament?.gameName);
      setGameType(lastTournament?.gameType);
      setMapType(lastTournament?.mapType);
      setVersion(lastTournament?.version);
      setDate(lastTournament?.date);
      setTime(lastTournament?.time);
      setLastServival(lastTournament?.lastServival);
      setRoomId(lastTournament?.roomUuid);
      setMapImg(lastTournament?.mapImg);
    }
  }, [lastTournament]);

  const updateMainData = (
    gname: string,
    gType: string,
    mType: string,
    vType: string,
    mdate: string,
    mtime: string,
    lastServival: string,
    roomid: string,
    mapImg: string,
  ) => {
    setMatchName(gname);
    setGameType(gType);
    setMapType(mType);
    setVersion(vType);
    setDate(mdate);
    setTime(mtime);
    setLastServival(lastServival);
    setRoomId(roomid);
    setMapImg(mapImg);
  };

  const addRegMatch = async (roomId: any) => {
    try {
      const token: any = localStorage.getItem('jwtToken');
      const decodedToken: any = decodeJWt(token);
      const userId = decodedToken.userId;

      var addRoom = localStorage.getItem('roomIds');
      var obj = [];
      if (addRoom) {
        obj = JSON.parse(addRoom);
      }
      obj.push(roomId);
      localStorage.setItem('roomIds', JSON.stringify(obj));

      const response = await sendRequest('payment/create-payment', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          upiId: 'success@payment',
          matchAmount: 60,
          name: 'robin',
          id: '3dafaba5-a73d-4874-b138-bbc2abbef89d',
          roomid: roomId,
        },
      });
      if (response.status === 200) {
        getAllTournaments();
        //getRegisteredMatches();
        toast.success('Contest Joined Successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
        });
      } else {
        console.log('Payment Failed');
      }
    } catch (error: any) {
      console.log('Failed to sign up. Please try again.');
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
        setNumItemsToShow(2);
      } else {
        setNumItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.content}>
              <div className={styles.dashboard}>
                <span className={styles.head_desc}>Upcoming Matches</span>
                <h1 className={styles.subhead_desc}>Dashboard/Upcoming Matches</h1>
              </div>
            </div>
            <div className={styles.room_wrapper}>
              <div className={styles.room_container}>
                <div className={styles.registeredmatches}>
                  <div className={styles.imgSection}>
                    <Image
                      src="../assests/userdashboardbg.svg"
                      alt="userdashboardbg"
                      className={styles.wrapperimg}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
                {alldata && alldata.length === 0 ? (
                  <div className={styles.register_match}>There is no room created till now</div>
                ) : (
                  <>
                    <div className={styles.squad_match}>
                      <span className={styles.register_match}>{gameName}</span>
                      <span className={styles.winning_prize}>
                        Time : {date} at {time}
                      </span>
                      <div className={styles.winnings}>
                        <div>
                          <span className={styles.winning_prize}>
                            WINNING PRIZE
                            <span>
                              <AiOutlineDown onClick={() => setPoolModal(true)} />
                            </span>
                          </span>
                          {poolModal ? (
                            <div className={styles.main_winning_pool}>
                              <div className={styles.inner_winning_pool}>
                                <div className={styles.text_pool_cls}>
                                  <h1 className={styles.pool_heading}>WINNING PRIZE POOL</h1>
                                  <p className={styles.pool_para}>BGMI Squad match</p>
                                </div>
                                <div className={styles.pool_cancel_p}>
                                  <p className={styles.pool_text_p}>
                                    Last Survival: 200
                                    <span className={styles.rs_pool_logo}>
                                      <Image
                                        src="../assests/rupee-icon.svg"
                                        alt="rupeeIcon"
                                        width={12}
                                        height={12}
                                      />
                                    </span>
                                  </p>
                                  <p className={styles.pool_text_p}>
                                    Highest kill: 200
                                    <span className={styles.rs_pool_logo}>
                                      <Image
                                        src="../assests/rupee-icon.svg"
                                        alt="rupeeIcon"
                                        width={12}
                                        height={12}
                                      />
                                    </span>
                                  </p>
                                  <p className={styles.pool_text_p}>
                                    2nd Winner: 100
                                    <span className={styles.rs_pool_logo}>
                                      <Image
                                        src="../assests/rupee-icon.svg"
                                        alt="rupeeIcon"
                                        width={12}
                                        height={12}
                                      />
                                    </span>
                                  </p>
                                  <p className={styles.pool_text_p}>
                                    3nd Winner: 60{' '}
                                    <span className={styles.rs_pool_logo}>
                                      <Image
                                        src="../assests/rupee-icon.svg"
                                        alt="rupeeIcon"
                                        width={12}
                                        height={12}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <p
                                  className={styles.pool_cancel_p}
                                  onClick={() => setPoolModal(false)}
                                >
                                  <AiOutlineClose className={styles.cancel_icon} />
                                </p>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                          <span className={styles.survival_content}>
                            Last Survival: {lastServival}
                            <span className="rs_logo">
                              <Image
                                src="../assests/rupee-icon.svg"
                                alt="rupeeIcon"
                                width={12}
                                height={12}
                              />
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className={styles.winning_prize}>Entry FEES</span>
                          <span className={styles.survival_content}>
                            50
                            <span className="rs_logo">
                              <Image
                                src="../assests/rupee-icon.svg"
                                alt="rupeeIcon"
                                width={12}
                                height={12}
                              />
                            </span>
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
                            {gameType}
                          </span>
                        </div>
                        <div>
                          <span className={styles.winning_prize}>VERSION</span>
                          <span
                            className={styles.tvm_font}
                            style={{ color: 'rgba(255, 214, 0, 1)' }}
                          >
                            {version}
                          </span>
                        </div>
                        <div>
                          <span className={styles.winning_prize}>MAP</span>
                          <span
                            className={styles.tvm_font}
                            style={{ color: 'rgba(255, 122, 0, 1)' }}
                          >
                            {mapType}
                          </span>
                        </div>
                      </div>
                      <div className={styles.spot_line_sec}>
                        <progress className={styles.progress_cls} id="file" value="40" max="100" />
                      </div>
                      <div className={styles.winnings_sec_secton}>
                        <div className={styles.spot_line}>
                          <span className={styles.bar_font}>Only 30 spots Left</span>
                          <span className={styles.bar_font}>20/50</span>
                        </div>
                        <Button className={styles.join_button} onClick={() => addRegMatch(roomId)}>
                          Join
                        </Button>
                      </div>

                      <div className={styles.winnings_sec_slider}>
                        <div className={styles.game_imgsection}>
                          {allTournaments &&
                            allTournaments.map((e: any, index: any) => (
                              <Image
                                key={index}
                                width={100}
                                height={100}
                                className={styles.img_slider_one}
                                src="../assests/cards.svg"
                                alt="slides"
                                onClick={() =>
                                  updateMainData(
                                    e.gameName,
                                    e.gameType,
                                    e.mapType,
                                    e.version,
                                    e.date,
                                    e.time,
                                    e.lastServival,
                                    e.roomUuid,
                                    e.mapImg,
                                  )
                                }
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <span className={styles.register_match}>Registered Matches</span>
            {!regMatches.length ? (
              <div className={styles.register_match}>There is no Registered Match till now</div>
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
                          .map((match: any, index: any) => (
                            <div key={index} className={`${styles.slide}`}>
                              <div className={styles.container3} key={index}>
                                <Image
                                  src="../assests/registeredmatches.svg"
                                  alt="slides"
                                  className={styles.container3_img}
                                  width={100}
                                  height={100}
                                  onClick={() => regMatchRedirect(match?._id)}
                                />
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
                                      <span>{match?.date}</span>
                                    </div>
                                    <div className={styles.winning_prize}>
                                      <span>Time</span>
                                      <span>{match?.time}</span>
                                    </div>
                                  </div>
                                  {matchIndex.length != 0 && matchIndex.includes(index) ? (
                                    <div className={styles.id_password}>
                                      <span>Room Id: {match?.roomId}</span>
                                      <span>Room password: {match?.password}</span>
                                    </div>
                                  ) : (
                                    <div className={styles.id_password}>
                                      <span>Room Id: *******</span>
                                      <span>Room password: *******</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tournament;
