'use client';
import { MailPageForm } from '@/Components/Forms/AuthForms/MailPage';
import AuthHoc from '@/Components/HOC/AuthHoc';
import React from 'react';

function MailPage() {
  return (
    <AuthHoc
      heading={'Check Your Email'}
      subheading={' We have sent you a reset password link on your registered email.'}
    >
      <MailPageForm />
    </AuthHoc>
  );
}

export default MailPage;
