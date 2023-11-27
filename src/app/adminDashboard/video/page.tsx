'use client';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import React from 'react';

const page = () => {
  return (
    <IsAuthenticatedHoc>
      <Navbar />
      <div style={{ textAlign: 'center' }}>
        <h2>Videos</h2>
      </div>
    </IsAuthenticatedHoc>
  );
};

export default page;
