'use client';
// import React, {useState} from 'react';
// import sendRequest from '../../../services/api/apiServices';

// interface DeletespecProps {
//   deletedata: string;
//   Id: string;
// }

// const Deletespec: React.FC<DeletespecProps> = ({deletedata: method, Id}) => {
//   const [deletModal, setDeleteModal] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [dataDeleted, setDataDeleted] = useState(false);
//   const handleDelete = async () => {
//     const token = localStorage.getItem('jwtToken');
//     const deleteResponse = await sendRequest(`room/rooms/${Id}`, {
//       method,
//       headers: {Authorization: `Bearer ${token}`},
//     });
//     setDataDeleted(true);
//   };

//   return (
//     <>
//       {' '}
//       <button onClick={() => setDeleteModal(true)}>delete</button>
//       {deletModal ? (
//         <div>
//           <h4>Delete</h4>
//           <p>Are you sure want to delete this room?</p>
//           <button onClick={handleDelete}>Delete</button>
//           <button>cancel</button>
//         </div>
//       ) : (
//         ''
//       )}
//     </>
//   );
// };
import React from 'react';

const Deletespec = () => {
  return <div>delete</div>;
};

export default Deletespec;
