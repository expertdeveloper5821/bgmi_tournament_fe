'use client';
import React from 'react';
import AuthHoc from '@/Components/HOC/AuthHoc';
import { LoginForm } from '@/Components/Forms/AuthForms/LoginForm';

function Login(): React.JSX.Element {
  return (
    <AuthHoc heading={'Sign In'} subheading={'Sign In! Please enter your details'}>
      <LoginForm />
    </AuthHoc>
  );
}

export default Login;
