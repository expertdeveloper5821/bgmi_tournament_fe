'use client';
import React, {useState} from 'react';
import {sendRequest} from '../../../services/auth/auth_All_Api';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';
import {AiOutlineDelete} from 'react-icons/ai';
import styles from '../../../styles/Spectator.module.scss';

const Updatespec = ({roomData, getAllSpectator}: any) => {
  const [deletModal, setDeleteModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({...roomData});

  const updateRoom = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    const bodyData = {
      roomId: updateFormData.roomId,
      gameName: updateFormData.gameName,
      gameType: updateFormData.gameType,
      mapType: updateFormData.mapType,
      userId: updateFormData.userId,
    };
    console.log('bodyData', bodyData);
    try {
      const updateResponse = await sendRequest(`room/rooms/${roomData._id}`, {
        method: 'PUT',
        headers: {Authorization: `Bearer ${token}`},
        data: bodyData,
      });
      getAllSpectator();

      if (updateResponse) {
        console.log('update ==>', updateResponse);
      }
    } catch (error: any) {}
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
              <Input
                type="text"
                value={updateFormData.roomId}
                onChange={(e: any) =>
                  setUpdateFormData({...updateFormData, roomId: e.target.value})
                }
                placeholder="Room ID"
              />
              <Input
                type="text"
                value={updateFormData.gameName}
                onChange={(e: any) =>
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
                onChange={(e: any) =>
                  setUpdateFormData({
                    ...updateFormData,
                    gameType: e.target.value,
                  })
                }
                placeholder="Game Type"
              />
              <Input
                type="text"
                value={updateFormData.mapType}
                onChange={(e: any) =>
                  setUpdateFormData({
                    ...updateFormData,
                    mapType: e.target.value,
                  })
                }
                placeholder="Map Type"
              />

              <Button type="submit">Update Room</Button>
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
