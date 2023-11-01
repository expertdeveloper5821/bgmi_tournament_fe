'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
// TODO: Commented ToolTip code and its import statements because producing errors need to figure out later.
// import { Tooltip } from '@nextui-org/react';
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
      const token = localStorage.getItem('jwtToken');
      try {
        await updateUserDetailsService({
          token,
          data: {
            userName: player,
            upiId: upi,
            phoneNumber: whatsapp,
          },
        });
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

          {/* <Tooltip
            className={styles.toolTip}
            content="The player id should match with the BGMI game id"
          >
            <Image src="/assests/i.svg" alt="mailogo" width={30} height={20} />
          </Tooltip> */}
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
          {/* <Tooltip className={styles.toolTip} content="WhatsApp number preferred">
            <Image src="/assests/i.svg" alt="mailogo" width={30} height={20} />
          </Tooltip> */}
        </div>

        {errors.whatsapp && touched.whatsapp && (
          <div className={styles.error}>{errors.whatsapp}</div>
        )}
      </form>
      <Button className={styles.google_btn} type="submit" onClick={handleSubmit}>
        {isLoading ? (
          'Loading...'
        ) : (
          //   <span onClick={() => handleStepChange(errors.upi !== '' && currentStep + 1)}>Next</span>
          <span>Next</span>
        )}
      </Button>

      {/* // <Button className={styles.google_btn} onClick={() => handleStepChange(currentStep + 1)}>
      //   <span className={styles.nextArrow}>Next </span>
      //   <Image src="/assests/rightArrow.svg" alt="mailogo" width={12} height={12} />
      // </Button> */}

      <div className={styles.flexGap}>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
      </div>
    </div>
  );
};
