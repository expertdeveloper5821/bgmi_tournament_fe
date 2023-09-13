'use client';
import { Dispatch , SetStateAction } from "react";
import Image from 'next/image';
import styles from '../../../../styles/auth.module.scss';
import {useFormik, FormikValues, FormikHelpers} from 'formik';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {sendRequest} from '../../../../services/auth/auth_All_Api';
import Link from 'next/link';
import {SignupSchema} from '../../../../schemas/SignupSchemas';

interface FormValues {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  upiId: any;
  //setStep: Dispatch<SetStateAction<number>>;
}

interface ISignUp {
  setStep: Dispatch<SetStateAction<number>>;
}
const SignupForm = (props: ISignUp) => {
    const { setStep } = props;
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const initialValues: FormValues = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    upiId: '',
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
    validationSchema: SignupSchema,
    onSubmit: async (
      values: FormValues,
      {setSubmitting}: FormikHelpers<FormValues>,
    ) => {
      setIsLoading(true);
      const {fullName, userName, email, password, upiId} = values;
      if (rememberMe) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
      }

      try {
        const response = await sendRequest('user/signup', {
          method: 'POST',
          data: {fullName, userName, email, password, upiId},
        });

        if (response.status === 200) {
          // localStorage.setItem('data', response.userName);
          router.push(`/auth/login`);
        } else {
          setError('Failed to sign up. Please try again.');
        }
      } catch (error: any) {
        setIsLoading(false);
        setError('user with email already exists.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const storedFullname = localStorage.getItem('fullName');
    const storedPlayerId = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedFullname) {
      setFieldValue('fullName', storedFullname);
    }

    if (storedPlayerId) {
      setFieldValue('userName', storedPlayerId);
    }
    if (storedEmail) {
      setFieldValue('email', storedEmail);
    }
    if (storedPassword) {
      setFieldValue('password', storedPassword);
    }
  }, [setFieldValue]);
  return (
    <form>
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="Fullname">
          <Image
            src="/assests/fullnameicon.svg"
            alt="fullname"
            width={30}
            height={20}
          />
        </label>
        <Input
          id="fullName"
          className={styles.email_wrapper}
          type="text"
          name="fullName"
          autoComplete="off"
          placeholder="Full Name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.fullName && touched.fullName && (
        <div className={styles.error}>{errors.fullName}</div>
      )}

      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image
            src="/assests/maillogo.svg"
            alt="mailogo"
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
          placeholder="Email ID"
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
            src="/assests/passwordlogo.svg"
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
          placeholder="Your Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.password && touched.password && (
        <div className={styles.error}>{errors.password}</div>
      )}

      <div className={styles.button_wrapper}>
        <Button
          className={styles.forgetbutton}
          type="submit"
          onClick={() => setStep((p: number) => p + 1)}
        >
          Next
          {/* {isLoading ? 'Loading...' : 'Next'} */}
        </Button>
      </div>

      <Button className={styles.google_btn}>
        <span className={styles.googleIcon}>Sign in with Google</span>
      </Button>

      <div className={styles.log_acc_cls}>
        <span className={styles.forgotDesc}>Already have an account ?</span>
        <span className={styles.forgotDescsec}>
          <Link className={styles.link_sign} href="/auth/login">
            Sing up
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
