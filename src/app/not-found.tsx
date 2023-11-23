'use client';
import Link from 'next/link';
import styles from '../styles/error.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.containerStyle}>
      <div className={styles['section']}>
        <h1 className={styles['error']}>404</h1>
        <div className={styles['page']}>Ooops!!! The page you are looking for is not found</div>
        <Link className={styles['back-home']} href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
