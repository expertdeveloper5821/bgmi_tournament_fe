'use client';
import { useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';
//@ts-ignore
import { Input } from 'technogetic-iron-smart-ui';

export function SearchFilter({ handleSearch, onChange }) {
  const [searchFilter, setSearchFilter] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setSearchFilter(e?.target?.value);
  };

  return (
    <div className={styles.input_desc}>
      <Input
        className={styles.search_input_box}
        placeholder="Search"
        type="search"
        onChange={handleInputChange}
      ></Input>
      <div className={styles.button_wrapper}>
        <button className={styles.btnPrime} onClick={() => handleSearch(searchFilter)}>
          Search
        </button>
      </div>
    </div>
  );
}
