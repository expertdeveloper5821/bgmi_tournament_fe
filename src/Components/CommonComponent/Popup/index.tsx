import React, { ReactNode } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className={styles.pop_main}>
        <div className={styles.inner_pop_sec}>
          <div>{children}</div>
          <div>
            <AiOutlineClose className={styles.close_button} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
