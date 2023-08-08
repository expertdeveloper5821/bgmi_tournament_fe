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
              Upcoming Matches
              <h1>Dashboard/Upcoming Matches</h1>
              <div className={styles.input_desc}>
                <Input
                  placeholder="Search by fees"
                ></Input>
              </div>
            </div>

          </div>
          <div className={styles.room_wrapper}>
            <div className={styles.room_container}>
              <div className={styles.imgSection}>
                <img src='../assests/userdashboardbg.webp' alt='userdashboardbg' className={styles.wrapperimg}></img>
              </div>
              <div className={styles.content_body}>
                <h2>BGMI SQUAD MATCH </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tournament;