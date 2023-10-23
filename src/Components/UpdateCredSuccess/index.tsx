'use client';
import { useRouter } from 'next/navigation';
import styles from '@/styles/credential.module.scss';
//@ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import React from 'react';
import Image from 'next/image';

interface Props {}

const UpdateCredSuccess: React.FC<Props> = (props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.background_container}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <Image src="/assests/logoWithBg.svg" alt="bgmilogo" width={250} height={100} />
            </div>
            <div className={styles.heading_wrapper}>
              <h2 className={styles.headDesc}>Congratulations!!</h2>
              <p className={styles.heading}>Hurrah! You have successfully updated your password</p>
            </div>
            <div>
              <div className={styles.mail_success}>
                <Image
                  src="/assests/mailverification.svg"
                  alt="mail-verified"
                  width={300}
                  height={200}
                />
              </div>
              <div className={styles.button_wrapper}>
                <Button variant="contained" className={styles.forgetbutton} onClick={handleClick}>
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCredSuccess;
