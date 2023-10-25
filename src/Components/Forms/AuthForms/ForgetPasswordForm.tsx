'use client';
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from '@/styles/auth.module.scss';
import { useRouter } from 'next/navigation';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { useFormik } from 'formik';
import { forgetPasswordSchema } from '@/utils/schema';

interface ResetPasswordProps {}

export function ForgetPasswordForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const router = useRouter();

  const initialValues: any = {
    email: '',
  };


  // const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue } =
  //   useFormik({
  //     initialValues,
  //     validationSchema: forgetPasswordSchema,
  //     onSubmit: async (values: any, { setSubmitting }: any) => {
  //       setIsLoading(true);
  //       const { email, password } = values;

  //       try {
  //         const response: any = await sendRequest('user/login', {
  //           method: 'POST',
  //           data: { email, password },
  //         });

  //         setIsLoading(false);
  //         const decodedToken: any = decodeJWt(response?.data?.userData?.token);

  //         if (response.status === 200) {
  //           // Below need to figure out why we want this.

  //           // const userDetails = {
  //           //   name: decodedToken?.fullName,
  //           //   email: decodedToken?.email,
  //           // };

  //           // updateUserInfo(userDetails);
  //           // updateToken(decodedToken);

  //           const date = new Date();
  //           const expirationTime = date.setHours(date.getHours() + 1);
  //           // Below line is for testing Purpose only.
  //           // const expirationTime =  date.setMinutes(date.getMinutes() + 1);

  //           console.log(
  //             'resonseeeeee 0==>',
  //             response,
  //             'decodedToken',
  //             decodedToken,
  //             'expirationTime',
  //             expirationTime,
  //           );

  //           if (rememberMe) {
  //             localStorage.setItem('rememberMe', rememberMe.toString());
  //             localStorage.setItem('email', email);
  //           } else {
  //             localStorage.setItem('rememberMe', rememberMe.toString());
  //             localStorage.removeItem('email');
  //           }
  //           localStorage.setItem('jwtToken', response?.data?.userData?.token);
  //           localStorage.setItem('expirationTime', expirationTime.toString());
  //           toast.success(response?.data?.message);
  //           handleRedirect(response?.data?.userData?.token);
  //         } else {
  //           setError('Invalid email or password');
  //         }
  //       } catch (error: any) {
  //         console.log("inside catch error", error);
  //         setIsLoading(false);
  //         toast.error(error?.message);
  //       } finally {
  //         setSubmitting(false);
  //       }
  //     },
  //   });


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
    <form>
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
      </div>
      {!isEmailValid && <p className={styles.error}>Please enter a valid email</p>}
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
    </form>
  );
}
