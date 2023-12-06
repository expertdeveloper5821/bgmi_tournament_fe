import styles from '@/styles/toggle.module.scss';
import React, { useState } from 'react';

export const ToggleComponent = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  return (
    <div className={styles.toggleswitch}>
      <input type="checkbox" checked={isEnabled} id="toggle" className={styles.togglecheckbox} />
      <label
        htmlFor="toggle"
        onClick={() => setIsEnabled((prev: boolean) => !prev)}
        className={styles.togglelabel}
      ></label>
    </div>
  );
};
