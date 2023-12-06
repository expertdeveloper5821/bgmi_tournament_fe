import styles from '@/styles/toggle.module.scss';
import React from 'react';

export const ToggleComponent = () => {
  return (
    <div className={styles.toggleswitch}>
      <input type="checkbox" id="toggle" className={styles.togglecheckbox} />
      <label htmlFor="toggle" className={styles.togglelabel}></label>
    </div>
  );
};
