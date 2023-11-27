'use client';
import styles from '@/styles/privacy.module.scss';
import { policyArr, termsArr } from '@/utils/constant';
const page = () => {
  return (
    <div className={styles.terms}>
      <div className={styles.container2}>
        <h1 className={styles.term_con_heading}>Terms & Conditions</h1>
        <h2 className={styles.term_con_subheading}>Last updated on Aug 1st 2023</h2>
        {policyArr.map((policy) => (
          <p className={styles.term_con_para}>{policy}</p>
        ))}
        <h2 className={styles.term_con_subheading2}>
          The use of this website is subject to the following terms of use:
        </h2>
        <ul className={styles.term_points}>
          {termsArr.map((term) => (
            <li className={styles.term_points}>{term}</li>
          ))}
        </ul>
        <h3 className={styles.term_con_lastheading}>Cancellation & Refund Policy</h3>
        <h3 className={styles.term_con_lastheading}>Last updated on Aug 1st 2023</h3>
        <p>No cancellations & Refunds are entertained</p>
      </div>
    </div>
  );
};

export default page;
