import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';
import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';
import {Tooltip} from '@nextui-org/react';
import { FormDefaultPropsType } from '../authInterfaces';

const PersonalDetail = ({handleStepChange, currentStep}: FormDefaultPropsType) => {
  return (
      <div>
        <form className={styles.form}>
          <div className={styles.profile_sec}>
            <div className={styles.round}>
              <Image
                src="/assests/profilePik.png"
                alt="fullname"
                width={100}
                height={100}
              />
            </div>

            <div className={styles.right}>
              <h2 className={styles.upload}>Upload Profile Picture</h2>
              <p>(Optional)</p>
            </div>
          </div>

          <div className={styles.editBtn}>
            <Image
              src="/assests/edit.svg"
              alt="fullname"
              width={30}
              height={30}
            />
          </div>

          <div className={styles.input_box}>
            <label className={styles.email} htmlFor="email">
              <Image
                src="/assests/maillogo.svg"
                alt="mailogo"
                width={30}
                height={20}
              />
            </label>
            <Input
              id="Player Id/Username"
              className={styles.email_wrapper}
              type="text"
              name="Player Id/Username"
              autoComplete="off"
              placeholder="Player Id/Username"
            />

            <Tooltip className={styles.toolTip} content="The player id should match with the BGMI game id">
              <Image
                src="/assests/i.svg"
                alt="mailogo"
                width={30}
                height={20}
              />
            </Tooltip>
          </div>

          <div className={styles.input_box}>
            <label className={styles.email} htmlFor="email">
              <Image
                src="/assests/maillogo.svg"
                alt="mailogo"
                width={30}
                height={20}
              />
            </label>
            <Input
              id="UPI_Id"
              className={styles.email_wrapper}
              type="text"
              name="UPI Id"
              autoComplete="off"
              placeholder="UPI Id"
            />
          </div>

          <div className={styles.input_box}>
            <label className={styles.email} htmlFor="email">
              <Image
                src="/assests/maillogo.svg"
                alt="mailogo"
                width={30}
                height={20}
              />
            </label>
            <Input
              id="WhatsApp_Number"
              className={styles.email_wrapper}
              type="text"
              name="WhatsApp Number"
              autoComplete="off"
              placeholder="WhatsApp Number"
            />
            <Tooltip className={styles.toolTip} content="WhatsApp number preferred">
              <Image
                src="/assests/i.svg"
                alt="mailogo"
                width={30}
                height={20}
              />
            </Tooltip>
          </div>
        </form>

        <Button
          className={styles.google_btn}
          onClick={() => handleStepChange(currentStep + 1)}
        >
          <span className={styles.nextArrow}>Next </span>
          <Image
            src="/assests/rightArrow.svg"
            alt="mailogo"
            width={12}
            height={12}
          />
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