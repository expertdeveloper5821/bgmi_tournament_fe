'use client';
import { useState, useRef } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import Image from 'next/image';
//@ts-ignore
import { Input } from 'technogetic-iron-smart-ui';

export function SearchFilter({ handleSearch, onChange }) {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [changeEvent, setChangeEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setChangeEvent(e);
    setSearchFilter(e?.target?.value);
    e.target.value ? setIsVisible(true) : setIsVisible(false);
  };

  const IconClickHandler = (type: string) => {
    if (type === 'SEARCH') {
      searchContainerRef.current?.focus();
    } else if (type === 'CROSS') {
      setSearchFilter('');
      changeEvent!.target.value = '';
      onChange(changeEvent);
      setIsVisible(false);
    }
  };

  return (
    <div className={styles.input_desc}>
      <div ref={searchContainerRef} className={styles.search_Container} tabIndex={0}>
        <Input
          className={styles.search_input_box}
          placeholder="Search"
          onChange={handleInputChange}
          value={searchFilter}
        ></Input>
        <div className={styles.img_container}>
          {!isVisible ? (
            <Image
              alt="searchIcon"
              onClick={() => IconClickHandler('SEARCH')}
              className={styles.search_Icon}
              src="/assests/searchIcon.svg"
              width={18}
              height={18}
            />
          ) : (
            <Image
              alt="crossIcon"
              onClick={() => IconClickHandler('CROSS')}
              className={styles.search_Icon}
              src="/assests/whiteCross.svg"
              width={18}
              height={18}
            />
          )}
        </div>
      </div>
      <div className={styles.button_wrapper_adminDashboard}>
        <button className={styles.btnPrime} onClick={() => handleSearch(searchFilter)}>
          Search
        </button>
      </div>
    </div>
  );
}
