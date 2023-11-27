import React from 'react';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

const Transaction = () => {
  return (
    <IsAuthenticatedHoc>
      <div>Transactions</div>;
    </IsAuthenticatedHoc>
  );
};

export default Transaction;
