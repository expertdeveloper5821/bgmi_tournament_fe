'use client';
import React, {useState} from 'react';
import sendRequest from '../../../services/api/apiServices';
import {AiOutlineDelete} from 'react-icons/ai';

const Updatespec = ({roomData, onUpdate}: any) => {
  const [deletModal, setDeleteModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({...roomData});

  const updateRoom = async () => {
    const token = localStorage.getItem('jwtToken');

    try {
      const updateResponse = await sendRequest(`room/rooms/${roomData._id}`, {
        method: 'PUT',
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log('update ==>', updateResponse.data);
      //   onUpdate(updateResponse.data);

      //   setUpdateFormData({...roomData});
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div>
      <p onClick={() => setDeleteModal(true)}>
        <AiOutlineDelete style={{color: '#ff7800', size: '18'}} />
      </p>
      {deletModal ? (
        <form onSubmit={updateRoom}>
          <input
            type="text"
            value={updateFormData.roomId}
            onChange={(e) =>
              setUpdateFormData({...updateFormData, roomId: e.target.value})
            }
            placeholder="Room ID"
          />
          {/* Add more input fields for other attributes */}
          <button type="submit">Update Room</button>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export default Updatespec;
