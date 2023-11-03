'use client';
import Image from 'next/image';

import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import React, { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { sendInviteService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { teamsDetailsSchema } from '@/utils/schema';
import { TeamsDetailsFormValues } from '@/types/formsTypes';

const initialValues: TeamsDetailsFormValues = {
  teamName: '',
  emails: [],
};

export const TeamsDetailsForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [emailList, setEmailList] = useState([]);
  const [emailDisplayList, setEmailDisplayList] = useState([]);
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
      const token = localStorage.getItem('jwtToken');

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
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (event.key === 'Enter' && emailRegex.test(inputValue)) {
      const trimmedInputValue = inputValue.trim();
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
            <Image src="/assests/teams.svg" alt="mailogo" width={30} height={20} />
          </label>
          <Input
            id="teamName"
            className={styles.email_wrapper}
            type="text"
            name="teamName"
            value={values.teamName}
            autoComplete="off"
            placeholder="Team Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.teamName && touched.teamName && (
          <div className={styles.error}>{errors.teamName}</div>
        )}

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="emails">
            <Image src="/assests/maillogo.svg" alt="mailogo" width={30} height={20} />
          </label>
          <Input
            type="email"
            id="emails"
            name="emails"
            className={`${styles.email_wrapper} ${styles.multiple_emails_input}`}
            value={inputValue}
            placeholder="Enter email press enter and send invitation"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        {errors.emails && touched.emails && <div className={styles.error}>{errors.emails}</div>}
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

        <Button disabled={isSubmitting} className={styles.google_finsh} onClick={handleSubmit}>
          {isSubmitting ? 'Loading...' : <span className={styles.nextArrow}>Finish</span>}
        </Button>

        <Button className={styles.finish} onClick={() => router.push('/userDashboard')}>
          <span className={styles.nextArrow}>Skip</span>
        </Button>
      </form>

      {/* <div className={styles.flexGap}>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
      </div> */}
    </>
  );
};
