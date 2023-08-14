'use client';
import React from 'react';
import {Navbar} from '@/Components/Navbar/Navbar';
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
      <div>
        <Room />
      </div>
    </>
  );
}

export default withAuth(spectatorDashboard);
