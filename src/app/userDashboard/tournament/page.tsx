'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
// @ts-ignore
import { Pagination, Button, Input } from 'technogetic-iron-smart-ui';

export interface IAppProps { }

function Tournament() {

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

              <div className={styles.input_desc}>
                <Input
                  placeholder="Search by fees"
                ></Input>
              </div>

            </div>

          
          <div className={styles.room_wrapper}>
            <div className={styles.room_container}>
              <div className={styles.registeredmatches}>
                <div className={styles.imgSection}>
                  <img src='../assests/userdashboardbg.webp' alt='userdashboardbg' className={styles.wrapperimg}></img>
                </div>
                <span className={styles.register_match}>Registered  Matches</span>
              </div>
              <div className={styles.squad_match}>
                <span className={styles.register_match}>BGMI  SQUAD MATCH</span>
                <span>Time : 02/08/2023 at 06:00pm</span>

                <div className={styles.winnings}>

                  <div className={styles.winning_prize}>
                    <span className={styles.win_content}>WINNING PRIZE</span>
                    <span className={styles.survival_content}> Last Survival: 50 * 4</span>
                  </div>

                  <div className={styles.winning_prize}>
                    <span> Entry FEES</span>
                    <span className={styles.survival_content}> 50 RS</span>

                  </div>
                </div>

                <div className={styles.winnings}>

                  <div className={styles.winning_prize}>
                    <span> TYPE</span>
                    <span style={{ color: 'rgba(255, 214, 0, 1)' }}>Tournaments</span>
                  </div>

                  <div className={styles.winning_prize}>
                    <span>Version</span>
                    <span style={{ color: 'rgba(255, 214, 0, 1)' }}>TPP</span>

                  </div>

                  <div className={styles.winning_prize}>
                    <span>MAP</span>
                    <span style={{ color: 'rgba(255, 122, 0, 1)' }}>Erangel</span>
                  </div>
                </div>

                <div className={styles.winnings}>
                  <div className={styles.spot_line}>
                    <span> ONLY 30 spots  </span>
                    <span>20/50</span>
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
            <div className={styles.Tournaments}>
              <div className={styles.winnings}>
                <div className={styles.winning_prize}>
                  <span> TYPE</span>
                  <span style={{ color: 'rgba(255, 214, 0, 1)' }}> Tournaments</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>Version</span>
                  <span style={{ color: 'rgba(255, 214, 0, 1)' }}>TPP</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>MAP</span>
                  <span style={{ color: 'rgba(255, 122, 0, 1)' }}>Erangel</span>
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
              <div className={styles.winnings}>
                <div className={styles.winning_prize}>
                  <span> TYPE</span>
                  <span style={{ color: 'rgba(255, 214, 0, 1)' }}> Tournaments</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>Version</span>
                  <span style={{ color: 'rgba(255, 214, 0, 1)' }}>TPP</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>MAP</span>
                  <span style={{ color: 'rgba(255, 122, 0, 1)' }}>Erangel</span>
                </div>

              </div>

              <div className={styles.winnings}>
                <div className={styles.winning_prize}>
                  <span> 1</span>
                  <span>hours</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>26</span>
                  <span>minutes</span>
                </div>
                <div className={styles.winning_prize}>
                  <span>0</span>
                  <span>Seconds</span>
                </div>
              </div>
              <div className={styles.id_password}>
              <span>Room Id: 5263487</span>
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

