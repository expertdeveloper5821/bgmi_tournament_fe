'use client';

import { ForgetPasswordForm } from '@/Components/Forms/AuthForms/ForgetPasswordForm';
import AuthHoc from '@/Components/HOC/AuthHoc';
import React from 'react';

function ForgetPassword() {
  return (
    <AuthHoc heading={'Forgot Password'} subheading={'Please enter your email address'}>
      <ForgetPasswordForm />
    </AuthHoc>
  );
}

export default ForgetPassword;
