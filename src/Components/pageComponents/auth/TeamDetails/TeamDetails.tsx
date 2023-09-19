import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/personal_detail.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { FormDefaultPropsType } from '../authInterfaces';
import React, { useState, KeyboardEvent } from 'react';




const PersonalDetail = ({ handleStepChange, currentStep }: FormDefaultPropsType) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {

    if(items.length === 3){
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
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleEnterKey}
          />
          <p className={styles.option}>(optional)</p>
        </div>

        {Boolean(items.length) &&
          items.map((email: string, index:number) => (
            <>
              <div className={styles.tags}>
                <div className={styles.names}>
                  <h4 className={styles.tagName}>{email}</h4>
                  <Image src="/assests/cancle.svg" alt="mailogo" width={15} height={15} onClick={() => handleRemoveItem(index)} />
                </div>
              </div>
            </>
          ))}

        <Button className={styles.google_finsh} onClick={()=>{}}>
          <span className={styles.nextArrow}>Finish</span>
        </Button>

        <Button className={styles.finish}>
          <span className={styles.nextArrow}>Skip</span>
        </Button>
      </form>

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
