import Image from 'next/image';
import React from 'react';
import styles from '@/styles/auth.module.scss';
import { AuthPropsType } from '@/types/formsTypes';

const AuthHoc = ({
  children,
  heading,
  subheading,
  stepperIsVisible,
  step,
}: React.PropsWithChildren<AuthPropsType>) => {
  const stepper: number[] = [1, 2, 3, 4];
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="../assests/logoWithBg.svg" alt="Tg-logo" width={250} height={100} />
        </div>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subheading}>{subheading}</p>
        </div>
        <div className={styles.formWrapper}>{children}</div>
        {stepperIsVisible && (
          <div className={step === 3 ? `${styles.flexGap} ${styles.flex_margin}` : styles.flexGap}>
            {stepper.map((st) => (
              <div className={step === st ? styles.filled_rounded : styles.rounded}></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthHoc;
