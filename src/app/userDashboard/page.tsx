'use client';
import React from 'react';
import Tournament from './tournament/page';
import Videos from './videos/page'

import withAuth from '@/Components/HOC/WithAuthHoc';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

function UserDashboard() {
  return (
    <IsAuthenticatedHoc>
      <Tournament />
      <Videos />
    </IsAuthenticatedHoc>
  );
}

export default withAuth(UserDashboard);
