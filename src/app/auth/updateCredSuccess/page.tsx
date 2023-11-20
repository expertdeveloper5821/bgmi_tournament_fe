'use client';
import { UpdateCredSuccessForm } from '@/Components/Forms/AuthForms/UpdateCredSuccessForm';
import AuthHoc from '@/Components/HOC/AuthHoc';
import React from 'react';

export default function Page() {
  return (
    <AuthHoc
      heading={'Congratulations!!'}
      subheading={'Please enter your password and confirm the password'}
    >
      <UpdateCredSuccessForm />
    </AuthHoc>
  );
}
