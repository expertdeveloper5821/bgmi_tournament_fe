'use client';
import AuthHoc from '@/Components/HOC/AuthHoc';
import React from 'react';
import { SignupForm } from '@/Components/Forms/AuthForms/SignUpForm';

function Signup() {
  return (
    <AuthHoc heading={'Create Account'} subheading={'Create account! Please enter your details'}>
      <SignupForm />
    </AuthHoc>
  );
}

export default Signup;
