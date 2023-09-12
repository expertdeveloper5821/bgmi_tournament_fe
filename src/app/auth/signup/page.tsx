'use client';
import React from 'react';
import AuthContainer from '@/components/pageComponents/auth/authContainer';
import SignupForm from '@/components/pageComponents/auth/signup';

const Signup = () => (
  <AuthContainer>
    <SignupForm />
  </AuthContainer>
);

export default Signup;
