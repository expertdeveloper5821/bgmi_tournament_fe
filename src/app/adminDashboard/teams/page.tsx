import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import React from 'react';

const page = () => {
  return (
    <IsAuthenticatedHoc>
      <div>
        <h2>Teams</h2>
      </div>
    </IsAuthenticatedHoc>
  );
};

export default page;
