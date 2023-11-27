'use client';
import { ResetPasswordForm } from '@/Components/Forms/AuthForms/ResetPasswordForm';
import AuthHoc from '@/Components/HOC/AuthHoc';

const ResetPassword = () => {
  return (
    <AuthHoc
      heading={'Reset Password'}
      subheading={'Please enter your password and confirm the password'}
    >
      <ResetPasswordForm />
    </AuthHoc>
  );
};

export default ResetPassword;
