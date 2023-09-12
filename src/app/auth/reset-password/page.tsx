'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/credential.module.scss';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { ResetPasswordSchema } from '@/utils/schema';

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const UpdateCredential: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const tokenParam = searchParams.get('token');
      setToken(tokenParam || '');
    }
  }, []);

  const initialValues: FormValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values: FormValues) => {
      const { newPassword, confirmPassword } = values;
      try {
        const response = await sendRequest(`user/reset-password?token=${token}`, {
          method: 'POST',
          data: { newPassword, confirmPassword },
        });

        if (response.status === 200) {
          router.push('/auth/reset-password/updateCredSuccess');
        } else {
          console.error('Password update failed');
        }
      } catch (error: any) {
        console.error('Password update error:', error);
      }
    },
  });

  return (
    <div className={styles.main_container}>
      <div className={styles.background_container}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image src="/assests/logoWithBg.svg" alt="bgmilogo" width={220} height={100} />
          </div>
          <div>
            <h2 className={styles.headDesc}>Reset Password</h2>
            <p className={styles.heading}>Please enter your password and confirm the password</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_box}>
                <label htmlFor="newPassword" className={styles.password}>
                  <Image
                    src="/assests/passwordlogo.svg"
                    alt="passwordlogo"
                    width={30}
                    height={20}
                  />
                </label>
                <Input
                  type="password"
                  id="newPassword"
                  className={styles.password_wrapper}
                  name="newPassword"
                  autoComplete="off"
                  placeholder="Enter password"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Input>
              </div>
              <div className={styles.error}>
                {errors.newPassword && touched.newPassword ? (
                  <p>{(errors.newPassword = 'Password must be at least 6 characters')}</p>
                ) : null}
              </div>
              <div className={styles.input_box}>
                <label htmlFor="confirmPassword" className={styles.password}>
                  <Image
                    src="/assests/passwordlogo.svg"
                    alt="passwordlogo"
                    width={30}
                    height={20}
                  />
                </label>
                <Input
                  type="password"
                  id="confirmPassword"
                  className={styles.password_wrapper}
                  name="confirmPassword"
                  autoComplete="off"
                  placeholder="Enter new password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Input>
              </div>
              <div className={styles.error}>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p>{(errors.confirmPassword = 'Both passwords must match')}</p>
                ) : null}
              </div>
              <div className={styles.button_wrapper}>
                <Button varient="contained" className={styles.forgetbutton} onClick={handleSubmit}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCredential;
