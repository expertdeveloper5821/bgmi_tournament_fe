import { PersonalDetail } from '@/Components/Forms/AuthForms/PersonalDetailsForm';
import AuthHoc from '@/Components/HOC/AuthHoc';
import React from 'react'
function personalDetails() {
  return (
    <AuthHoc heading={'Personal Details'} subheading={"To proceed further! Please enter all details"}>
       <PersonalDetail /> 
    </AuthHoc>
  )
}

export default personalDetails;
