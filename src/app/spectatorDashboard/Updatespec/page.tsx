'use client';
import React, { ChangeEvent, useState } from 'react';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import styles from '@/styles/Spectator.module.scss';
import { RoomData } from '../Room/page';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { sendRequest } from '@/utils/axiosInstanse';

// export interface UpdatespecProps {
//   roomData: RoomData;
//   getAllSpectator: () => void;
//   updateRoom: () => void;
// }
const Updatespec = ({ roomData, getAllSpectator }) => {
  const [error, setError] = useState<string>('');
  const [editModal, setEditModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState<RoomData>(roomData);

  const updateRoom = async (e) => {
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
      lastSurvival: updateFormData.lastSurvival,
      highestKill: updateFormData.highestKill,
      secondWin: updateFormData.secondWin,
      thirdWin: updateFormData.thirdWin,
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
        setEditModal(false);
      }
    } catch (error) {
      setError(error.message);
      setError('room not update');
    }
  };

  return (
    <>
      <div>
        <p onClick={() => setEditModal(true)}>
          <Image src="/assests/update.svg" alt="" width={10} height={10} />
        </p>
        {editModal ? (
          <div className={styles.main_pop_cls}>
            <div className={styles.check_model}>
              <form className={styles.form_spectator_cls} onSubmit={updateRoom}>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.flex_col}>
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
                      placeholder="Time"
                    />
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Password
                    </label>
                    <Input
                      type="password"
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
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Version
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.version}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          version: e.target.value,
                        })
                      }
                      placeholder="Enter Version"
                    />
                  </div>
                </div>
                <div className={styles.flex_col}>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Map Type
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.mapType}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          mapType: e.target.value,
                        })
                      }
                      placeholder="Map Type"
                    />
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Date
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.date}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          date: e.target.value,
                        })
                      }
                      placeholder="Date"
                    />
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Last Servival
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.lastSurvival}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          lastSurvival: e.target.value,
                        })
                      }
                      placeholder="Date"
                    />
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Highest Kill
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.highestKill}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          highestKill: e.target.value,
                        })
                      }
                      placeholder=" Highest Win"
                    />
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Second Win
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.secondWin}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          secondWin: e.target.value,
                        })
                      }
                      placeholder="Second Win"
                    />
                  </div>
                  <div className={styles.input_box}>
                    <label className={styles.room_id} htmlFor="Password">
                      Third Win
                    </label>
                    <Input
                      type="text"
                      className={styles.room_field_wrapper}
                      value={updateFormData.thirdWin}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateFormData({
                          ...updateFormData,
                          thirdWin: e.target.value,
                        })
                      }
                      placeholder="Third Win"
                    />
                  </div>
                </div>
              </form>
              <div className={styles.btn_form_wrapper}>
                <Button className={styles.cancel_btn} onClick={() => setEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className={styles.roombutton} onClick={updateRoom}>
                  Update Room
                </Button>
              </div>
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
