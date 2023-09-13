'use client';
import AuthContainer from '@/Components/pageComponents/auth/authContainer';
import SignupForm from '@/Components/pageComponents/auth/signup';
import React from 'react';

const Signup = () => (
  <AuthContainer>
    <SignupForm />
  </AuthContainer>
);

export default Signup;
