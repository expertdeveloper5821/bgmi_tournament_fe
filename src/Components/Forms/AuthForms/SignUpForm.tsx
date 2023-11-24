'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik, FormikHelpers } from 'formik';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { SignupSchema } from '@/utils/schema';
import { signUpService } from '@/services/authServices';
import styles from '@/styles/auth.module.scss';
import { SignupFormValuesType } from '@/Components/pageComponents/auth/authInterfaces';
import { toast } from 'react-toastify';
import { handleRedirect } from '@/utils/handleRedirect';

const initialValues: SignupFormValuesType = {
  fullName: '',
  email: '',
  password: '',
};

export const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      handleRedirect(token, router);
    }
  }, []);

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (
        values: SignupFormValuesType,
        { setSubmitting }: FormikHelpers<SignupFormValuesType>,
      ) => {
        setSubmitting(true);
        const { fullName, email, password } = values;
        try {
          const response = await signUpService({ fullName, email, password });
          toast.success(response.data.message);
          router.push(`/auth/login`);
        } catch (error) {
          setError(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      },
    });

  const googleAuth = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, '_self');
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <form>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="Fullname">
          <Image
            src={
              errors.fullName && touched.fullName
                ? '/assests/fullnameerroricon.svg'
                : '/assests/fullnameicon.svg'
            }
            alt="fullname"
            width={30}
            height={20}
          />
        </label>
        <Input
          id="fullName"
          className={
            errors.fullName && touched.fullName ? styles.error_email_wrapper : styles.email_wrapper
          }
          type="text"
          name="fullName"
          autoComplete="off"
          placeholder="Full Name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.fullName && touched.fullName && (
          <div className={`${styles.error} ${styles.validation_Error}`}>{errors.fullName}</div>
        )}
      </div>

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
          placeholder="Email Id"
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
          placeholder="Your Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onPaste={handlePaste}
        />
        {errors.password && touched.password && (
          <div className={`${styles.error} ${styles.validation_Error}`}>{errors.password}</div>
        )}
      </div>

      <div className={styles.button_wrapper}>
        <Button
          disabled={isSubmitting}
          className={isSubmitting ? styles.disabledforgetbutton : styles.forgetbutton}
          type="submit"
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Loading...' : 'Signup'}
        </Button>
      </div>

      <Button className={styles.btnStyle} onClick={googleAuth}>
        <Image src="/assests/google.svg" alt="passwordlogo" width={20} height={20} />
        <span className={styles.googleIcon}>Sign in with Google</span>
      </Button>

      <div className={styles.log_acc_cls}>
        <span>Already have an account ?</span>
        <span className={styles.forgotDescsec}>
          <Link className={styles.link_sign} href="/auth/login">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};
