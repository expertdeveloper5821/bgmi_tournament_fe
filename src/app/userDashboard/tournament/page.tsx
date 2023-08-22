'use client';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import {Navbar} from '../../../Components/Navbar/Navbar';
//@ts-ignore
import {Button} from 'technogetic-iron-smart-ui';
import {decodeJWt} from '@/utils/globalfunctions';
import Image from 'next/image';
import sendRequest from '@/services/auth/auth_All_Api';
//@ts-ignore
import {Input} from 'technogetic-iron-smart-ui';
import {AiOutlineDown, AiOutlineClose} from 'react-icons/ai';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick';

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

  const getAllTournaments = async () => {
    const token: any = localStorage.getItem('jwtToken');
    const decodedToken: any = decodeJWt(token);
    const tournamentResponse = await sendRequest('api/v1/room/rooms', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });
    setData(tournamentResponse.data[0].rooms);
  };

  const getRegisteredMatches = async () => {
    const token: any = localStorage.getItem('jwtToken');
    const decodedToken: any = decodeJWt(token);
    const registeredMatches = await sendRequest('api/v1/team/register-room ', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    setRegMatches(registeredMatches.data.rooms);
  };

  useEffect(() => {
    getAllTournaments();
    getRegisteredMatches();
  }, []);

  useEffect(() => {
    if (alldata) {
      setLastTournament(alldata[alldata.length - 1]);
      setAllTournaments(alldata.slice(0, 2));
    }
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
      const response = await sendRequest('api/v1/payment/create-payment', {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: {
          upiId: 'success@payment',
          matchAmount: 60,
          name: 'robin',
          id: '3dafaba5-a73d-4874-b138-bbc2abbef89d',
          roomid: roomId,
        },
      });
      if (response.status === 200) {
        console.log('Joined Successfully');
        getRegisteredMatches();
      } else {
        console.log('Payment Failed');
      }
    } catch (error: any) {
      console.log('Failed to sign up. Please try again.');
    }
  };

  const settings: any = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />

            <div className={styles.content}>
              <div className={styles.dashboard}>
                <span className={styles.head_desc}>Upcoming Matches</span>
                <h1 className={styles.subhead_desc}>
                  Dashboard/Upcoming Matches
                </h1>
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
                  <div className={styles.register_match}>
                    There is no room created till now
                  </div>
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
                              <AiOutlineDown
                                onClick={() => setPoolModal(true)}
                              />
                            </span>
                          </span>
                          {poolModal ? (
                            <div className={styles.main_winning_pool}>
                              <div className={styles.inner_winning_pool}>
                                <div className={styles.text_pool_cls}>
                                  <h1 className={styles.pool_heading}>
                                    WINNING PRIZE POOL
                                  </h1>
                                  <p className={styles.pool_para}>
                                    BGMI Squad match
                                  </p>
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
                                    2nd Winner: 100{' '}
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
                                  <AiOutlineClose
                                    className={styles.cancel_icon}
                                  />
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
                          <span className={styles.winning_prize}>
                            Entry FEES
                          </span>
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
                            style={{color: 'rgba(255, 214, 0, 1)'}}
                          >
                            {gameType}
                          </span>
                        </div>

                        <div>
                          <span className={styles.winning_prize}>VERSION</span>
                          <span
                            className={styles.tvm_font}
                            style={{color: 'rgba(255, 214, 0, 1)'}}
                          >
                            {version}
                          </span>
                        </div>
                        <div>
                          <span className={styles.winning_prize}>MAP</span>
                          <span
                            className={styles.tvm_font}
                            style={{color: 'rgba(255, 122, 0, 1)'}}
                          >
                            {mapType}
                          </span>
                        </div>
                      </div>
                      <div className={styles.spot_line_sec}>
                        <progress
                          className={styles.progress_cls}
                          id="file"
                          value="40"
                          max="100"
                        />
                      </div>
                      <div className={styles.winnings_sec_secton}>
                        <div className={styles.spot_line}>
                          <span className={styles.bar_font}>
                            Only 30 spots Left
                          </span>
                          <span className={styles.bar_font}>20/50</span>
                        </div>
                        <Button
                          className={styles.join_button}
                          onClick={() => addRegMatch(roomId)}
                        >
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
              <div className={styles.register_match}>
                There is no Registered Match till now
              </div>
            ) : (
              <>
                <div className={styles.container2}>
                  <Slider {...settings}>
                    {regMatches &&
                      regMatches.map((match: any, index: any) => (
                        <div className={styles.container3} key={index}>
                          <Image
                            src="../assests/registeredmatches.svg"
                            alt="slides"
                            className={styles.container3_img}
                            width={100}
                            height={100}
                          />
                          <div className={styles.Tournaments}>
                            <div className={styles.tournament_slider}>
                              <div className={styles.winning_prize}>
                                <span> TYPE</span>
                                <span
                                  className={styles.tvm_font}
                                  style={{color: 'rgba(255, 214, 0, 1)'}}
                                >
                                  {match?.gameType}
                                </span>
                              </div>
                              <div className={styles.winning_prize}>
                                <span>Version</span>
                                <span
                                  className={styles.tvm_font}
                                  style={{color: 'rgba(255, 214, 0, 1)'}}
                                >
                                  {match?.version}
                                </span>
                              </div>
                              <div className={styles.winning_prize}>
                                <span>MAP</span>
                                <span
                                  className={styles.tvm_font}
                                  style={{color: 'rgba(255, 122, 0, 1)'}}
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
                            <div className={styles.id_password}>
                              <span>Room Id: {match?.roomId}</span>
                              <span>Room password: {match?.password}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
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
