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
      >
        <PersonalDetail />
      </AuthHoc>
    </IsAuthenticatedHoc>
  );
}

export default personalDetails;
