import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import RegisteredMatch from '@/Components/pageComponents/userDashboard/registeredMatches';
import React from 'react';

const RegisteredMatchPage = () => {
  return (
    <IsAuthenticatedHoc>
      <RegisteredMatch />
    </IsAuthenticatedHoc>
  );
};

export default RegisteredMatchPage;
