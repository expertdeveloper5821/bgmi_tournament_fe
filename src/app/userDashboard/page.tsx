'use client'
import React from 'react';
import Tournament from './tournament/page';
import Videos from './videos/page'

import withAuth from '@/Components/HOC/WithAuthHoc';

function UserDashboard() {
  return (
    <>
      <Tournament />
      <Videos />

    </>
  );
}

export default withAuth(UserDashboard);
