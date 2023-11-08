import React from 'react';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

const Teams = () => {
  return (
    <IsAuthenticatedHoc>
      <div> User dashbaord Teams</div>;
    </IsAuthenticatedHoc>
  );
};

export default Teams;
