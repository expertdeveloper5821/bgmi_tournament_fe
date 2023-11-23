'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '@/styles/personal_detail.module.scss';
import authStyles from '@/styles/auth.module.scss';

//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { personDetailSchema } from '@/utils/schema';
import { useFormik, FormikHelpers } from 'formik';
import { updateUserDetailsService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PersonalDetailsValue } from '@/types/formsTypes';
import Tooltip from '@/Components/CommonComponent/Tooltip';

const initialValues: PersonalDetailsValue = {
  player: '',
  upi: '',
  whatsapp: '',
};

export const PersonalDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const [image, setImage] = useState<null | File>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleEditIconClick = () => {
    fileInputRef?.current?.click();
  };

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

      const formData = new FormData();
      image && formData.append('profilePic', image);
      formData.append('userName', player);
      formData.append('upiId', upi);
      formData.append('phoneNumber', whatsapp);

      try {
        const response = await updateUserDetailsService({
          token,
          data: formData,
        });

        const date = new Date();
        const expirationTime = date.setHours(date.getHours() + 1);
        localStorage.setItem('jwtToken', response?.data?.token);
        localStorage.setItem('expirationTime', expirationTime.toString());
        localStorage.setItem('prevurl', 'personaldetails');
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
    <>
      {error && <div className={styles.error}>{error}</div>}
      <form>
        <div className={styles.profile_sec}>
          {image ? (
            <div className={styles.editImageWrapper}>
              <img
                src={URL.createObjectURL(image)}
                alt="profile"
                style={{ width: 100, height: 100, borderRadius: '50%' }}
              />
              <div
                className={styles.editBtn}
                onClick={handleEditIconClick}
                style={{ cursor: 'pointer' }}
              >
                <Image src="/assests/edit.svg" alt="fullname" width={30} height={30} />
              </div>
            </div>
          ) : (
            <div className={styles.editImageWrapper}>
              <Image src="/assests/profilePik.png" alt="profile" width={100} height={100} />
              <div
                className={styles.editBtn}
                onClick={handleEditIconClick}
                style={{ cursor: 'pointer' }}
              >
                <Image src="/assests/edit.svg" alt="fullname" width={30} height={30} />
              </div>
            </div>
          )}

          <div>
            <h2 className={styles.upload}>Upload Profile Picture</h2>
            <p className={styles.uploadOptional}>(Optional)</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image
              src={
                errors.player && touched.player ? '/assests/teamserror.svg' : '/assests/teams.svg'
              }
              alt="mailogo"
              width={20}
              height={20}
            />
          </label>
          <Input
            id="Player Id/Username"
            className={
              errors.player && touched.player
                ? `${styles.error_email_wrapper} ${styles.info_Icon_Inputs}`
                : `${styles.email_wrapper} ${styles.info_Icon_Inputs}`
            }
            type="text"
            name="player"
            autoComplete="off"
            placeholder="Player Id/Username"
            value={values.player}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Tooltip text="The player id should match the with the BGMI player id">
            <img src="/assests/infoIcon.svg" />
          </Tooltip>
          {errors.player && touched.player && (
            <div
              className={`${authStyles.error} ${authStyles.validation_Error}`}
              style={{ left: '0' }}
            >
              {errors.player}
            </div>
          )}
        </div>

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image
              src={
                errors.upi && touched.upi
                  ? '/assests/fullnameerroricon.svg'
                  : '/assests/fullnameicon.svg'
              }
              alt="fullname"
              width={20}
              height={20}
            />
          </label>
          <Input
            id="UPI_Id"
            className={
              errors.upi && touched.upi ? styles.error_email_wrapper : styles.email_wrapper
            }
            type="text"
            name="upi"
            autoComplete="off"
            placeholder="UPI Id"
            value={values.upi}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.upi && touched.upi && (
            <div
              className={`${authStyles.error} ${authStyles.validation_Error}`}
              style={{ left: '0' }}
            >
              {errors.upi}
            </div>
          )}
        </div>

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image
              src={
                errors.whatsapp && touched.whatsapp
                  ? '/assests/whats_app_error.svg'
                  : '/assests/whats_app.svg'
              }
              alt="mailogo"
              width={20}
              height={20}
            />
          </label>
          <Input
            id="WhatsApp_Number"
            className={
              errors.whatsapp && touched.whatsapp
                ? `${styles.error_email_wrapper} ${styles.info_Icon_Inputs}`
                : `${styles.email_wrapper} ${styles.info_Icon_Inputs}`
            }
            type="text"
            name="whatsapp"
            autoComplete="off"
            placeholder="WhatsApp Number"
            value={values.whatsapp}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Tooltip text="WhatsApp number preferred">
            <img src="/assests/infoIcon.svg" />
          </Tooltip>
          {errors.whatsapp && touched.whatsapp && (
            <div
              className={`${authStyles.error} ${authStyles.validation_Error}`}
              style={{ left: '0' }}
            >
              {errors.whatsapp}
            </div>
          )}
        </div>
        <Button
          disabled={isLoading}
          className={isLoading ? styles.disabled_google_btn : styles.google_btn}
          type="submit"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : <span>Next</span>}
        </Button>
      </form>
    </>
  );
};
