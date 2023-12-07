import React, { useRef, useState } from 'react';
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

const istItemArray: DemoData[] = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Abhishek',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Akash',
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Akhil',
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Abhi',
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'ak',
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Nice',
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Demo',
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 10,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 19,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 20,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
  {
    id: 21,
    url: 'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png',
    name: 'Me',
  },
];

const AssignModal = ({ onClickAssignHandler }: AssignModalPropsType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [listItemArray, setListItemArray] = useState<DemoData[] | []>(istItemArray);

  const handleMouseEnter = (index: number) => {
    setSelectedItem(index);
    setListItemArray([...istItemArray]);
  };

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
              <div
                onMouseEnter={() => handleMouseEnter(item.id)}
                className={`${styles.list_item} ${item.id === selectedItem ? styles.selected : ''}`}
                key={item.id}
              >
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
