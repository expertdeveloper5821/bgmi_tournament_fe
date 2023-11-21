'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/credential.module.scss';
import authStyles from '@/styles/auth.module.scss';
import { useRouter } from 'next/navigation';
import { FormikHelpers, useFormik } from 'formik';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { ResetPasswordSchema } from '@/utils/schema';
import { resetPasswordService } from '@/services/authServices';
import { toast } from 'react-toastify';
import { ResetFormValues } from '@/types/formsTypes';

const initialValues: ResetFormValues = {
  newPassword: '',
  confirmPassword: '',
};

export const ResetPasswordForm: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window?.location?.href);
      const extractedToken = url.searchParams.get('token')!;
      setToken(extractedToken);
    }
  }, []);

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: ResetPasswordSchema,
      onSubmit: async (
        values: ResetFormValues,
        { setSubmitting }: FormikHelpers<ResetFormValues>,
      ) => {
        setSubmitting(true);
        const { newPassword, confirmPassword } = values;
        try {
          await resetPasswordService({ token, newPassword, confirmPassword });
          setSubmitting(false);
          router.push('/auth/updateCredSuccess');
        } catch (error) {
          setSubmitting(false);
          setError(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        }
      },
    });

  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.input_box}>
        <label htmlFor="newPassword" className={styles.password}>
          <Image
            src={
              errors.newPassword && touched.newPassword
                ? '/assests/passworderrorlogo.svg'
                : '/assests/passwordlogo.svg'
            }
            alt="passwordlogo"
            width={30}
            height={20}
          />
        </label>
        <Input
          type="password"
          id="newPassword"
          className={
            errors.newPassword && touched.newPassword
              ? authStyles.error_email_wrapper
              : styles.password_wrapper
          }
          name="newPassword"
          autoComplete="off"
          placeholder="Enter password"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          onPaste={handlePaste}
        />
      </div>
      {errors.newPassword && touched.newPassword && (
        <div className={`${styles.error} ${authStyles.validation_Error}`}>{errors.newPassword}</div>
      )}
      <div className={styles.input_box}>
        <label htmlFor="confirmPassword" className={styles.password}>
          <Image
            src={
              errors.confirmPassword && touched.confirmPassword
                ? '/assests/passworderrorlogo.svg'
                : '/assests/passwordlogo.svg'
            }
            alt="passwordlogo"
            width={30}
            height={20}
          />
        </label>
        <Input
          type="password"
          id="confirmPassword"
          className={
            errors.confirmPassword && touched.confirmPassword
              ? authStyles.error_email_wrapper
              : styles.password_wrapper
          }
          name="confirmPassword"
          autoComplete="off"
          placeholder="Enter new password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          onPaste={handlePaste}
        />
      </div>
      {errors.confirmPassword && touched.confirmPassword && (
        <div className={`${styles.error} ${authStyles.validation_Error}`}>
          {errors.confirmPassword}
        </div>
      )}
      <div className={styles.button_wrapper}>
        <Button
          disabled={isSubmitting}
          varient="contained"
          className={isSubmitting ? authStyles.disabledforgetbutton : styles.forgetbutton}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
