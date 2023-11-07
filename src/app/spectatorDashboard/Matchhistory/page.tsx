'use client';
import React from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import Image from 'next/image';

const matchHistory = () => {
  return (
    <div className={styles.main_container} id="mainLayoutContainerInner">
      <div className={styles.inner_main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.inner_specter_cls}>
            <h1 className={styles.r_main_title}>Match History</h1>
          </div>
          <div className={styles.match_details}>
            <div className={styles.match_details1}>
              <div className={styles.flex}>
                <span className={styles.date}>Fri, 29 Oct</span>
                <span className={styles.time}>5:00 PM</span>
              </div>
              <div className={styles.col}>
                <div className={styles.row}>
                  <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                  <span>Prize Pool : Chicken Dinner</span>
                </div>
                <span>Match Name : BGMI</span>
                <span>Match Type : Squad</span>
                <span>Team Name : Rockers</span>
                <div className={styles.flex_row}>
                  <span>Map Name : Squad</span>
                  <Image src="/assests/team members.svg" alt="Image" width={20} height={20} />
                </div>
              </div>
            </div>
            <div className={styles.match_details2}>
              <div className={styles.flex}>
                <span className={styles.date}>Fri, 29 Oct</span>
                <span className={styles.time}>5:00 PM</span>
              </div>
              <div className={styles.col}>
                <div className={styles.row}>
                  <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                  <span>Prize Pool : Highest Kill</span>
                </div>
                <span>Match Name : BGMI</span>
                <span>Match Type : Squad</span>
                <span>Team Name : Ro@#dsrs</span>
                <div className={styles.flex_row}>
                  <span>Map Name : Squad</span>
                  <Image src="/assests/team members.svg" alt="Image" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.match_details}>
            <div className={styles.match_details1}>
              <div className={styles.flex}>
                <span className={styles.date}>Fri, 29 Oct</span>
                <span className={styles.time}>5:00 PM</span>
              </div>
              <div className={styles.col}>
                <div className={styles.row}>
                  <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                  <span>Prize Pool : 2nd Winner</span>
                </div>
                <span>Match Name : BGMI</span>
                <span>Match Type : Squad</span>
                <span>Team Name : hary%5%rs</span>
                <div className={styles.flex_row}>
                  <span>Map Name : Squad</span>
                  <Image src="/assests/team members.svg" alt="Image" width={20} height={20} />
                </div>
              </div>
            </div>
            <div className={styles.match_details2}>
              <div className={styles.flex}>
                <span className={styles.date}>Fri, 29 Oct</span>
                <span className={styles.time}>5:00 PM</span>
              </div>
              <div className={styles.col}>
                <div className={styles.row}>
                  <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                  <span>Prize Pool : 3rd Winner</span>
                </div>
                <span>Match Name : BGMI </span>
                <span>Match Type : Squad</span>
                <span>Team Name : gkh887</span>
                <div className={styles.flex_row}>
                  <span>Map Name : Squad</span>
                  <Image src="/assests/team members.svg" alt="Image" width={30} height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default matchHistory;
