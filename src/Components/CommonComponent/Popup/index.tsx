import React, { ReactNode } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  dynamicClass?: string;
  CloseBtn?: string;
  MainClose?: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  dynamicClass,
  CloseBtn,
  MainClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className={styles.pop_main}>
        <div className={dynamicClass}>
          <div>{children}</div>
          <div className={MainClose}>
            <AiOutlineClose className={CloseBtn} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
