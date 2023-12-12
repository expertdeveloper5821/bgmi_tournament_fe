import React, { useRef, useState } from 'react';
import styles from '@/styles/assign.module.scss';
import Image from 'next/image';
import { SpectatorsDataType } from '@/types/spectatorTypes';
import { AssignModalPropsType } from '@/types/assignModalTyoe';

const AssignModal = ({
  onModalVisibilityHandler,
  modalData,
  onAssignHandler,
  roomId,
}: AssignModalPropsType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | undefined>('');
  const [listItemArray, setListItemArray] = useState<SpectatorsDataType[] | [] | undefined>(
    modalData,
  );
  const [inputedText, setInputedText] = useState<string>('');

  const handleMouseEnter = (index: string | undefined) => {
    setSelectedItem(index);
  };

  const onChangeHandler = (e) => {
    setInputedText(e.target.value);
    setListItemArray(
      modalData?.filter(
        (prev: SpectatorsDataType) =>
          prev?.email?.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const modalVisibilityHandler = (e) => {
    if (modalRef.current === e.target || modalRef.current?.contains(e.target)) {
      return;
    }
    onModalVisibilityHandler();
  };

  return (
    <div className={styles.backdrop} onClick={modalVisibilityHandler}>
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
              value={inputedText}
              onChange={onChangeHandler}
              className={styles.search_bar}
              alt="searchbar"
              type="text"
              placeholder="Search by email"
            />
          </div>
        </div>
        <div className={styles.list_container}>
          <div
            className={
              listItemArray?.length ? styles.list_items_container : styles.no_data_found_container
            }
          >
            {listItemArray?.length ? (
              listItemArray?.map((item: SpectatorsDataType) => (
                <div
                  onMouseEnter={() => handleMouseEnter(item?._id)}
                  className={`${styles.list_item} ${
                    item._id === selectedItem ? styles.selected : ''
                  }`}
                  key={item._id}
                  onClick={() => onAssignHandler(item, roomId)}
                >
                  <Image
                    src={
                      'https://res.cloudinary.com/dh2lkjd5n/image/upload/v1701762915/dgmxu1pgkkde32kslmcg.png'
                    }
                    alt="profile image"
                    height={32}
                    width={32}
                    className={styles.profile_img}
                  />
                  <div className={styles.list_item_info_container}>
                    <div className={styles.list_item_fullname}>{item.fullName}</div>
                    <div className={styles.list_item_email}>{item.email}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.no_data_found}>No data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
