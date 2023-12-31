'use client';
import React from 'react';
import { PersonalDetail } from '@/Components/Forms/AuthForms/PersonalDetailsForm';
import AuthHoc from '@/Components/HOC/AuthHoc';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

function personalDetails() {
  return (
    <IsAuthenticatedHoc>
      <AuthHoc
        heading={'Personal Details'}
        subheading={'To proceed further! Please enter all details'}
        stepperIsVisible={true}
        step={3}
      >
        <PersonalDetail />
      </AuthHoc>
    </IsAuthenticatedHoc>
  );
}

export default personalDetails;
