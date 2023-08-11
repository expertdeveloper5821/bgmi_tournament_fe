'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
// @ts-ignore
import { Pagination, Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import sendRequest from '@/services/auth/auth_All_Api';
import { useRouter } from 'next/navigation';
import apiServices from '@/services/api/apiServices';

export interface IAppProps { }

function Tournament() {

  const router = useRouter();

  const handleVerifyTokenInLogin = async (token: any) => {
    try {
      const verifyResponse = await sendRequest("auth/verify/?" + `token=${token}`, {
        method: "GET",
      });
      console.log("verifyResponse", verifyResponse);
      if (verifyResponse.status === 200) {
        router.push("/adminDashboard");
      } else {

      }
    } catch (error) {

    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQzM2JmZDBkMGVkNGZlNmZhNTIzYmUiLCJyb2xlIjpbeyJfaWQiOiI2NGM3ODU5MjI2ZmM2NWJjMGYzY2NiMmIiLCJyb2xlIjpbInNwZWN0YXRvciJdfV0sImlhdCI6MTY5MTY2NTU0MCwiZXhwIjoxNjkxNjY5MTQwfQ.llaU04_-NEFYld0TQGxMIcozrH1o_4YtgpPZTs-_RPU';
    console.log('NOTWorking______________________');
    if(token){
      localStorage.setItem("jwtToken",token);
      handleVerifyTokenInLogin(token)
      console.log('Working______________________');
    }
  }, [])
  
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
                <span className={styles.register_match}>BGMI  SQUAD MATCH</span>
                <span className={styles.winning_prize}>Time : 02/08/2023 at 06:00pm</span>

                <div className={styles.winnings}>

                  <div>
                    <span className={styles.winning_prize}>WINNING PRIZE</span>
                    <span className={styles.survival_content}> Last Survival: 60</span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}> Entry FEES</span>
                    <span className={styles.survival_content}> 50 <span className='rs_logo'><Image src='../assests/rupee-icon.svg' alt='rupeeIcon' width={12} height={12}/></span></span>

                  </div>
                </div>

                <div className={styles.winnings}>

                  <div>
                    <span className={styles.winning_prize}>TYPE</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>Tournaments</span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>VERSION</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>TPP</span>
                  </div>

                  <div>
                    <span className={styles.winning_prize}>MAP</span>
                    <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>Erangel</span>
                  </div>
                </div>

                <div className={styles.winnings}>
                  <div className={styles.spot_line}>
                    <span className={styles.bar_font}> Only 30 spots Left</span>
                    <span className={styles.bar_font}>20/50</span>
                  </div>
                  <Button className={styles.join_button}> Join</Button>
                </div>


                <div className={styles.winnings}>
                  <div className={styles.slidebar}>
                    <img src='../assests/cards.svg' alt='slides'></img>
                    <img src='../assests/cards3.svg' alt='slides'></img>
                    <img src='../assests/cards.svg' alt='slides'></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container2}>
            <img src='../assests/registeredmatches.svg' alt='slides'></img>
            {/* <div className={styles.image_text}>
              <span>30/100</span>
              <div>
                <span>BGMI Squad Match</span>
                <span className={styles.view_more} style={{ color: 'rgba(255, 122, 0, 1)' }}>view more</span>
              </div>
            </div> */}
            <div className={styles.Tournaments}>
              <div className={styles.tournament_slider}>
                <div className={styles.winning_prize}>
                  <span> TYPE</span>
                  <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}> Tournaments</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>Version</span>
                  <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>TPP</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>MAP</span>
                  <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>Erangel</span>
                </div>
              </div>
              <div className={styles.room_create}>
                <div className={styles.winning_prize}>
                  <span> Match start within </span>
                  <span>10 minutes</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>0</span>
                  <span>Minutes</span>
                </div>



              </div>
              <div className={styles.id_password}>
                <span>Room Id: 5263487</span>
                <span>Room password: 263</span>
              </div>
            </div>
            <img src='../assests/registeredmatches.svg' alt='slides'></img>

            <div className={styles.Tournaments}>
              <div className={styles.tournament_slider}>
                <div className={styles.winning_prize}>
                  <span> TYPE</span>
                  <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}> Tournaments</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>Version</span>
                  <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>TPP</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>MAP</span>
                  <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>Erangel</span>
                </div>
              </div>
              <div className={styles.room_create}>
                <div className={styles.winning_prize}>
                  <span> Match start within </span>
                  <span>10 minutes</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>0</span>
                  <span>Minutes</span>
                </div>



              </div>
              <div className={styles.id_password}>
                <span>Room Id: 5263487</span>
                <span>Room password: 263</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Tournament;
