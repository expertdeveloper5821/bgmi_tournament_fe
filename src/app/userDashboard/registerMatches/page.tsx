'use client';
import React, {useEffect, useState} from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import {Navbar} from '../../../Components/Navbar/Navbar';
// @ts-ignore
import {Button} from 'technogetic-iron-smart-ui';
import {decodeJWt} from '@/utils/globalfunctions';
import Image from 'next/image';
import sendRequest from '@/services/auth/auth_All_Api';
import jwtDecode from 'jwt-decode';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick';

export interface IAppProps {}
export interface RegMatch {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
}

function Tournament() {
  const [alldata, setData] = useState<any>([]);
  const [lastTournament, setLastTournament] = useState<RegMatch>();
  const [allTournaments, setAllTournaments] = useState<RegMatch[]>();
  const [gameName, setMatchName] = useState<String>();
  const [gameType, setGameType] = useState<String>();
  const [mapType, setMapType] = useState<String>();
  const [version, setVersion] = useState<String>();
  const [regMatches, setRegMatches] = useState<any>('');

  const getAllTournaments = async () => {
    const token: any = localStorage.getItem('jwttoken');
    const decodedToken: any = decodeJWt(token);
    const tournamentResponse = await sendRequest('api/v1/room/rooms', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });
    setData(tournamentResponse.data[0].rooms);

    const registeredMatches = await sendRequest(
      'api/v1/team/register-room/' + decodedToken.userId,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    setRegMatches(registeredMatches.data.rooms);
  };

  useEffect(() => {
    getAllTournaments();
  }, []);

  useEffect(() => {
    setLastTournament(alldata[alldata.length - 1]);
    setAllTournaments(alldata?.slice(0, 3));
  }, [alldata]);

  useEffect(() => {
    setMatchName(lastTournament?.gameName);
    setGameType(lastTournament?.gameType);
    setMapType(lastTournament?.mapType);
    setVersion(lastTournament?.version);
  }, [lastTournament]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken: any = localStorage.getItem('jwttoken');
        const decodedToken: any = jwtDecode(accessToken);
        const id = decodedToken.role._id;
        const response = await sendRequest(`api/v1/team/register-room/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.code === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateMainData = (
    gname: string,
    gType: string,
    mType: string,
    vType: string,
  ) => {
    setMatchName(gname);
    setGameType(gType);
    setMapType(mType);
    setVersion(vType);
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
          slidesToShow: 2,
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
                <span className={styles.head_desc}>Registered Matches</span>
                <h1 className={styles.subhead_desc}>
                  Dashboard /registered matches
                </h1>
              </div>
              <div className={styles.sendmailbtnContainer}>
                <button
                  className={styles.sendMailBtn}
                  // onClick={handleOpenFwdModal}
                >
                  SEND INVITE BY EMAIL
                </button>
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
                      width={100}
                      height={100}
                    />
                  </div>
                  <span className={styles.register_match}>
                    Registered Matches
                  </span>
                </div>
                <div className={styles.squad_match}>
                  <span className={styles.register_match}>{gameName}</span>
                  <span className={styles.winning_prize}>
                    Time : 02/08/2023 at 06:00pm
                  </span>

                  <div className={styles.winnings}>
                    <div>
                      <span className={styles.winning_prize}>
                        WINNING PRIZE
                      </span>
                      <span className={styles.survival_content}>
                        {' '}
                        Last Survival: 60
                      </span>
                    </div>

                    <div>
                      <span className={styles.winning_prize}> Entry FEES</span>
                      <span className={styles.survival_content}>
                        {' '}
                        50{' '}
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

                  <div className={styles.winnings}>
                    <div className={styles.spot_line}>
                      <span className={styles.bar_font}>
                        {' '}
                        Only 30 spots Left
                      </span>
                      <span className={styles.bar_font}>20/50</span>
                    </div>
                    <Button className={styles.join_button}> Join</Button>
                  </div>

                  <div className={styles.winnings}>
                    <div className={styles.roomdetails_container}>
                      <div className={styles.roomdetails}>
                        <div className={styles.countdown}>
                          <span>Match starts Within</span>
                          <h2>10 minutes</h2>
                          <span className={styles.roomId}>
                            Room Id : 123456787
                          </span>
                        </div>
                      </div>

                      <div className={styles.roomcreds}>
                        <div className={styles.zeromin}>
                          <h1>0</h1>
                          <span>Minutes</span>
                          <span className={styles.roomId}>
                            {' '}
                            Room Password : 263
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.Teammembers}>Your Team Members</div>
            <div className={styles.container2}>
              {/* {
                (settings.breakpoint = 790 ? ( */}
              <Slider {...settings}>
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
                          <h2>JOhn doe</h2>
                          <div className={styles.greenCircle}></div>
                        </div>
                        <p>akshay@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                          <h2>JOhn doe</h2>
                          <div className={styles.greenCircle}></div>
                        </div>
                        <p>akshay@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                          <h2>JOhn doe</h2>
                          <div className={styles.greenCircle}></div>
                        </div>
                        <p>akshay@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
              {/* ) : (
                  <>
                    <div className={styles.reviewsContainer}>
                      {' '}
                      <div className={styles.reviewCard}>
                        <div className={styles.reviews}>
                          <img
                            src="/assests/reviewman.svg"
                            alt="image"
                            className={styles.profile}
                          />
                          <div className={styles.reviewer}>
                            <div className={styles.name}>
                              <h2>JOhn doe</h2>
                              <div className={styles.greenCircle}></div>
                            </div>
                            <p>akshay@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.reviewsContainer}>
                      {' '}
                      <div className={styles.reviewCard}>
                        <div className={styles.reviews}>
                          <img
                            src="/assests/reviewman.svg"
                            alt="image"
                            className={styles.profile}
                          />
                          <div className={styles.reviewer}>
                            <div className={styles.name}>
                              <h2>JOhn doe</h2>
                              <div className={styles.greenCircle}></div>
                            </div>
                            <p>akshay@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.reviewsContainer}>
                      {' '}
                      <div className={styles.reviewCard}>
                        <div className={styles.reviews}>
                          <img
                            src="/assests/reviewman.svg"
                            alt="image"
                            className={styles.profile}
                          />
                          <div className={styles.reviewer}>
                            <div className={styles.name}>
                              <h2>JOhn doe</h2>
                              <div className={styles.greenCircle}></div>
                            </div>
                            <p>akshay@gmail.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tournament;
