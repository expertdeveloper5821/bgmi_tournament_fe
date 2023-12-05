import React from 'react';
import styles from '@/styles/notifications.module.scss';
import Image from 'next/image';

interface NotificationModalProps {
  notificationModalHandler: () => void;
}

const NotificationsModal = ({ notificationModalHandler }: NotificationModalProps) => {
  return (
    <div className={styles.main_Container}>
      <div className={styles.headers}>
        <div className={styles.main_heading}>Notifications</div>
        <div className={styles.img_container}>
          <Image
            src="/assests/delcancel.svg"
            alt="delete"
            height={20}
            width={20}
            onClick={notificationModalHandler}
          />
        </div>
      </div>
      <div className={styles.notifications_container}>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
        <div className={styles.list_item_container}>
          <Image
            src="https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png"
            alt="delete"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
            onClick={notificationModalHandler}
          />{' '}
          <p>Next match play on 16/oct/2023</p>
          <div className={styles.btn_container}>
            <button className={styles.accept_btn}>Accept</button>
            <button className={styles.decline}>Decline</button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button>View all notifications</button>
      </div>
    </div>
  );
};

export default NotificationsModal;
