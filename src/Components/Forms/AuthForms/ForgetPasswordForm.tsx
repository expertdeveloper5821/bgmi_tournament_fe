'use client';
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from '@/styles/auth.module.scss';
import { useRouter } from 'next/navigation';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';

interface ResetPasswordProps {}

export function ForgetPasswordForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const isValid = validateEmail(event.target.value);
    setIsEmailValid(isValid);
  };

  const sendEmail = async () => {
    try {
      const response = await sendRequest('user/forget-password', {
        method: 'POST',
        data: { email },
      });
      router.push('/auth/mailpage');
    } catch (error) {
      console.error('Password recovery error:', error);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image src="../assests/fullnameicon.svg" alt="fullname" width={30} height={20} />
        </label>
        <Input
          type="email"
          id="email"
          className={`${styles.email_wrapper} ${isEmailValid ? '' : styles.invalid}`}
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
        />
        {!isEmailValid && <p className={styles.error_message}>Please enter a valid email</p>}
      </div>
      <div className={styles.button_wrapper}>
        <Button variant="contained" className={styles.SignIn_button} onClick={sendEmail}>
          Recover Password
        </Button>
      </div>
      <div className={styles.signin}>
        <span>
          <Link href="/">Remember it?&nbsp;Sign in here</Link>
        </span>
      </div>
    </>
  );
}
