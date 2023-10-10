'use client';
import React, { useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import { Input } from 'technogetic-iron-smart-ui';

const InputCustomTag = ({ tags, onTagChange, type }: any) => {
  const [tagInput, setTagInput] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const handleInputKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      onTagChange([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag: string) => tag !== tagToRemove);
    onTagChange(updatedTags);
  };
  return (
    <div className={styles.tag_input_main_cls}>
      <div className="tags">
        {tags.map((tag: string) => (
          <span key={tag} className={styles.tag_textinput}>
            {tag}
            <button className={styles.remove_tag_button} onClick={() => handleTagRemove(tag)}>
              x
            </button>
          </span>
        ))}
      </div>
      <Input
        type={type}
        className={styles.tag_input_field}
        placeholder="Add tags..."
        value={tagInput}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
    </div>
  );
};
export default InputCustomTag;
