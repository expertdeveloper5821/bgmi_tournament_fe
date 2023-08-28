// components/GlassCrack.tsx

import React, { useState } from 'react';
import styles from '../../../styles/glassCrack.module.scss';

const GlassCrack: React.FC = () => {
  const [cracks, setCracks] = useState<{ x: number; y: number }[]>([]);

  const handleDocumentClick = (e: MouseEvent) => {
    e.stopImmediatePropagation();
    const { clientX, clientY } = e;

    // Create a new crack div and append it to the .glassContainer
    const crackDiv = document.createElement('div');
    crackDiv.className = `${styles.crack}`;
    crackDiv.style.left = `${clientX}px`;
    crackDiv.style.top = `${clientY}px`;
    document.querySelector(`.${styles.glassContainer}`)?.appendChild(crackDiv);

    // Remove the crack div after a delay (adjust as needed)
    setTimeout(() => {
      document.querySelector(`.${styles.glassContainer}`)?.removeChild(crackDiv);
    }, 2000); // Change the timeout duration to 2 seconds
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.glassContainer}>
      {cracks.map((crack, index) => (
        <div
          key={index}
          className={`${styles.glass} ${styles.crack}`}
          style={{ left: `${crack.x}px`, top: `${crack.y}px` }}
        ></div>
      ))}
    </div>
  );
};

export default GlassCrack;
