'use client';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import sendRequest from '../../../services/api/apiServices';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';
import {AiOutlineDelete} from 'react-icons/ai';
import styles from '../../../styles/Spectator.module.scss';
import {RoomData} from '../Room/page';

interface UpdatespecProps {
  roomData: RoomData;
  getAllSpectator: () => void;
  updateRoom: (updatedRoom: RoomData) => void;
}
const Updatespec = ({roomData, getAllSpectator}: UpdatespecProps) => {
  const [error, setError] = useState<string>('');
  const [deletModal, setDeleteModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState<RoomData>(roomData);

  const updateRoom = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    console.log('check ==>', token);

    const bodyData = {
      roomId: updateFormData.roomId,
      gameName: updateFormData.gameName,
      gameType: updateFormData.gameType,
      mapType: updateFormData.mapType,
      password: updateFormData.password,
      version: updateFormData.version,
      time: updateFormData.time,
      date: updateFormData.date,
      mapImg: updateFormData.mapImg,
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

      getAllSpectator();
      console.log('updateResponse', updateResponse);
      if (updateResponse) {
        setError(updateResponse.data.message);
        //setDeleteModal(false);
        console.log('update ==>', updateResponse);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <p onClick={() => setDeleteModal(true)}>
        <AiOutlineDelete style={{color: '#ff7800', size: '18'}} />
      </p>
      {deletModal ? (
        <div className={styles.main_pop_cls}>
          <div className={styles.check_model}>
            <form className={styles.update_form} onSubmit={updateRoom}>
              {error && <div className={styles.error}>{error}</div>}
              <Input
                type="text"
                value={updateFormData.roomId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateFormData({...updateFormData, roomId: e.target.value})
                }
                placeholder="Room ID"
              />
              <Input
                type="text"
                value={updateFormData.gameName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateFormData({
                    ...updateFormData,
                    gameName: e.target.value,
                  })
                }
                placeholder=" Game Name"
              />
              <Input
                type="text"
                value={updateFormData.gameType}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateFormData({
                    ...updateFormData,
                    gameType: e.target.value,
                  })
                }
                placeholder="Game Type"
              />
              <Input
                type="text"
                value={updateFormData.time}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateFormData({
                    ...updateFormData,
                    time: e.target.value,
                  })
                }
                placeholder="Game Type"
              />
              <Input
                type="text"
                value={updateFormData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateFormData({
                    ...updateFormData,
                    password: e.target.value,
                  })
                }
                placeholder="Map Type"
              />
              {/* <Input
                type="file"
                value={updateFormData.mapImg}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdateFormData({
                    ...updateFormData,
                    mapImg: e.target.value,
                  })
                }
                placeholder="file Type"
              /> */}

              <Button
                type="submit"
                className={styles.updatebtn}
                onClick={updateRoom}
              >
                Update Room
              </Button>
              <Button
                className={styles.canc_btn}
                onClick={() => setDeleteModal(false)}
              >
                cancel
              </Button>
            </form>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Updatespec;
