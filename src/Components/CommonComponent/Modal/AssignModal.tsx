import React, { useRef } from 'react';
import styles from '@/styles/assign.module.scss';
import Image from 'next/image';

interface AssignModalPropsType {
  onClickAssignHandler: () => void;
}

interface DemoData {
  id: number;
  url: string;
  name: string;
}
const AssignModal = ({ onClickAssignHandler }: AssignModalPropsType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const listItemArray: DemoData[] = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
      name: 'Me',
    },
  ];

  const handleClick = (e) => {
    if (modalRef.current === e.target || modalRef.current?.contains(e.target)) {
      return;
    }
    onClickAssignHandler();
  };
  return (
    <div className={styles.backdrop} onClick={handleClick}>
      <div className={styles.assign_Modal_Container} ref={modalRef}>
        <div className={styles.search_Container}>
          <div className={styles.sub_search_Container}>
            <Image
              alt="searchIcon"
              className={styles.search_Icon}
              src="/assests/blackSearchIcon.svg"
              width={13}
              height={13}
            />
            <input
              className={styles.search_bar}
              alt="searchbar"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className={styles.list_container}>
          <div className={styles.list_items_container}>
            {listItemArray.map((item: DemoData) => (
              <div className={styles.list_item} key={item.id}>
                <Image
                  src={item.url}
                  alt="profile image"
                  height={32}
                  width={32}
                  className={styles.profile_img}
                />
                <span className={styles.list_item_text}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
