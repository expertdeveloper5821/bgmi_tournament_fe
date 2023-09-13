'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';

export interface RegMatch {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  date: string;
  time: string;
  lastServival: string;
  roomId: string;
  password: string;
}

const regMatches = () => {
  const searchParams = useSearchParams();
  const matchID = searchParams.get('id');
  const [matchData, setMatchData] = useState<RegMatch>();
  const [showRoomPwd, setRoomPwd] = useState<boolean>(false);
  const getRegisterMatchWithId = async () => {
    const token: any = localStorage.getItem('jwtToken');
    const regMAtch = await sendRequest(`room/rooms/${matchID}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    setMatchData(regMAtch.data.room);
  };

  const getRoomidPwd = () => {
    const currentTime = new Date();
    const dbTime = `${matchData?.date}T${matchData?.time}`;
    const matchTime = new Date(dbTime);
    const timeDifference = Number(matchTime) - Number(currentTime);
    if (timeDifference <= 900000) {
      setRoomPwd(true);
    }
  };

  useEffect(() => {
    getRegisterMatchWithId();
  }, []);

  useEffect(() => {
    getRoomidPwd();
  }, [matchData]);

  return (
    <div className={styles.main_container}>
      <div className={styles.abcd}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.content}>
            <div className={styles.dashboard}>
              <span className={styles.head_desc}>Registered Matches</span>
              <h1 className={styles.subhead_desc}>Dashboard /registered matches</h1>
            </div>
            <div className={styles.sendmailbtnContainer}>
              {/* <button
                  className={styles.sendMailBtn}
                  // onClick={handleOpenFwdModal}
                >
                  SEND INVITE BY EMAIL
                </button> */}
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
                <span className={styles.register_match}>Registered Matches</span>
              </div>
              <div className={styles.squad_match}>
                <span className={styles.register_match}>{matchData?.gameName}</span>
                <span className={styles.winning_prize}>
                  Time : {matchData?.date} at {matchData?.time}
                </span>

                <div className={styles.winnings}>
                  <div>
                    <span className={styles.winning_prize}>WINNING PRIZE</span>
                    <span className={styles.survival_content}>
                      Last Survival: {matchData?.lastServival}
                    </span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}> Entry FEES</span>
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
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>
                      {matchData?.gameType}
                    </span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>VERSION</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>
                      {matchData?.version}
                    </span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>MAP</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>
                      {matchData?.mapType}
                    </span>
                  </div>
                </div>

                <div className={styles.winnings}>
                  <div className={styles.spot_line}>
                    <span className={styles.bar_font}>Only 30 spots Left</span>
                    <span className={styles.bar_font}>20/50</span>
                  </div>
                </div>

                <div className={styles.winnings}>
                  {showRoomPwd ? (
                    <div className={styles.roomdetails_container}>
                      <div className={styles.roomdetails}>
                        <div className={styles.countdown}>
                          <span className={styles.roomId}>Room Id : {matchData?.roomId}</span>
                        </div>
                      </div>
                      <div className={styles.roomcreds}>
                        <div className={styles.zeromin}>
                          <span className={styles.roomId}>
                            Room Password : {matchData?.password}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.roomdetails_container}>
                      <div className={styles.roomdetails}>
                        <div className={styles.countdown}>
                          <span className={styles.roomId}>Room Id : ********</span>
                        </div>
                      </div>
                      <div className={styles.roomcreds}>
                        <div className={styles.zeromin}>
                          <span className={styles.roomId}>Room Password : ********</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.Teammembers}>Your Team Members</div> */}

          {/* <div className={styles.container2}>
              <div className={styles.inner_cont}>
                {/* <div key={index} className={`${styles.slide}`}> */}
          {/* <div className={styles.reviewsContainer}>
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
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div> */}

          {/* <div className={styles.reviewsContainer}>
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
                </div> */}
          {/* </div> */}
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
