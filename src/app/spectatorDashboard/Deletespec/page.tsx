// import React, {useEffect, useState} from 'react';
// import styles from '../../../styles/Spectator.module.scss';
// import sendRequest from '../../../services/api/apiServices';

// interface DeleteData {
//   delete: string;
// }

// const Deletespec = (props: DeleteData) => {
//   const [fwdId, setFwdId] = useState<any>();
//   const [teamData, setTeamData] = useState<any[]>([]);
//   const [delModel, setDelModel] = useState(false);

//   const handleForwardIndex = (value: any) => {
//     setFwdId(value);
//   };

//   useEffect(() => {
//     const AllSpectator = async () => {
//       const data = teamData[fwdId];
//       const id = data.id;
//       const token = localStorage.getItem('jwtToken');
//       console.log('check fdvfdv==>', token);
//       const specResponse = await sendRequest('room/rooms/_id', {
//         method: 'Delete',
//         headers: {Authorization: `Bearer ${token}`},
//       });
//       setDelModel(specResponse.data);
//       console.log('check ==> ', specResponse.data);
//     };

//     AllSpectator();
//   }, []);
//   return (
//     <div>
//       <button
//         className={styles.main_form_btn}
//         onClick={() => setDelModel(true)}
//       >
//         {props.delete}
//       </button>
//     </div>
//   );
// };

// export default Deletespec;
import React, {useState} from 'react';
import sendRequest from '../../../services/api/apiServices';

interface DeletespecProps {
  delete: string;
  Id: string;
}
interface propDelete {
  btnName: string;
  children: string;
}

const Deletespec: React.FC<DeletespecProps> = ({delete: method, Id}) => {
  const [deletModal, setDeleteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDeleted, setDataDeleted] = useState(false);
  const handleDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    const deleteResponse = await sendRequest(`room/rooms/${Id}`, {
      method,
      headers: {Authorization: `Bearer ${token}`},
    });
    setDataDeleted(true);
  };

  return (
    <>
      {' '}
      <button onClick={() => setDeleteModal(true)}></button>
      {deletModal ? (
        <div>
          <h4>Delete</h4>
          <p>Are you sure want to delete this room?</p>
          <button onClick={handleDelete}>Delete</button>
          <button>cancel</button>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Deletespec;
