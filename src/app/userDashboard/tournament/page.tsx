import React from 'react';
import Tournament from '@/Components/pageComponents/userDashboard/tournament';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

const TournamentPage = () => {
  return (
    <IsAuthenticatedHoc>
      <Tournament />
    </IsAuthenticatedHoc>
  );
};

export default TournamentPage;
