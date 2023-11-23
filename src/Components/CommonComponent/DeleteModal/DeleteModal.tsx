'use client';
import React from 'react';
import styles from '@/styles/friends.module.scss';
import Image from 'next/image';

function DeleteModal(props) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.deleteModalHeader}>
          <div className={styles.titleCloseBtn}>
            <Image
              src="/assests/delcancel.svg"
              alt="delete"
              height={100}
              width={100}
              onClick={props.handleCloseModal}
            />
          </div>
          <div className={styles.title}>
            <h1>Delete</h1>
          </div>
        </div>
        <div className={styles.body}>
          <p>Are you sure want to delete this?</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.deletebtn} onClick={props.handleDeleteUser}>
            Delete
          </button>
          <button className={styles.cancelbtn} onClick={props.handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
