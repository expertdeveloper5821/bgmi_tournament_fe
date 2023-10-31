'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import styles from '@/styles/auth.module.scss';
import { sendRequest } from '../../../utils/axiosInstanse';
import Image from 'next/image';
import { DecodedToken, decodeJWt } from '@/utils/globalfunctions';
import { useUserContext } from '@/utils/contextProvider';
import { loginSchema } from '@/utils/schema';
import { toast } from 'react-toastify';
import { loginService } from '@/services/authServices';
import { LoginFormValues } from '@/types/formsTypes';

export function LoginForm(): React.JSX.Element {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { updateToken } = useUserContext();
  const router = useRouter();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: rememberMe,
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>,
      ) => {
        setIsLoading(true);
        const { email, password } = values;

        try {
          const response = await loginService({ email, password });
          setIsLoading(false);
          const decodedToken: DecodedToken = decodeJWt(response?.data?.userData?.token);

          if (response.status === 200) {
            // Below need to figure out why we want this.
            // const userDetails = {
            //   name: decodedToken?.fullName,
            //   email: decodedToken?.email,
            // };
            // updateUserInfo(userDetails);
            // updateToken(decodedToken);

            const date = new Date();
            const expirationTime = date.setHours(date.getHours() + 1);
            // Below line is for testing Purpose only.
            // const expirationTime =  date.setMinutes(date.getMinutes() + 1);

            if (rememberMe) {
              localStorage.setItem('rememberMe', rememberMe.toString());
              localStorage.setItem('email', email);
            } else {
              localStorage.setItem('rememberMe', rememberMe.toString());
              localStorage.removeItem('email');
            }
            localStorage.setItem('jwtToken', response?.data?.userData?.token);
            localStorage.setItem('expirationTime', expirationTime.toString());
            toast.success(response?.data?.message);
            updateToken(decodedToken);
            handleRedirect(response?.data?.userData?.token);
          } else {
            setError('Invalid email or password');
          }
        } catch (error) {
          setIsLoading(false);
          setError(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      },
    });

  function handleRememberMe(event: ChangeEvent<HTMLInputElement>) {
    setRememberMe(event.target.checked);
  }

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe');
    if (rememberMeValue) {
      if (rememberMeValue === 'true') {
        setRememberMe(true);
      } else if (rememberMeValue === 'false') {
        setRememberMe(false);
      }

      // if (rememberMeValue) {
      //   setFieldValue('email', localStorage.getItem('email'));
      // }
    }

    const token = localStorage.getItem('jwtToken');
    if (token) {
      handleRedirect(token);
    }
  }, []);

  useEffect(() => {
    if (rememberMe) {
      setFieldValue('rememberMe', true);
      if (values.email) {
        setFieldValue('email', values.email);
      } else if (localStorage.getItem('email')) {
        setFieldValue('email', localStorage.getItem('email'));
      }
    } else if (!rememberMe) {
      setFieldValue('rememberMe', false);
    }
  }, [rememberMe]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        handleVerifyToken(token);
      }
    }
  }, []);

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


  const handleRedirect = (token: any) => {
    if (token) {
      const decodedToken: any = decodeJWt(token);

      if (decodedToken && decodedToken?.role?.role === 'user') {
        if (decodedToken?.upiId && decodedToken?.userName && decodedToken?.phoneNumber) {
          router.push('/userDashboard');
        } else {
          router.push('/auth/personaldetails');
        }
      } else if (decodedToken && decodedToken?.role?.role === 'admin') {
        router.push('/adminDashboard');
      } else if (decodedToken && decodedToken?.role?.role === 'spectator') {
        router.push('/spectatorDashboard');
      }
    } else {
      router.push('/auth/401');
    }
  };

  // verify token
  const handleVerifyToken = async (token: string) => {
    setIsLoading(true);
    try {
      const verifyResponse = await sendRequest('/auth/verify', {
        method: 'GET',
        data: {
          token: token,
        },
      });

      setIsLoading(false);

      if (verifyResponse.status === 200) {
        router.push('/adminDashboard/room');
      } else {
        setError('Google Sign-In failed');
      }
      if (verifyResponse.status === 200) {
        router.push('/userDashboard');
      } else {
        setError('Google Sign-In failed');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Google Sign-In failed');
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);

    try {
      window.location.href = 'http://localhost:5000/auth/google/callback';
    } catch (error) {
      setIsLoading(false);
      setError('Google Sign-In failed');
    }
  };

  const handleVerifyTokenInLogin = async (token: string) => {
    try {
      const verifyResponse = await sendRequest(`auth/verify/?token=${token}`, {
        method: 'GET',
      });


      if (verifyResponse.status === 200) {
        router.push('/adminDashboard/room');
      } else {
        setError('Google Sign-In failed');
      }
    } catch (errorData) {
      setError('Google Sign-In failed');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isLogin = urlParams.get('isLogin');
    if (isLogin == 'deny') {
      localStorage.clear();
      router.push('/');
    } else if (token) {
      localStorage.setItem('jwtToken', token);
      handleVerifyTokenInLogin(token);
    }
  }, []);

  const googleAuth = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, 'self');
    handleGoogleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image src="../assests/fullnameicon.svg" alt="fullname" width={30} height={20} />
        </label>
        <Input
          id="email"
          className={styles.email_wrapper}
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}

      <div className={styles.input_box}>
        <label className={styles.password} htmlFor="password">
          <Image src="../assests/passwordlogo.svg" alt="passwordlogo" width={30} height={20} />
        </label>
        <Input
          id="password"
          className={styles.password_wrapper}
          type="password"
          name="password"
          autoComplete="off"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.password && touched.password && <div className={styles.error}>{errors.password}</div>}

      <div className={styles.checkbox_wrapper}>
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          onChange={handleRememberMe}
          checked={values.rememberMe}
        />
        <label htmlFor="rememberMe" className={styles.rememberMe}>
          Remember Me
        </label>
      </div>

      <div className={styles.button_wrapper}>
        <Button
          disabled={isLoading}
          className={styles.forgetbutton}
          variant="contained"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </Button>
      </div>

      {/* <div className={styles.signin_withgoogle}>
        <FcGoogle />
        <Button
          disabled={isLoading}
          className={styles.googleButton}
          variant="primary"
          type="button"
          onClick={googleAuth}
        >
          {isLoading ? 'Loading...' : 'Sign in with Google'}
        </Button>
      </div> */}

      <Button className={styles.btnStyle} onClick={googleAuth}>
        <Image src="/assests/google.svg" alt="passwordlogo" width={20} height={20} />
        <span className={styles.googleIcon}>Sign in with Google</span>
      </Button>
      <div className={styles.signin}>
        <span className={styles.forgotDesc}>
          <Link href="/auth/forget-password">Forget your Password?</Link>
        </span>
        <div className={styles.sign_accout}>
          <span className={styles.accout_in}>Don't have an accout?</span>
          <span className={styles.forgotDescsec}>
            <Link className={styles.link_sign} href="/auth/signup">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}
