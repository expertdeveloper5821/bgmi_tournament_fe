'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { personDetailSchema } from '@/utils/schema';
import { useFormik, FormikHelpers } from 'formik';
import { updateUserDetailsService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PersonalDetailsValue } from '@/types/formsTypes';

const initialValues: PersonalDetailsValue = {
  player: '',
  upi: '',
  whatsapp: '',
};

export const PersonalDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues,
    validationSchema: personDetailSchema,
    onSubmit: async (
      values: PersonalDetailsValue,
      { setSubmitting }: FormikHelpers<PersonalDetailsValue>,
    ) => {
      setIsLoading(true);
      setSubmitting(true);
      const { player, upi, whatsapp } = values;
      const token = localStorage.getItem('jwtToken')!;
      try {
        const response = await updateUserDetailsService({
          token,
          data: {
            userName: player,
            upiId: upi,
            phoneNumber: whatsapp,
          },
        });

        const date = new Date();
        const expirationTime = date.setHours(date.getHours() + 1);
        localStorage.setItem('jwtToken', response?.data?.token);
        localStorage.setItem('expirationTime', expirationTime.toString());

        toast.success('successfully updated');
        router.push('/auth/teamsdetails');
      } catch (error) {
        setIsLoading(false);
        setError(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form}>
        <div className={styles.profile_sec}>
          <div className={styles.round}>
            <Image src="/assests/profilePik.png" alt="fullname" width={100} height={100} />
          </div>

          <div className={styles.right}>
            <h2 className={styles.upload}>Upload Profile Picture</h2>
            <p>(Optional)</p>
          </div>
        </div>

        <div className={styles.editBtn}>
          <Image src="/assests/edit.svg" alt="fullname" width={30} height={30} />
        </div>

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image src="/assests/teams.svg" alt="mailogo" width={20} height={20} />
          </label>
          <Input
            id="Player Id/Username"
            className={styles.email_wrapper}
            type="text"
            name="player"
            autoComplete="off"
            placeholder="Player Id/Username"
            value={values.player}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.player && touched.player && <div className={styles.error}>{errors.player}</div>}

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image src="/assests/profilePik.png" alt="mailogo" width={20} height={20} />
          </label>
          <Input
            id="UPI_Id"
            className={styles.email_wrapper}
            type="text"
            name="upi"
            autoComplete="off"
            placeholder="UPI Id"
            value={values.upi}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {errors.upi && touched.upi && <div className={styles.error}>{errors.upi}</div>}

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image src="/assests/whats_app.svg" alt="mailogo" width={20} height={20} />
          </label>
          <Input
            id="WhatsApp_Number"
            className={styles.email_wrapper}
            type="text"
            name="whatsapp"
            autoComplete="off"
            placeholder="WhatsApp Number"
            value={values.whatsapp}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {errors.whatsapp && touched.whatsapp && (
          <div className={styles.error}>{errors.whatsapp}</div>
        )}
      </form>
      <Button className={styles.google_btn} type="submit" onClick={handleSubmit}>
        {isLoading ? 'Loading...' : <span>Next</span>}
      </Button>
    </div>
  );
};
