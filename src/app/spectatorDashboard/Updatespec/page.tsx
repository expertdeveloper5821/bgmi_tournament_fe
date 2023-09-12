'use client';
import React, { ChangeEvent, useState } from 'react';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from '@/styles/Spectator.module.scss';
import { RoomData } from '../Room/page';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { sendRequest } from '@/utils/axiosInstanse';

// interface UpdatespecProps {
//   roomData: RoomData;
//   getAllSpectator: () => void;
//   updateRoom: (updatedRoom: RoomData) => void;
// }
const Updatespec = ({ roomData, getAllSpectator }: any) => {
  const [error, setError] = useState<string>('');
  const [deletModal, setDeleteModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState<RoomData>(roomData);

  const updateRoom = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    const bodyData = {
      roomId: updateFormData.roomId,
      gameName: updateFormData.gameName,
      gameType: updateFormData.gameType,
      mapType: updateFormData.mapType,
      password: updateFormData.password,
      version: updateFormData.version,
      time: updateFormData.time,
      date: updateFormData.date,
    };

    try {
      const updateResponse = await sendRequest(`room/rooms/${roomData._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: bodyData,
      });

      if (updateResponse) {
        getAllSpectator();
        toast.success(updateResponse.data.message);
        setDeleteModal(false);
      }
    } catch (error: any) {
      setError(error.message);
      setError('room not update');
    }
  };

  return (
    <>
      <div>
        <p onClick={() => setDeleteModal(true)}>
          <Image src="/assests/update.svg" alt="" width={10} height={10} />
        </p>
        {deletModal ? (
          <div className={styles.main_pop_cls}>
            <div className={styles.check_model}>
              <form className={styles.update_form} onSubmit={updateRoom}>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="secondWin">
                    Room id
                  </label>
                  <Input
                    type="text"
                    className={styles.room_field_wrapper}
                    value={updateFormData.roomId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUpdateFormData({
                        ...updateFormData,
                        roomId: e.target.value,
                      })
                    }
                    placeholder="Room ID"
                  />
                </div>
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="secondWin">
                    Game Name
                  </label>
                  <Input
                    type="text"
                    className={styles.room_field_wrapper}
                    value={updateFormData.gameName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUpdateFormData({
                        ...updateFormData,
                        gameName: e.target.value,
                      })
                    }
                    placeholder=" Game Name"
                  />
                </div>
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="secondWin">
                    Game Type
                  </label>
                  <Input
                    type="text"
                    className={styles.room_field_wrapper}
                    value={updateFormData.gameType}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUpdateFormData({
                        ...updateFormData,
                        gameType: e.target.value,
                      })
                    }
                    placeholder="Game Type"
                  />
                </div>
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="secondWin">
                    Time
                  </label>
                  <Input
                    type="text"
                    className={styles.room_field_wrapper}
                    value={updateFormData.time}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUpdateFormData({
                        ...updateFormData,
                        time: e.target.value,
                      })
                    }
                    placeholder="Game Type"
                  />
                </div>

                <label className={styles.room_id} htmlFor="Password">
                  Password
                </label>
                <Input
                  type="text"
                  className={styles.room_field_wrapper}
                  value={updateFormData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUpdateFormData({
                      ...updateFormData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Map Type"
                />
                <Button className={styles.cancel_btn} onClick={() => setDeleteModal(false)}>
                  cancel
                </Button>
                <Button type="submit" className={styles.roombutton} onClick={updateRoom}>
                  Update Room
                </Button>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Updatespec;
