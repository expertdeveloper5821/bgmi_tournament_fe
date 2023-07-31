'use client';
import React, {useState, ChangeEvent} from 'react';
import Link from 'next/link';
import styles from '../login/auth.module.scss';
import sendRequest from '../../services/auth/auth_All_Api';
import {useRouter} from 'next/navigation';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';

export default function ResetPassword(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const isValid = validateEmail(event.target.value);
    setIsEmailValid(isValid);
  };

  const sendEmail = async () => {
    try {
      const response = await sendRequest('forget-password', {
        method: 'POST',
        body: {email},
      });
      router.push('/mailpage');

      console.log('Password recovery success:', response);
    } catch (error) {
      console.error('Password recovery error:', error);
    }
  };
  console.log('email', email);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.background_container}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="./assests/logo.svg" alt="logo" />
          </div>
          <div>
            <h2>Forgot Password</h2>
            <p className={styles.heading}>
              Please enter your registered email id or mobile to reset your
              password
            </p>
          </div>
          <div className={styles.input_box}>
            <label className={styles.email} htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              className={`${styles.email_wrapper} ${
                isEmailValid ? '' : styles.invalid
              }`}
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />
            {!isEmailValid && (
              <p className={styles.error_message}>Please enter a valid email</p>
            )}
          </div>
          <div className={styles.button_wrapper}>
            <Button
              variant="contained"
              className={styles.SignIn_button}
              onClick={sendEmail}
            >
              Recover Password
            </Button>
          </div>
          <div className={styles.signin}>
            <span>
              <Link href="/">Remember it?&nbsp;Sign in here</Link>
            </span>
          </div>
        </div>
        <div className={styles.girlImg_wrapper}>
          <img src="./assests/pubgImg.png" alt="girl-img" />
        </div>
      </div>
    </div>
  );
}
