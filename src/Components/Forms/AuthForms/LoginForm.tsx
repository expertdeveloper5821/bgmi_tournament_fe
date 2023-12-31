'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useFormik, FormikHelpers } from 'formik';
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
import { handleRedirect } from '@/utils/handleRedirect';
import { useRouter } from 'next/navigation';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export function LoginForm(): React.JSX.Element {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { updateToken } = useUserContext();
  const router = useRouter();

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
          const decodedToken: DecodedToken = decodeJWt(response?.data?.userData?.token)!;
          const date = new Date();
          const expirationTime = date.setHours(date.getHours() + 1);

          if (rememberMe) {
            localStorage.setItem('email', email);
          } else {
            localStorage.removeItem('email');
          }
          localStorage.setItem('rememberMe', rememberMe.toString());
          localStorage.setItem('jwtToken', response?.data?.userData?.token);
          localStorage.setItem('expirationTime', expirationTime.toString());
          toast.success('User Login Successfully');
          updateToken(decodedToken);
          handleRedirect(response?.data?.userData?.token, router);
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
        if (values.email) {
          setFieldValue('email', values.email);
        } else if (localStorage.getItem('email')) {
          setFieldValue('email', localStorage.getItem('email'));
        }
        setRememberMe(true);
      } else if (rememberMeValue === 'false') {
        setRememberMe(false);
      }
    }

    const token = localStorage.getItem('jwtToken');
    if (token) {
      handleRedirect(token, router);
    }

    if (typeof window !== 'undefined') {
      const url = new URL(window?.location?.href);
      const extractedToken = url.searchParams.get('token');
      if (extractedToken) {
        handleVerifyTokenInLogin(extractedToken);
      }
    }
  }, []);

  const handleVerifyTokenInLogin = async (token: string) => {
    try {
      const verifyResponse = await sendRequest(
        `auth/verify/?token=${token}`,
        {
          method: 'GET',
        },
        true,
      );

      if (verifyResponse.status === 200) {
        const VerifiedToken = decodeJWt(token);

        if (VerifiedToken?.role?.role === 'user') {
          const date = new Date();
          const expirationTime = date.setHours(date.getHours() + 1);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('expirationTime', expirationTime.toString());
          handleRedirect(token, router);
        }
      }
    } catch (errorData) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('expirationTime');
      setError('Google Sign-In failed');
      toast.error(errorData.message);
    }
  };

  const googleAuth = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, '_self');
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={styles.api_error}>{error}</div>}
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image
            src={
              errors.email && touched.email ? '/assests/mailerrorlogo.svg' : '/assests/maillogo.svg'
            }
            alt="mailogo"
            width={30}
            height={20}
          />
        </label>
        <Input
          id="email"
          className={
            errors.email && touched.email ? styles.error_email_wrapper : styles.email_wrapper
          }
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div className={`${styles.error} ${styles.validation_Error}`}>{errors.email}</div>
        )}
      </div>

      <div className={styles.input_box}>
        <label className={styles.password} htmlFor="password">
          <Image
            src={
              errors.password && touched.password
                ? '/assests/passworderrorlogo.svg'
                : '/assests/passwordlogo.svg'
            }
            alt="passwordlogo"
            width={30}
            height={20}
          />
        </label>
        <Input
          id="password"
          className={
            errors.password && touched.password ? styles.error_email_wrapper : styles.email_wrapper
          }
          type="password"
          name="password"
          autoComplete="off"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onPaste={handlePaste}
        />
        {errors.password && touched.password && (
          <div className={`${styles.error} ${styles.validation_Error}`}>{errors.password}</div>
        )}
      </div>

      <div className={styles.checkbox_wrapper}>
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          onChange={handleRememberMe}
          checked={rememberMe}
        />
        <label htmlFor="rememberMe" className={styles.rememberMe}>
          Remember Me
        </label>
      </div>

      <div className={styles.button_wrapper}>
        <Button
          disabled={isLoading}
          className={isLoading ? styles.disabledforgetbutton : styles.forgetbutton}
          variant="contained"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </Button>
      </div>

      <Button className={styles.btnStyle} onClick={googleAuth}>
        <Image src="/assests/google.svg" alt="passwordlogo" width={20} height={20} />
        <span>Sign in with Google</span>
      </Button>
      <div className={styles.signin}>
        <span className={styles.forget_desc}>
          <Link href="/auth/forget-password">Forgot Password?</Link>
        </span>
        <div className={styles.sign_accout}>
          <span>Don't have an account?</span>
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
