'use client';
import { useEffect } from 'react';
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
import { DecodedToken, decodeJWt } from '@/utils/globalfunctions';
import { toast } from 'react-toastify';

const initialValues: SignupFormValuesType = {
  fullName: '',
  email: '',
  password: '',
};

export const SignupForm = () => {
  const router = useRouter();

  const handleRedirect = (token: string) => {
    if (token) {
      const decodedToken: DecodedToken = decodeJWt(token);
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

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      handleRedirect(token);
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
          if (response.status === 200) {
            toast.success(response.data.message);
            router.push(`/auth/login`);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      },
    });

  // TODO: NEED TO CHECK BELOW FUNCTION CHERRY PICKED FROM SUBMIT ANOTHER PR.
  const googleAuth = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, 'self');
  };

  return (
    <form>
      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="Fullname">
          <Image src="/assests/fullnameicon.svg" alt="fullname" width={30} height={20} />
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
      {errors.fullName && touched.fullName && <div className={styles.error}>{errors.fullName}</div>}

      <div className={styles.input_box}>
        <label className={styles.email} htmlFor="email">
          <Image src="/assests/maillogo.svg" alt="mailogo" width={30} height={20} />
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
      {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}

      <div className={styles.input_box}>
        <label className={styles.password} htmlFor="password">
          <Image src="/assests/passwordlogo.svg" alt="passwordlogo" width={30} height={20} />
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
      {errors.password && touched.password && <div className={styles.error}>{errors.password}</div>}

      <div className={styles.button_wrapper}>
        <Button
          disabled={isSubmitting}
          className={styles.forgetbutton}
          type="submit"
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Loading...' : 'Next'}
        </Button>
      </div>

      <Button className={styles.btnStyle} onClick={googleAuth}>
        <Image src="/assests/google.svg" alt="passwordlogo" width={20} height={20} />
        <span className={styles.googleIcon}>Sign in with Google</span>
      </Button>

      <div className={styles.log_acc_cls}>
        <span className={styles.forgotDesc}>Already have an account ?</span>
        <span className={styles.forgotDescsec}>
          <Link className={styles.link_sign} href="/auth/login">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};
