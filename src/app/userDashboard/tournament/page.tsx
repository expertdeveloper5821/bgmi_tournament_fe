'use client'
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import {Button} from 'technogetic-iron-smart-ui'
import { decodeJWt } from '@/utils/globalfunctions';
import Image from 'next/image';
import sendRequest from '@/services/auth/auth_All_Api';

export interface IAppProps { }

function Tournament() {
  const [showModal, setShowModal] = useState(false);
  const [alldata,setData] = useState<any>([]);
  const [lastTournament, setLastTournament] = useState<any>(null);
  const [allTournaments, setAllTournaments] = useState<any>(null);
  const [regMatches, setRegMatches] = useState<any>('');
  const [gameName, setMatchName] = useState<any>('');
  const [gameType, setGameType] = useState<any>('');
  const [mapType, setMapType] = useState<any>('');
  const [version, setVersion] = useState<any>('');
  const [date, setDate] = useState<any>('');
  const [time, setTime] = useState<any>('');
  const [lastServival, setLastServival] = useState<any>('');

  const getAllTournaments = async () => {
    const token:any = localStorage.getItem('jwtToken');
    const decodedToken: any = decodeJWt(token)
    const tournamentResponse = await sendRequest('api/v1/room/rooms', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`  }
    });
    setData(tournamentResponse.data[0].rooms);  

    const registeredMatches = await sendRequest('api/v1/team/register-room/'+decodedToken.userId, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`  }
    });
    setRegMatches(registeredMatches.data.rooms);
  } 

  console.log('setRegMatches_________',regMatches)

  useEffect(()=>{
    getAllTournaments(); 
  },[])

  useEffect(()=>{
    setLastTournament(alldata[alldata.length - 1]);
    setAllTournaments(alldata?.slice(0,3));
  },[alldata])

  useEffect(()=>{
    setMatchName(lastTournament?.gameName);
    setGameType(lastTournament?.gameType);
    setMapType(lastTournament?.mapType);
    setVersion(lastTournament?.version);
    setVersion(lastTournament?.date);
    setTime(lastTournament?.time);
    setLastServival(lastTournament?.lastServival);
  },[lastTournament])

  const updateMainData = (gname:any, gType:any, mType:any, vType:any, mdate:any, mtime:any, lastServival:any) =>{
    setMatchName(gname);
    setGameType(gType);
    setMapType(mType);
    setVersion(vType);
    setDate(mdate);
    setTime(mtime);
    setLastServival(lastServival);
  }

  console.log('allTournaments_________',allTournaments);
  
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
              {/* <div className={styles.sort_btn}>
                <Image src='../assests/sort_button.svg' alt='sortButton' className={styles.wrapperimg} width={100} height={100}/>
              </div> */}

            </div>

          
          <div className={styles.room_wrapper}>
            <div className={styles.room_container}>
              <div className={styles.registeredmatches}>
                <div className={styles.imgSection}>
                  <Image src='../assests/userdashboardbg.svg' alt='userdashboardbg' className={styles.wrapperimg} width={100} height={100}/>
                </div>
                <span className={styles.register_match}>Registered  Matches</span>
              </div>
              <div className={styles.squad_match}>
                <span className={styles.register_match}>{gameName}</span>
                <span className={styles.winning_prize}>Time : {time} at {date}</span>

                <div className={styles.winnings}>

                  <div>
                    <span className={styles.winning_prize}>WINNING PRIZE</span>
                    <span className={styles.survival_content}> Last Survival: {lastServival}</span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}> Entry FEES</span>
                    <span className={styles.survival_content}> 50 <span className='rs_logo'><Image src='../assests/rupee-icon.svg' alt='rupeeIcon' width={12} height={12}/></span></span>

                  </div>
                </div>

                <div className={styles.winnings}>

                  <div>
                    <span className={styles.winning_prize}>TYPE</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>{gameType}</span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>VERSION</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>{version}</span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>MAP</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>{mapType}</span>
                  </div>
                </div>

                <div className={styles.winnings}>
                  <div className={styles.spot_line}>
                    <span className={styles.bar_font}> Only 30 spots Left</span>
                    <span className={styles.bar_font}>20/50</span>
                  </div>
                  <Button className={styles.join_button}   onClick={() => setShowModal(true)}> Join</Button>
                </div>
                <div className={styles.winnings}>
                  <div className={styles.slidebar}>
                    {
                      allTournaments &&  allTournaments.map((e:any)=><img src='../assests/cards.svg' alt='slides'  onClick={() => updateMainData(e.gameName, e.gameType, e.mapType, e.version, e.date, e.time, e.lastServival)}></img>)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container2}>

            {
              regMatches && regMatches.map((match:any)=>{
                return <>
                <img src='../assests/registeredmatches.svg' alt='slides'></img>
                  <div className={styles.Tournaments}>
                    <div className={styles.tournament_slider}>
                      <div className={styles.winning_prize}>
                        <span> TYPE</span>
                        <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>{match.gameType}</span>
                      </div>
                      <div className={styles.winning_prize}>
                        <span>Version</span>
                        <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>{match.version}</span>
                      </div>
                      <div className={styles.winning_prize}>
                        <span>MAP</span>
                        <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>{match.mapType}</span>
                      </div>
                    </div>
                    <div className={styles.room_create}>
                      <div className={styles.winning_prize}>
                        <span> Match start</span>
                        <span>{match.date}</span>
                      </div>
                      <div className={styles.winning_prize}>
                        <span>Time</span>
                        <span>{match.time}</span>
                      </div>
                    </div>
                    <div className={styles.id_password}>
                      <span>Room Id: {match.roomId}</span>
                      <span>Room password: {match.password}</span>
                    </div>
                  </div>
                </>
              })
            }
            


          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Tournament;
