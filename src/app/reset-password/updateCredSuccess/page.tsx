'use client';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/credential.module.scss';
//@ts-ignore
import { Button } from 'technogetic-iron-smart-ui';
import React from 'react';
type Props = {};

const UpdateCredSuccess = (props: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  };
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.background_container}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <img src="../assests/logobgmi.svg" alt="bgmilogo"></img>
            </div>
            <div className={styles.heading_wrapper}>
              <h2 className={styles.headDesc}>Congratulations!!</h2>
              <p className={styles.heading}>
                Hurrah! You have successfully updated your password
              </p>
            </div>
            <div>
              <div className={styles.mail_success}>
                <img src="../assests/mailverification.svg" alt="mail-verified"></img>
              </div>
              <div className={styles.button_wrapper}>
                <Button
                  varient="contained"
                  className={styles.forgetbutton}
                  onClick={handleClick}
                >
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