'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/cursor.module.scss';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateCursorPosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateCursorPosition);
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div
      className={styles.customcursor}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
