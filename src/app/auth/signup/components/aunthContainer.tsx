import Image from 'next/image';
import styles from '../../../../styles/auth.module.scss';

interface AuthConatinerProps {
  children: any;
  title?: string;
  description?: string;
  step: number;
}
const TITLE_DISCRITPION = [
  {
    title: 'Create account! Please enter your details',
    description: 'Create Account',
  },
  {
    title: ' To proceed further! Please enter all details',
    description: ' Personal Detail',
  },

  {
    title: 'To proceed further! Please enter all details',
    description: ' Team Details',
  },
];
const AuthContainer = ({
  children,

  step,
}: AuthConatinerProps) => {
  const currentTitleDis = TITLE_DISCRITPION[step - 1];
  return (
    <div className={styles.background_container}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/assests/logoWithBg.svg"
            alt="Tg-logo"
            width={250}
            height={100}
          />
        </div>
        <div>
          <p className={styles.desc}>
            {currentTitleDis?.description ? currentTitleDis?.description : ''}
          </p>
          <p className={styles.heading}>
            {currentTitleDis?.title ? currentTitleDis.title : ''}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
