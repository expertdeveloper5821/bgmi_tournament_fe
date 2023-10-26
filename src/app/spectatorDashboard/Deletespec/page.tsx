'use client';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from '@/styles/Spectator.module.scss';
import { toast } from 'react-toastify';
import { sendRequest } from '@/utils/axiosInstanse';

const Deletespec = ({ specId, getAllSpectator }) => {
  const [deletModal, setDeleteModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const deleteResponse = await sendRequest(`room/rooms/${specId}`, {
        method: 'DELETE',
      });
      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        toast.success(deleteResponse.data.message);
        getAllSpectator();
        setIsLoading(false);
      } else {
        throw Error();
      }
    } catch (error) {
      toast.error('Something went wrong, please try again later!');
      setMessage('Room not deleted, please try again later!');
      setIsLoading(false);
    }
  };

  return (
    <>
      <p onClick={() => setDeleteModal(true)}>
        <AiOutlineDelete style={{ color: '#FFD600', size: '18' }} />
      </p>
      {deletModal ? (
        <div className={styles.main_del_sec}>
          <div className={styles.inner_del_sec}>
            <h4 className={styles.del_title}>Delete</h4>
            <div className={styles.sucess_msg}>{message}</div>
            <p className={styles.sec_heading}>Are you sure want to delete this room?</p>
            <div className={styles.del_btn_sec}>
              <button className={styles.dele_btn} onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Delete'}
              </button>
              <button className={styles.canc_btn} onClick={() => setDeleteModal(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Deletespec;
