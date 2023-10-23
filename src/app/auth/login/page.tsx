'use client';
import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { useFormik, FormikErrors, FormikTouched, FormikValues, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import styles from '@/styles/auth.module.scss';
import { sendRequest } from '../../../utils/axiosInstanse';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { decodeJWt } from '@/utils/globalfunctions';
import { useUserContext } from '@/utils/contextProvider';
import { SignupSchema, loginSchema } from '@/utils/schema';
import AuthHoc from '@/Components/HOC/AuthHoc';
import { LoginForm } from '@/Components/Forms/AuthForms/LoginForm';

// interface LoginProps {}

// interface FormValues {
//   email: string;
//   password: string;
// }

function Login(): React.JSX.Element {
  // const [rememberMe, setRememberMe] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [role, setRole] = useState<string>('');
  // const [error, setError] = useState<string>('');
  // const [getToken, setGetToken] = useState<any>('');
  // const { userInfo, updateUserInfo } = useUserContext();
  // const router = useRouter();

  // function handleRememberMe(event: ChangeEvent<HTMLInputElement>) {
  //   setRememberMe(event.target.checked);
  // }

  // useEffect(() => {
  //   const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
  //   setRememberMe(rememberMeValue);

  //   const token = localStorage.getItem('jwtToken');
  //   if (token) {
  //     handleRedirect(token);
  //   }
  // });

  // const initialValues: FormValues = {
  //   email: '',
  //   password: '',
  // };

  // console.log('currentStep 4 ');

  // const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue } =
  //   useFormik({
  //     initialValues,
  //     validationSchema: loginSchema,
  //     onSubmit: async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
  //       setIsLoading(true);
  //       const { email, password } = values;
  //       if (rememberMe) {
  //         const expirationDate = new Date();
  //         expirationDate.setDate(expirationDate.getDate() + 30);
  //         localStorage.setItem('email', email);
  //         localStorage.setItem('password', password);
  //         localStorage.setItem('rememberMe', 'true');
  //       } else {
  //         localStorage.removeItem('email');
  //         localStorage.removeItem('password');
  //         localStorage.removeItem('rememberMe');
  //       }

  //       // manual login
  //       try {
  //         const response: any = await sendRequest('user/login', {
  //           method: 'POST',
  //           data: { email, password },
  //         });

  //         setIsLoading(false);
  //         if (response.status === 200) {
  //           const userDetails = {
  //             name: response?.data?.userData?.fullName,
  //             email: response?.data?.userData?.email,
  //           };
  //           if (response?.data?.userData) {
  //             localStorage.setItem('userData', JSON.stringify(response.data?.userData));
  //           }
  //           updateUserInfo(userDetails);
  //           localStorage.setItem('jwtToken', response?.data?.userData?.token);

  //           handleRedirect(response?.data?.userData?.token);
  //         } else {
  //           setError('Invalid email or password');
  //         }
  //       } catch (error: any) {
  //         setIsLoading(false);
  //         setError('Login Failed, Please try again later');
  //       } finally {
  //         setSubmitting(false);
  //       }
  //     },
  //   });

  // const handleRedirect = (token: any) => {
  //   if (token) {
  //     const decodedToken: any = decodeJWt(token);
  //     if (decodedToken?.role?.role === 'admin') {
  //       router.push('/adminDashboard');
  //     } else if (decodedToken?.role?.role === 'user') {
  //       router.push('/userDashboard');
  //       // router.push(configData.web.cominSoonUrl)
  //     } else {
  //       router.push('/spectatorDashboard');
  //     }
  //   } else {
  //     router.push('/auth/401');
  //   }
  // };

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem('email');
  //   const storedPassword = localStorage.getItem('password');
  //   if (storedEmail) {
  //     setFieldValue('email', storedEmail);
  //   }
  //   if (storedPassword) {
  //     setFieldValue('password', storedPassword);
  //   }
  // }, [setFieldValue]);

  // // verify token
  // const handleVerifyToken = async (token: string) => {
  //   setIsLoading(true);
  //   try {
  //     const verifyResponse = await sendRequest('/auth/verify', {
  //       method: 'GET',
  //       data: {
  //         token: token,
  //       },
  //     });

  //     setIsLoading(false);

  //     if (verifyResponse.status === 200) {
  //       router.push('/adminDashboard/room');
  //     } else {
  //       setError('Google Sign-In failed');
  //     }
  //     if (verifyResponse.status === 200) {
  //       router.push('/userDashboard');
  //     } else {
  //       setError('Google Sign-In failed');
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError('Google Sign-In failed');
  //   }
  // };

  // const handleGoogleLogin = () => {
  //   setIsLoading(true);

  //   try {
  //     window.location.href = 'http://localhost:5000/auth/google/callback';
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError('Google Sign-In failed');
  //   }
  // };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const token = urlParams.get('token');
  //     if (token) {
  //       handleVerifyToken(token);
  //     }
  //   }
  // }, []);

  // // loader

  // const [isLoadingData, setLoadingData] = useState<boolean>(false);
  // const [errorData, showErrorData] = useState<string>('');

  // const handleVerifyTokenInLogin = async (token: string) => {
  //   setLoadingData(true);
  //   try {
  //     const verifyResponse = await sendRequest(`auth/verify/?token=${token}`, {
  //       method: 'GET',
  //     });

  //     setLoadingData(false);

  //     if (verifyResponse.status === 200) {
  //       router.push('/adminDashboard/room');
  //     } else {
  //       showErrorData('Google Sign-In failed');
  //     }
  //   } catch (errorData) {
  //     setLoadingData(false);
  //     showErrorData('Google Sign-In failed');
  //   }
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token = urlParams.get('token');
  //   const isLogin = urlParams.get('isLogin');
  //   if (isLogin == 'deny') {
  //     localStorage.clear();
  //     router.push('/');
  //   } else if (token) {
  //     localStorage.setItem('jwtToken', token);
  //     handleVerifyTokenInLogin(token);
  //   }
  // }, []);

  console.log("INSIDE LOGIN")
  return (
    <AuthHoc heading={'Sign In'} subheading={"Sign In! Please enter your details"}>
      <LoginForm />
    </AuthHoc>
  );
}

export default Login;
