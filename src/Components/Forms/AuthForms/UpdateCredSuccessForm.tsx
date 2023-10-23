'use client';
import { useRouter } from 'next/navigation';
import styles from '@/styles/credential.module.scss';
//@ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import React from 'react';
import Image from 'next/image';

interface Props {}

export const UpdateCredSuccessForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <div className={styles.mail_success}>
        <Image src="/assests/mailverification.svg" alt="mail-verified" width={300} height={200} />
      </div>
      <div className={styles.button_wrapper}>
        <Button variant="contained" className={styles.forgetbutton} onClick={handleClick}>
          Sign in
        </Button>
      </div>
    </>
  );
};
