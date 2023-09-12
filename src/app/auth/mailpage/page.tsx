'use client';
import React from 'react';
import styles from '@/styles/mail.module.scss';
// @ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import Image from 'next/image';

export interface SentMailProps {}

export default function SentMail(props: SentMailProps): JSX.Element {
  const handleClick = () => {
    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.background_container}>
          <div className={styles.container}>
            <div className={styles.mailsent_container}>
              <div className={styles.logo}>
                <Image src="../assests/logoWithBg.svg" alt="Tg-logo" width={210} height={80} />
              </div>

              <div className={styles.email_wrapper}>
                <h2 className={styles.mail_heading}>Check Your Email</h2>
                <p className={styles.heading}>
                  We have sent you a reset password link on your registered email.
                </p>

                <div className={styles.mailsent_logo}>
                  <Image src="../assests/letterBox.svg" alt="mailsent" width={100} height={100} />
                </div>
              </div>

              <div className={styles.button_wrapper}>
                <Button variant="contained" onClick={handleClick} className={styles.forgetbutton}>
                  Go to Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
