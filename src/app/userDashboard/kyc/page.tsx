import React from 'react';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

const KYC = () => {
  return (
    <IsAuthenticatedHoc>
      <div></div>;
    </IsAuthenticatedHoc>
  );
};

export default KYC;
