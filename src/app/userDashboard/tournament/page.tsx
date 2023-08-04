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
            <div>
              <h1>Upcoming Matches</h1>
              <h6>Dashboard/Upcoming Matches</h6>
            </div>
          </div>
          <div>
            <div>
              <div>
                <img src='../assests/userdashboardbg.svg' alt='userdashboardbg'></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tournament;