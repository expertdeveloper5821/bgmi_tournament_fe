'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/auth.module.scss';
import { useRouter } from 'next/navigation';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { FormikHelpers, useFormik } from 'formik';
import { forgetPasswordSchema } from '@/utils/schema';
import { toast } from 'react-toastify';
import { ForgetFormValues } from '@/types/formsTypes';

const initialValues: ForgetFormValues = {
  email: '',
};

export function ForgetPasswordForm(): JSX.Element {
  const router = useRouter();

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
          const response: any = await sendRequest('user/forget-password', {
            method: 'POST',
            data: { email },
          });

          if (response.status === 200) {
            toast.success(response.data.message);
            router.push('/auth/mailpage');
          }
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          toast.error(error.message);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image src="../assests/fullnameicon.svg" alt="fullname" width={30} height={20} />
        </label>
        <Input
          type="email"
          id="email"
          className={`${styles.email_wrapper} ${!errors.email ? '' : styles.invalid}`}
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}

      <div className={styles.button_wrapper}>
        <Button
          disabled={isSubmitting}
          variant="contained"
          className={styles.SignIn_button}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Loading...' : 'Recover Password'}
        </Button>
      </div>
    </form>
  );
}
