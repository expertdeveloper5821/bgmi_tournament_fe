'use client';
import React, {useState, useEffect, ChangeEvent, useContext} from 'react';
import {
  useFormik,
  FormikErrors,
  FormikTouched,
  FormikValues,
  FormikHelpers,
} from 'formik';
import {SignupSchema} from '../../../schemas/SignupSchemas';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';
import styles from '../../../styles/auth.module.scss';
import sendRequest from '../../../services/api/apiServices';
import {FcGoogle} from 'react-icons/fc';
import Image from 'next/image';
import {loginSchema} from '../../../schemas/SignupSchemas';
import {decodeJWt} from '@/utils/globalfunctions';
import {configData} from '@/utils/config';
 import { useUserContext } from '@/utils/contextProvider';
interface LoginProps {}

interface FormValues {
  email: string;
  password: string;
}

function Login(): React.JSX.Element {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [getToken, setGetToken] = useState<any>('');
  const { userInfo, updateUserInfo } = useUserContext();

  const router = useRouter();

  function handleRememberMe(event: ChangeEvent<HTMLInputElement>) {
    setRememberMe(event.target.checked);
  }

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeValue);

    const token = localStorage.getItem('jwtToken');
    if (token) {
      handleRedirect(token);
    }
  });

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (
      values: FormValues,
      {setSubmitting}: FormikHelpers<FormValues>,
    ) => {
      console.log('values', values);
      setIsLoading(true);
      const {email, password} = values;
      if (rememberMe) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      // manual login
      try {
        const response = await sendRequest('user/login', {
          method: 'POST',
          data: {email, password},
        });

        setIsLoading(false);
        

        if (response.status === 200) {
          const userDetails  = {name :response.data.userData.fullName, email:response.data.userData.email }
          console.log('response.data.userData.fullName',response.data.userData.fullName,'email:response.data.userData.email',response.data.userData.email);
          
          updateUserInfo(userDetails)
          localStorage.setItem('jwtToken', response?.data?.userData?.token);
          handleRedirect(response?.data?.userData?.token);
        } else {
          setError('Invalid email or password');
        }
      } catch (error: any) {
        console.log('Error in Login API => ', error);
        setIsLoading(false);
        setError('Login Failed, Please try again later');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleRedirect = (token: any) => {;
    if (token) {
      const decodedToken: any = decodeJWt(token);
      if (decodedToken.role.role === 'admin') {
        router.push('/adminDashboard');
      } else if (decodedToken.role.role === 'user') {
        router.push('/userDashboard');
        // router.push(configData.web.cominSoonUrl);
      } else {
        router.push('/spectatorDashboard');
      }
    } else {
      router.push('/auth/401');
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail) {
      setFieldValue('email', storedEmail);
    }
    if (storedPassword) {
      setFieldValue('password', storedPassword);
    }
  }, [setFieldValue]);

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
        router.push('/adminDashboard');
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
      console.error('Error during Google Sign-In:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      // console.log('token', token, window.location.href);

      if (token) {
        handleVerifyToken(token);
      }
    }
  }, []);

  // loader

  const [isLoadingData, setLoadingData] = useState<boolean>(false);
  const [errorData, showErrorData] = useState<string>('');

  const handleVerifyTokenInLogin = async (token: string) => {
    setLoadingData(true);
    try {
      const verifyResponse = await sendRequest(`auth/verify/?token=${token}`, {
        method: 'GET',
      });
      console.log('verifyResponse', verifyResponse);

      setLoadingData(false);

      if (verifyResponse.status === 200) {
        router.push('/adminDashboard');
      } else {
        showErrorData('Google Sign-In failed');
      }
    } catch (errorData) {
      setLoadingData(false);
      showErrorData('Google Sign-In failed');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isLogin = urlParams.get('isLogin');
    if(isLogin == 'deny') {
      localStorage.clear()
      router.push('/')
    } else if(token){
        localStorage.setItem('jwtToken', token);
        handleVerifyTokenInLogin(token);
    }
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.background_container}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src="../assests/logoWithBg.svg"
              alt="Tg-logo"
              width={250}
              height={100}
            />
          </div>

          <div>
            {/* <h2 className={styles.headDesc}>Hello Warriors!</h2> */}
            <p className={styles.heading}>
              Welcome back! Please enter your details
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}
              <div className={styles.input_box}>
                <label className={styles.email} htmlFor="email">
                  <Image
                    src="../assests/fullnameicon.svg"
                    alt="fullname"
                    width={30}
                    height={20}
                  />
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
              {errors.email && touched.email && (
                <div className={styles.error}>{errors.email}</div>
              )}

              <div className={styles.input_box}>
                <label className={styles.password} htmlFor="password">
                  <Image
                    src="../assests/passwordlogo.svg"
                    alt="passwordlogo"
                    width={30}
                    height={20}
                  />
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
              {errors.password && touched.password && (
                <div className={styles.error}>{errors.password}</div>
              )}

              <div className={styles.checkbox_wrapper}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  onChange={handleRememberMe}
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
                  {isLoading ? 'Loading...' : 'Sign in'}
                </Button>
              </div>
              {/* <div className={styles.signin_withgoogle}>
                <FcGoogle />
                <Button
                  disabled={isLoading}
                  className={styles.googleButton}
                  variant="primary"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  {isLoading ? 'Loading...' : 'Sign in with Google'}
                </Button>
              </div> */}
              <div className={styles.signin}>
                <span className={styles.forgotDesc}>
                  <Link href="/auth/forget-password">
                    Forget your Password?
                  </Link>
                </span>
                <div className={styles.sign_accout}>
                  <span className={styles.accout_in}>
                    Don't have an accout?
                  </span>
                  <span className={styles.forgotDescsec}>
                    <Link className={styles.link_sign} href="/auth/signup">
                      Signup
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
