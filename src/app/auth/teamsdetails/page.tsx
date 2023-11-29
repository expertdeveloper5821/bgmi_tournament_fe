'use client';
import React from 'react';
import { TeamsDetailsForm } from '@/Components/Forms/AuthForms/TeamsDetailsForm';
import AuthHoc from '@/Components/HOC/AuthHoc';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

function teamsDetails() {
  return (
    <IsAuthenticatedHoc>
      <AuthHoc
        heading={'Teams Details'}
        subheading={'To proceed further! Please enter all details'}
        stepperIsVisible={true}
        step={4}
      >
        <TeamsDetailsForm />
      </AuthHoc>
    </IsAuthenticatedHoc>
  );
}
export default teamsDetails;
