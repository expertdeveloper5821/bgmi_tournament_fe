import React, { useState } from 'react';
import styles from '@/styles/friends.module.scss';

const CustomSelect = ({ options, handleSelect }) => {
  const [selectedOption, setSelectedOption] = useState('Sort By');
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value, name) => {
    setIsOpen(false);
    handleSelect(value);
    setSelectedOption(name);
  };

  return (
    <div className={styles.customSelect}>
      <div
        className={`${styles.select} ${isOpen ? styles.selectOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <div className={styles.selectArrow} />
      </div>
      {isOpen && (
        <div className={styles.selectOptions}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.sortByOption} ${
                selectedOption === option.name && styles.activeSelect
              }`}
              onClick={() => handleOptionClick(option.value, option.name)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
