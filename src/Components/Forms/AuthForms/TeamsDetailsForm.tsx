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
  const [emailList, setEmailList] = useState<string[]>([]);
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
    setFieldError
  } = useFormik({
    initialValues,
    validationSchema: teamsDetailsSchema,
    onSubmit: async (values: TeamsDetailsFormValues, { setSubmitting }: FormikHelpers<TeamsDetailsFormValues>) => {
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
        if (response.status === 200) {
          setSubmitting(false);
          toast.success(response?.data?.message)
          router.push('/userDashboard');
        }
        setSubmitting(false);
      } catch (error) {
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
      setEmailList([...emailList, inputValue.trim()]);
      setFieldValue('emails', [...emailList, inputValue.trim()]);
      setInputValue('');
    }else if(event.key === 'Enter' && !emailRegex.test(inputValue)){
      setFieldError('emails',"Please enter a valid email")
    }
  };

  const handleDeleteEmail = (indexToDelete: number) => {
    const updatedEmailList = emailList.filter((_, index) => index !== indexToDelete);
    setFieldValue('emails', updatedEmailList);
    setEmailList(updatedEmailList);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        {emailList.length > 0 &&
          emailList.map((email, index) => {
            const truncatedEmail = email.length > 15 ? email.substring(0, 15) + '...' : email;
            return (
              <div key={index} className={styles.inputemail_container}>
                <div className={styles.inputemail}>
                  {truncatedEmail}
                  <Image
                    src="/assests/orangecross.svg"
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

        <Button disabled={isSubmitting} className={styles.google_finsh} onClick={handleSubmit}>
          {isSubmitting ? 'Loading...' : <span className={styles.nextArrow}>Finish</span>}
        </Button>

        <Button className={styles.finish} onClick={() => router.push('/userDashboard')}>
          <span className={styles.nextArrow}>Skip</span>
        </Button>
      </form>

      <div className={styles.flexGap}>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
      </div>
    </>
  );
};
