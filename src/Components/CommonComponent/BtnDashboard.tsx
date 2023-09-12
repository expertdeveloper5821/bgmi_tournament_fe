'use client';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';

export interface IAppProps {}

export function BtnDashboard() {
  return (
    <>
      <div className={styles.dashboard_content}>
        <div className={styles.content_wrapper}>
          <div className={styles.input_desc}>
            <Input placeholder="Squad Name" type="text"></Input>
            <Input placeholder="Date and Time" type="text"></Input>
            <div className={styles.select_wrapper}></div>
            <div className={styles.button_wrapper}>
              <Button className={styles.searchbutton} varient="contained">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
