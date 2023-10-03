'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from '@/styles/auth.module.scss';
import { useFormik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { sendRequest } from '../../../../utils/axiosInstanse';
import Image from 'next/image';
import { decodeJWt } from '@/utils/globalfunctions';
import { useUserContext } from '@/utils/contextProvider';
import { LoginFormValuesType } from '../authInterfaces';
import { loginSchema } from '@/utils/schema';
import { GOOGLE_CALLBACK_URL } from '@/services/serviceUrls'
import { loginService } from '@/services/authServices';




const LoginForm = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [role, setRole] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [getToken, setGetToken] = useState<any>('');
    const { userInfo, updateUserInfo } = useUserContext();
    const router = useRouter();

    const initialValues: LoginFormValuesType = {
        email: '',
        password: '',
    };

    useEffect(() => {
        const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
        setRememberMe(rememberMeValue);

        const storedEmail = localStorage.getItem('email');
        if (storedEmail && rememberMeValue) {
            setFieldValue('email', storedEmail);
        }
    }, []);

    function handleRememberMe(event: ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        console.log("checked====>", checked)
        setRememberMe(event.target.checked);

        if (checked) {
            localStorage.setItem('rememberMe', 'true');
            console.log('rememberMe set to true');
            localStorage.setItem('email', values.email);
            console.log(`email set to ${values.email}`);
        } else {
            localStorage.removeItem('rememberMe');
            console.log('rememberMe removed');
            localStorage.removeItem('email');
            console.log('email removed');
        }
    }
    const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            onSubmit: async (values: LoginFormValuesType, { setSubmitting }: FormikHelpers<LoginFormValuesType>) => {
                setIsLoading(true);
                const { email, password } = values;
                if (rememberMe) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 30);
                    localStorage.setItem('email', email);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('rememberMe');
                }

                // manual login
                try {
                    const response = await loginService({ email, password });

                    if (response.status === 200) {
                        const userDetails = {
                            name: response?.data?.userData?.fullName,
                            email: response?.data?.userData?.email,
                        };
                        if (response?.data?.userData) {
                            localStorage.setItem('userData', JSON.stringify(response.data?.userData));
                        }
                        updateUserInfo(userDetails);
                        localStorage.setItem('jwtToken', response?.data?.userData?.token);

                        handleRedirect(response?.data?.userData?.token);
                    } else {
                        setError('Invalid email or password');
                    }
                } catch (error: any) {
                    setIsLoading(false);
                    setError('Login Failed, Please try again later');
                } finally {
                    setSubmitting(false);
                }
            },
        });

    const handleRedirect = (token: any) => {
        if (token) {
            const decodedToken: any = decodeJWt(token);
            if (decodedToken.role.role === 'admin') {
                router.push('/adminDashboard/room');
            } else if (decodedToken.role.role === 'user') {
                router.push('/userDashboard/tournament');
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
            window.location.href = GOOGLE_CALLBACK_URL;
        } catch (error) {
            setIsLoading(false);
            setError('Google Sign-In failed');
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
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

            setLoadingData(false);

            if (verifyResponse.status === 200) {
                router.push('/adminDashboard/room');
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
        if (isLogin == 'deny') {
            localStorage.clear();
            router.push('/');
        } else if (token) {
            localStorage.setItem('jwtToken', token);
            handleVerifyTokenInLogin(token);
        }
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.input_box}>
                <label className={styles.email} htmlFor="email">
                    <Image src="../assests/fullnameicon.svg" alt="fullname" width={30} height={20} />
                </label>
                <Input
                    id="email"
                    disabled={isLoading}
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
                    <Image
                        src="../assests/passwordlogo.svg"
                        alt="passwordlogo"
                        width={30}
                        height={20}
                    />
                </label>
                <Input
                    id="password"
                    disabled={isLoading}
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
                    {isLoading ? 'Loading...' : 'Log in'}
                </Button>
            </div>
            <div className={styles.signin}>
                <div className={styles.forgotDesc}>
                    <Link href="/auth/forget-password">Forget your Password?</Link>
                </div>
                <div className={styles.sign_accout}>
                    <div className={styles.accout_in}>Don't have an accout?</div>
                    <div className={styles.forgotDescsec}>
                        <Link className={styles.link_sign} href="/auth/signup">
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;