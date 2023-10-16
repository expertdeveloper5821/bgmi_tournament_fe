import Image from 'next/image';
import styles from '@/styles/auth.module.scss';
import { AuthContainerProps } from './authInterfaces';

const AuthContainer = ({
  children,
  title = 'Welcome! Please enter your details',
}: AuthContainerProps) => {
  return (
    <div className={styles.main_container_auth}>
      <div className={styles.background_container_auth}>
        <div className={styles.container_auth}>
          <div className={styles.logo_auth}>
            <Image src="/assests/logoWithBg.svg" alt="Tg-logo" width={250} height={100} />
          </div>
          <div>
            <p className={styles.heading_auth}>{title}</p>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
