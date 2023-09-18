'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import RequireAuthentication from '../../../utils/requireAuthentication';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { Navbar } from '../../../Components/Navbar/Navbar';
//@ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import { decodeJWt } from '@/utils/globalfunctions';
import Image from 'next/image';
import { sendRequest } from '@/services/auth/auth_All_Api';
import {
  AiOutlineDown,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import CountdownComponent from './CountdownComponent';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { number } from 'yup';
import { formatDate, formatTime } from '../../../Components/CommonComponent/moment';

export interface tournament {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  dateAndTime: Date | string;
  roomId: string;
 lastsurvival: string;
  roomUuid: string;
  mapImg: string;
}

function Tournament() {
  const [poolModal, setPoolModal] = useState(false);
  const [alldata, setData] = useState<any>([]);
  const [lastTournament, setLastTournament] = useState<tournament>();
  const [allTournaments, setAllTournaments] = useState<[]>([]);
  const [regMatches, setRegMatches] = useState<any>('');
  // const [gameName, setMatchName] = useState<string>('');
  // const [gameType, setGameType] = useState<string>('');
  // const [mapType, setMapType] = useState<string>('');
  // const [version, setVersion] = useState<string>('');
  // const [date, setDate] = useState<string>('');
  // const [time, setTime] = useState<string>("");
  // const [lastServival, setLastServival] = useState<string>('');
  // const [roomId, setRoomId] = useState<string>('');
  // const [mapImg, setMapImg] = useState<string>('');
  const [matchIndex, setMatchIndex] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
    const initialValues:tournament = {
    gameName:"", mapType:"", gameType:"", version:"", roomUuid:"",  dateAndTime:new Date(), lastsurvival:"" , roomId:"", mapImg:""
  }
  const [matchDetails , setMatchDetails] = useState<tournament>(initialValues)


  const router = useRouter();
  const regMatchRedirect = (matchID: string) => {

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
      (item: { roomUuid: string; roomid: string }) =>
        !roomids?.includes(item.roomUuid),
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
  

  useEffect(() => {
    getAllTournaments();
    getRegisteredMatches();
  }, []);

  useEffect(() => {
    setLastTournament(alldata[alldata.length - 1]);
    setAllTournaments(alldata?.slice(0, 50));
    getRegisteredMatches();
   // getRoomidPwd();
  }, [alldata]);


  useEffect(() => {
    const format =` ${formatDate({ date: lastTournament?.dateAndTime})} and ${formatTime({time: lastTournament?.dateAndTime, format : 'LT'})}`
   
    if (lastTournament) {
      setMatchDetails({
        ...matchDetails,
        gameName: lastTournament?.gameName,
        gameType: lastTournament?.gameType,
        mapType: lastTournament?.mapType,
        version: lastTournament?.version,
        roomId: lastTournament?.roomId,
        dateAndTime: format,
        lastsurvival: lastTournament?.lastsurvival,
        mapImg: lastTournament?.mapImg
      });
    }
  }, [lastTournament]);

  const updateMainData = (
    gname: string,
    gType: string,
    mType: string,
    vType: string,
    mdate:string,
    dateandtime: Date,
    mtime: string,
    roomUid: string,
    lastsurvival: string,
    roomid: string,
    mapImg: string,
  ) => {
    
    const updatedformattedDandt = ` ${formatDate({ date: mdate })} and ${formatTime({ time: mtime  , format : 'LT' })}`;
    setMatchDetails({gameName:gname, mapType: mType, gameType:gType , version:vType , dateAndTime:updatedformattedDandt, lastsurvival:lastsurvival, roomId:roomid , roomUuid:roomUid, mapImg:mapImg })
   
  };

  

  const addRegMatch = async (roomId: any) => {
    setIsLoading(true);
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
        setIsLoading(false)
      } else {
        console.log('Payment Failed');
      }
    } catch (error: any) {
      toast.success(error)
      
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

  const getIdPass = ( dateAndTime :string, password:string , roomId:string )=> {
   const REDUCE_TIME = 15 * 60 * 1000;
    const currentTime = new Date().getTime();
   let dateNumber = new Date(dateAndTime).getTime();
    const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
    if (currentTime >= reducedTime) {
       return { roomId:roomId , password:password}
    } else {
       return { roomId: "*******", password: "********" }
    }
  };


  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar setUserName={setUserName} />
              <div className={styles.content}>
                <div className={styles.dashboard}>
                  <h1 className={styles.page_title}>Welcome <span className={styles.fullname_title}>{userName}</span></h1>
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
                    <div className={styles.register_match_room}>
                      There is no room created till now
                    </div>
                  ) : (
                 <div>
                      <div className={styles.squad_match}>
                        <div className={styles.inner_squad_match}>
                          <span className={styles.register_match_gamename}>{matchDetails?.gameName}</span>
                          <span className={styles.winning_prize}>
                            Time: {matchDetails?.dateAndTime.toString()} 
                            
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
                                        3nd Winner: 60
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
                                Last Survival:
                                <span className={styles.rs_logo}>
                                  <Image
                                    src="../assests/rupee-icon.svg"
                                    alt="rupeeIcon"
                                    width={12}
                                    height={12}
                                  />
                                </span>
                                {matchDetails?.lastsurvival}
                              </span>
                            </div>
                            <div>
                              <span className={styles.winning_prize}>
                                Entry FEES
                              </span>
                              <span className={styles.survival_content}>

                                <span className="rs_logo">
                                  <Image
                                    src="../assests/rupee-icon.svg"
                                    alt="rupeeIcon"
                                    width={12}
                                    height={12}
                                  />
                                </span>
                                50
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
                                {matchDetails?.gameType}
                              </span>
                            </div>
                            <div>
                              <span className={styles.winning_prize}>VERSION</span>
                              <span
                                className={styles.tvm_font}
                                style={{ color: 'rgba(255, 214, 0, 1)' }}
                              >
                                {matchDetails?.version}
                              </span>
                            </div>
                            <div>
                              <span className={styles.winning_prize}>MAP</span>
                              <span
                                className={styles.tvm_font}
                                style={{ color: 'rgba(255, 122, 0, 1)' }}
                              >
                                {matchDetails?.mapType}
                              </span>
                            </div>
                          </div>
                          <div className={styles.spot_line_sec}>

                            {/* <progress
                          className={styles.progress_cls}
                          id="file"
                          value="40"
                          max="100"
                        /> */}
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
                              onClick={() => addRegMatch(matchDetails?.roomId)}
                            >
                              {isLoading ? 'Loading...' : 'Join'}
                            </Button>
                          </div>
                        </div>
                        <div className={styles.winnings_sec_slider}>

                          <div className={styles.game_imgsection}>
                            {allTournaments &&
                              allTournaments.map((e: any, index: number) => (
                                    
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
                                      e.dateAndTime, 
                                      new Date(e.dateAndTime), 
                                      e.mtime,
                                      e.lastServival,
                                      e.roomid,
                                      e.roomUuid,
                                      e.mapImg,
                                    )
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
                              
                              const { roomId, password } = getIdPass( match?.dateAndTime ,match?.roomId, match?.password)
                              return (
                                <div className={styles.container3} key={index} >

                                  <Image
                                    src="../assests/registeredmatches.svg"
                                    alt={`${styles.slide}`}
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
                                        <span>{formatDate({ date:match?.dateAndTime })}</span>
                                      </div>
                                      <div className={styles.winning_prize}>
                                        <span>Time</span>
                                        <span>{formatTime({ time: match?.dateAndTime , format : 'LT' })}</span>

                                      </div>
                                    </div>
                                    <div className={styles.id_password}>
                                    
                                      <span>Room Id: {roomId}</span>
                                      <span>Room password: {password}</span>
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
      </RequireAuthentication>
    </>
  );
}

export default withAuth(Tournament);
