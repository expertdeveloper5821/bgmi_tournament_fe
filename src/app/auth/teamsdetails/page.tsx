import { TeamsDetailsForm } from '@/Components/Forms/AuthForms/TeamsDetailsForm';
import AuthHoc from '@/Components/HOC/AuthHoc';
import React from 'react';

function teamsDetails() {
  return (
    <AuthHoc heading={'Teams Details'} subheading={'To proceed further! Please enter all details'}>
      <TeamsDetailsForm />
    </AuthHoc>
  );
}
export default teamsDetails;
