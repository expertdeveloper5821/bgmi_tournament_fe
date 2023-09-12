'use client';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from '@/styles/Spectator.module.scss';
import { toast } from 'react-toastify';
import { sendRequest } from '@/utils/axiosInstanse';

const Deletespec = ({ Id, getAllSpectator }: any) => {
  const [deletModal, setDeleteModal] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const deleteResponse = await sendRequest(`room/rooms/${Id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      getAllSpectator();
      if (deleteResponse) {
        const success = deleteResponse.data.message;
        toast.success(success);
      }
    } catch (error: any) {
      setMessage('data is not deleted');
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
              <button className={styles.dele_btn} onClick={handleDelete}>
                Delete
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
