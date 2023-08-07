'use client'
import React from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
//@ts-ignore
import { Pagination, Button, Input } from 'technogetic-iron-smart-ui';

export interface IAppProps { }

function Tournament() {
  return (
    <div className={styles.main_container}>
      <div className={styles.abcd}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.content}>
            <div className={styles.dashboard}>
              <span className={styles.head_desc}>Invite your friend</span>
              <h1 className={styles.subhead_desc}>Dashboard/Upcoming Matches</h1>
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles.input_desc}>
                <Input placeholder="Search by Name" />
              </div>
              <div className={styles.input_desc}>
                <Button>SEND INVITE BY EMAIL</Button>
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournament;
