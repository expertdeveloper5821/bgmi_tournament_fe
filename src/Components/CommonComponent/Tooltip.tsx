'use client';
import React from 'react';
import styles from '@/styles/tooltip.module.scss';

export default function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '17px',
      }}
    >
      <div className={styles.tooltip} style={show ? { display: 'block', width: 100 } : {}}>
        {text}
        <span className={styles.tooltipArrow} />
      </div>
      <div
        style={{ height: '17px' }}
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
