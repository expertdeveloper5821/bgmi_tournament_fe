import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import React from 'react';

const page = () => {
  return (
    <IsAuthenticatedHoc>
      <div>AdminDashboard</div>
    </IsAuthenticatedHoc>
  );
};

export default page;
