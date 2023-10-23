'use client';
import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
// import { FormDefaultPropsType } from '../authInterfaces';
import React, { useState, KeyboardEvent } from 'react';
import { useFormik } from 'formik';
import { sendInviteService } from '@/services/authServices';
import { useRouter } from 'next/navigation';

// export const TeamsDetailsForm = ({ handleStepChange, currentStep }: FormDefaultPropsType) => {
export const TeamsDetailsForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (items.length === 3) {
      return;
    }
    console.log(items);
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const initialValues: any = {
    teamName: '',
    emails: [],
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue } =
    useFormik({
      initialValues,
      // TODO: Need to add validation for this form.
      // validationSchema: personDetailSchema,
      onSubmit: async (values: any, { setSubmitting }: any) => {
        console.log('yes');
        setIsLoading(true);
        setSubmitting(true);
        const { teamName, emails } = values;
        const token = localStorage.getItem('jwtToken');

        let emailsOutput = emails.trim();

        if(emailsOutput.includes(',')){
          emailsOutput = emailsOutput.split(',').filter((email) => email.trim().length);
        }else if(emailsOutput.includes(' ')){
          emailsOutput = emailsOutput.split(' ').filter((email) => email.trim().length);
        }
        console.log('teamName ==>', teamName, 'email', emails.split(',').map((email) => email.trim()), 'token', token,"emailsOutput",emailsOutput);

        try {
          const response = await sendInviteService({
            token,
            data: {
              teamName,
              emails: emailsOutput,
            },
          });
          if(response.status === 200){
              router.push('/userDashboard');
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
          setSubmitting(false);
        }
      },
    });

  return (
    <>
      <form className={styles.form}>
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

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="emails">
            <Image src="/assests/maillogo.svg" alt="mailogo" width={30} height={20} />
          </label>
          <Input
            id="emails"
            className={styles.email_wrapper}
            type="email"
            name="emails"
            autoComplete="off"
            placeholder="Invite Friends Via Mail"
            value={values.UPI_Id}
            onChange={handleChange}
            onKeyPress={handleEnterKey}
            onBlur={handleBlur}
          />
          {/* <p className={styles.option}>(optional)</p> */}
        </div>

        {Boolean(items.length) &&
          items.map((email: string, index: number) => (
            <>
              <div className={styles.tags}>
                <div className={styles.names}>
                  <h4 className={styles.tagName}>{email}</h4>
                  <Image
                    src="/assests/cancle.svg"
                    alt="mailogo"
                    width={15}
                    height={15}
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </div>
            </>
          ))}

        <Button className={styles.google_finsh} onClick={handleSubmit}>
          {isLoading ? 'Loading...' : <span className={styles.nextArrow}>Finish</span>}
        </Button>

        <Button className={styles.finish} onClick={() => router.push('/userDashboard')} >
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
