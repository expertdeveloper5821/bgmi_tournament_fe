'use client';
import React, { useState } from 'react';
import styles from '@/styles/glassCrack.module.scss';

const GlassCrack: React.FC = () => {
  const [cracks, setCracks] = useState<{ x: number; y: number }[]>([]);

  const handleDocumentClick = (e: MouseEvent) => {
    // First, play the sound
    playBulletFireSound();

    e.stopImmediatePropagation();
    const { clientX, clientY } = e;
    const crackDiv = document.createElement('div');
    crackDiv.className = `${styles.crack}`;
    crackDiv.style.left = `${clientX}px`;
    crackDiv.style.top = `${clientY}px`;
    document.querySelector(`.${styles.glassContainer}`)?.appendChild(crackDiv);

    setTimeout(() => {
      document.querySelector(`.${styles.glassContainer}`)?.removeChild(crackDiv);
    }, 2000); // Change the timeout duration to 2 seconds
  };

  const playBulletFireSound = () => {
    const audio = new Audio('../assests/gunsound.mp3');
    audio.currentTime = 0;
    audio.play();
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
