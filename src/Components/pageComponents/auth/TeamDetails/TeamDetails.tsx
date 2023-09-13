import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { FormDefaultPropsType } from '../authInterfaces';

const PersonalDetail = ({ handleStepChange, currentStep }: FormDefaultPropsType) => {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image src="/assests/teams.svg" alt="mailogo" width={30} height={20} />
          </label>
          <Input
            id="teamName"
            className={styles.email_wrapper}
            type="text"
            name="teamName"
            autoComplete="off"
            placeholder="Team Name"
          />
        </div>

        <div className={styles.input_box}>
          <label className={styles.email} htmlFor="email">
            <Image src="/assests/maillogo.svg" alt="mailogo" width={30} height={20} />
          </label>
          <Input
            id="UPI_Id"
            className={styles.email_wrapper}
            type="text"
            name="UPI Id"
            autoComplete="off"
            placeholder="Invite Friends Via Mail"
          />
        </div>
      </form>

      <Button className={styles.google_btn} onClick={() => handleStepChange(currentStep + 1)}>
        <span className={styles.nextArrow}>Finish</span>
      </Button>

      <Button className={styles.finish}>
        <span className={styles.nextArrow}>Skip</span>
      </Button>

      <div className={styles.flexGap}>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
        <div className={styles.rounded}></div>
      </div>
    </div>
  );
};

export default PersonalDetail;
