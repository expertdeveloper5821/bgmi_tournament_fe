'use client'
import React from 'react';
import Tournament from './tournament/page';
import withAuth from '@/Components/HOC/WithAuthHoc';

function UserDashboard() {
  return (
    <>
      <Tournament />
    </>
  );
}

export default withAuth(UserDashboard);
