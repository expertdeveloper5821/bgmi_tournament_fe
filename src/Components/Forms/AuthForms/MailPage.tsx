'use client';
import React from 'react';
import styles from '@/styles/mail.module.scss';
// @ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import Image from 'next/image';

export function MailPageForm(): JSX.Element {
  const handleClick = () => {
    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
  };

  return (
    <>
      <div className={styles.email_wrapper}>
        <div className={styles.mailsent_logo}>
          <Image src="../assests/letterBox.svg" alt="mailsent" width={100} height={100} />
        </div>
      </div>

      <div className={styles.button_wrapper}>
        <Button variant="contained" onClick={handleClick} className={styles.forgetbutton}>
          Go to Link
        </Button>
      </div>
    </>
  );
}
