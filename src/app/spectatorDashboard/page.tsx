'use client';
import React, {useState} from 'react';
import {Navbar} from '@/Components/Navbar/Navbar';
//import styles from '../../styles/Spectator.module.scss';

import styles from '../../styles/Dashboard.module.scss';

import assignmentData from '../../utils/CreateAssignment.json';
//@ts-ignore
import RequireAuthentication from '../../utils/requireAuthentication';

import withAuth from '@/Components/HOC/WithAuthHoc';
import Room from './Room/page';
export interface IAppProps {}

function spectatorDashboard() {
  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Room />
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default withAuth(spectatorDashboard);
