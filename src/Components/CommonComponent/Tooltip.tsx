'use client';
import React from 'react';
import styles from '@/styles/tooltip.module.scss';

export default function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <div className={styles.tooltip_Wrapper}>
      <div
        className={`${styles.tooltip} ${show ? styles.show_tooltip : styles.hide_tooltip}`}
        style={show ? { display: 'block', width: 100 } : {}}
      >
        {text}
        <span className={styles.tooltipArrow} />
      </div>
      <div
        className={styles.icon_Wrapper}
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
