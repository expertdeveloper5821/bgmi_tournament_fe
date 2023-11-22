'use client';
import React, { useState } from 'react';
import styles from '@/styles/auth.module.scss';
import { useRouter } from 'next/navigation';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { FormikHelpers, useFormik } from 'formik';
import { forgetPasswordSchema } from '@/utils/schema';
import { toast } from 'react-toastify';
import { ForgetFormValues } from '@/types/formsTypes';
import { forgetPasswordService } from '@/services/authServices';

const initialValues: ForgetFormValues = {
  email: '',
};

export function ForgetPasswordForm(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: forgetPasswordSchema,
      onSubmit: async (
        values: ForgetFormValues,
        { setSubmitting }: FormikHelpers<ForgetFormValues>,
      ) => {
        setSubmitting(true);

        const { email } = values;

        try {
          const response = await forgetPasswordService(email);

          toast.success(response.data.message);
          router.push('/auth/mailpage');
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          setError(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image
            src={
              errors.email && touched.email
                ? '/assests/fullnameerroricon.svg'
                : '/assests/fullnameicon.svg'
            }
            alt="fullname"
            width={30}
            height={20}
          />
        </label>
        <Input
          type="email"
          id="email"
          className={
            errors.email && touched.email
              ? `${styles.error_email_wrapper} ${!errors.email ? '' : styles.invalid}`
              : `${styles.email_wrapper} ${!errors.email ? '' : styles.invalid}`
          }
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div className={`${styles.error} ${styles.validation_Error}`}>{errors.email}</div>
        )}
      </div>

      <div className={styles.button_wrapper}>
        <Button
          disabled={isSubmitting}
          variant="contained"
          className={isSubmitting ? styles.disabled_signin_button : styles.SignIn_button}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Loading...' : 'Recover Password'}
        </Button>
      </div>
    </form>
  );
}
