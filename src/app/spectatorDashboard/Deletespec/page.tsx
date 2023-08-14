'use client';
import React, {useState} from 'react';
import sendRequest from '../../../services/api/apiServices';
import {AiOutlineDelete} from 'react-icons/ai';
import styles from '../../../styles/Spectator.module.scss';

const Deletespec = ({Id}: any) => {
  const [deletModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    const deleteResponse = await sendRequest(`room/rooms/${Id}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${token}`},
    });
  };

  return (
    <>
      <p onClick={() => setDeleteModal(true)}>
        <AiOutlineDelete style={{color: '#ff7800', size: '18'}} />
      </p>
      {deletModal ? (
        <div className={styles.main_del_sec}>
          <div className={styles.inner_del_sec}>
            <h4 className={styles.del_title}>Delete</h4>
            <p className={styles.sec_heading}>
              Are you sure want to delete this room?
            </p>
            <div className={styles.del_btn_sec}>
              <button className={styles.dele_btn} onClick={handleDelete}>
                Delete
              </button>
              <button
                className={styles.canc_btn}
                onClick={() => setDeleteModal(false)}
              >
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
