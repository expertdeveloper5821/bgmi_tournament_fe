'use client';
import Image from 'next/image';
import styles from '@/styles/personal_detail.module.scss';
import authStyles from '@/styles/auth.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import React, { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { sendInviteService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { teamsDetailsSchema } from '@/utils/schema';
import { TeamsDetailsFormValues } from '@/types/formsTypes';
import { emailRegex } from '@/utils/pattern';

const initialValues: TeamsDetailsFormValues = {
  teamName: '',
  emails: [],
};

export const TeamsDetailsForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [emailList, setEmailList] = useState<[] | string[]>([]);
  const [emailDisplayList, setEmailDisplayList] = useState<[] | React.JSX.Element[]>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues,
    validationSchema: teamsDetailsSchema,
    onSubmit: async (
      values: TeamsDetailsFormValues,
      { setSubmitting }: FormikHelpers<TeamsDetailsFormValues>,
    ) => {
      setSubmitting(true);
      const { teamName, emails } = values;
      const token = localStorage.getItem('jwtToken')!;

      try {
        const response = await sendInviteService({
          token,
          data: {
            teamName,
            emails: emails,
          },
        });
        setSubmitting(false);
        toast.success(response?.data?.message);
        window.localStorage.removeItem('prevurl');
        router.push('/userDashboard');
      } catch (error) {
        setError(error?.response?.data?.message);
        toast.error(error?.response?.data?.error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && emailRegex.test(inputValue)) {
      const trimmedInputValue = inputValue.trim();
      if (emailList.find((email) => email === trimmedInputValue)) {
        setFieldError('emails', 'Email already exist in friends list');
      } else {
        const designedValue = (
          <span className={styles.single_email_subsubconatiner}>
            {trimmedInputValue.length > 11
              ? trimmedInputValue.substring(0, 11) + '...'
              : trimmedInputValue}
          </span>
        );
        setEmailDisplayList([...emailDisplayList, designedValue]);
        setEmailList([...emailList, trimmedInputValue]);
        setFieldValue('emails', [...emailList, trimmedInputValue]);
        setInputValue('');
      }
    } else if (event.key === 'Enter' && !emailRegex.test(inputValue)) {
      setFieldError('emails', 'Please enter a valid email');
    }
  };

  const handleDeleteEmail = (indexToDelete: number) => {
    const updatedEmailList = emailList.filter((_, index) => index !== indexToDelete);
    const updatedDisplayEmailList = emailDisplayList.filter((_, index) => index !== indexToDelete);
    setFieldValue('emails', updatedEmailList);
    setEmailDisplayList(updatedDisplayEmailList);
    setEmailList(updatedEmailList);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="teamName">
            <Image
              src={
                errors.teamName && touched.teamName
                  ? '/assests/teamserror.svg'
                  : '/assests/teams.svg'
              }
              alt="mailogo"
              width={30}
              height={20}
            />
          </label>
          <Input
            id="teamName"
            className={
              errors.teamName && touched.teamName
                ? styles.error_email_wrapper
                : styles.email_wrapper
            }
            type="text"
            name="teamName"
            value={values.teamName}
            autoComplete="off"
            placeholder="Team Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.teamName && touched.teamName && (
            <div className={`${authStyles.error} ${authStyles.validation_Error}`}>
              {errors.teamName}
            </div>
          )}
        </div>

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="emails">
            <Image
              src={
                errors.emails && touched.emails
                  ? '/assests/mailerrorlogo.svg'
                  : '/assests/maillogo.svg'
              }
              alt="mailogo"
              width={30}
              height={20}
            />
          </label>
          <Input
            type="email"
            id="emails"
            name="emails"
            className={
              errors.emails && touched.emails
                ? `${styles.error_email_wrapper} ${styles.multiple_emails_input}`
                : `${styles.email_wrapper} ${styles.multiple_emails_input}`
            }
            value={inputValue}
            placeholder="Invite Friends Via Mail (Optional)"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          {errors.emails && (
            <div className={`${authStyles.error} ${authStyles.validation_Error}`}>
              {errors.emails}
            </div>
          )}
        </div>
        {emailDisplayList.length > 0 && (
          <div className={styles.email_container}>
            {emailDisplayList.map((email, index) => {
              return (
                <div key={index} className={styles.single_email_maincontainer}>
                  <div className={styles.single_email_subcontainer}>
                    {email}
                    <Image
                      src="/assests/bluecross.svg"
                      alt="search"
                      height={10}
                      width={10}
                      className={styles.cancelsvg}
                      onClick={() => handleDeleteEmail(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Button
          disabled={isSubmitting}
          className={isSubmitting ? styles.disabled_google_finish : styles.google_finsh}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Loading...' : <span className={styles.nextArrow}>Finish</span>}
        </Button>

        <Button
          className={styles.finish}
          onClick={() => {
            window.localStorage.removeItem('prevurl');
            router.push('/userDashboard');
          }}
        >
          <span className={styles.skipButton}>Skip</span>
        </Button>
      </form>
    </>
  );
};
