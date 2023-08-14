// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter, NextRouter } from 'next/router';
// import styles from '../../styles/TableData.module.scss';
// //@ts-ignore
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   IconButton,
// } from 'technogetic-iron-smart-ui';

// export interface userData {
//   fullName: string;
//   userName: string;
//   email: string;
//   // role?: [];
// }

// export interface RoomData {
//   roomId: string;
//   password: string;
//   gameName: string;
//   gameType: number;
//   mapType: string;
//   createdBy: string;
//   createdAt: number;
// }

// export interface SpectatorData {
//   _id: any;
//   role: string;
//   uuid: string;
// }

// interface StudentProfilePropsType {
//   showAdditionalButton?: boolean;
//   columns: string[];
//   roomData: RoomData[];
//   userData: userData[];
//   teamData: RoomData[];

// }



// type TableDataType = userData | RoomData;

// interface StudentData {
//   [key: string]: string;
// }

// // const TableData = (props: StudentProfilePropsType) => {
// //   const { roomData, userData, teamData } = props;
// //   console.log(props.columns);
// //   const [sortedData, setSortedData] = useState(
// //     roomData || userData || teamData || [],
// //   );
// //   //   console.log('sortedData ==> user', sortedData);
// //   const [isDescending, setIsDescending] = useState(false);
// //   const [sortKey, setSortKey] = useState('');

// //   useEffect(() => {
// //     const { roomData, userData } = props;
// //     if (window.location.href.includes('users')) {
// //       setSortedData(userData);
// //     }
// //     if (window.location.href.includes('teams')) {
// //       setSortedData(teamData);
// //     }
// //     if (window.location.href.includes('room')) {
// //       setSortedData(roomData);
// //     }
// //   }, [props]);

// //   const handleSort = (
// //     key: keyof RoomData | keyof userData,
// //     dataType: 'room' | 'user',
// //   ) => {

// const TableData = (props: StudentProfilePropsType) => {
//   const { roomData, userData, teamData } = props;
//   const [sortedData, setSortedData] = useState<TableDataType[]>([]);
//   const [isDescending, setIsDescending] = useState(false);
//   const [sortKey, setSortKey] = useState('');

//   useEffect(() => {
//     const updateSortedData = () => {
//       if (window.location.href.includes('users')) {
//         setSortedData(userData);
//       } else if (window.location.href.includes('teams')) {
//         setSortedData(teamData);
//       } else if (window.location.href.includes('room')) {
//         setSortedData(roomData);
//       }
//     };
//     updateSortedData();
//   }, [props]);

//   // const handleSort = (
//   //   key: keyof RoomData | keyof userData,
//   //   dataType: 'room' | 'user',
//   // ) => {
//   const handleSort = (
//     key: keyof TableDataType,
//     dataType: 'room' | 'user'
//   ) => {
//     let sorted = [];
//     if (sortKey === key) {
//       sorted = [...sortedData].reverse();
//       setIsDescending(!isDescending);
//     } else {
//       sorted = [...sortedData].sort((a: TableDataType, b: TableDataType) => {
//         const aValue = dataType === 'room' ? a[key] : a[key];
//         const bValue = dataType === 'room' ? b[key] : b[key];

//         if (aValue < bValue) return isDescending ? 1 : -1;
//         if (aValue > bValue) return isDescending ? -1 : 1;
//         return 0;
//       });
//       setIsDescending(false);
//     }
//     setSortedData(sorted);
//     setSortKey(String(key));
//   };

//   function handleDelete({ roomData }: { roomData: RoomData }): void {
//     const updatedData = sortedData.filter(
//       (data: TableDataType) => data !== roomData
//     );
//     setSortedData(updatedData);
//   }

//   const handleEdit = (studentData: StudentData) => {
//     // console.log("Edit student data:", studentData);
//   };

//   console.log('sortedData type:', typeof sortedData);

//   return (
//     <div>
//       <Table className={styles.table_content}>
//         <TableHeader className={styles.tableHeader}>
//           <TableRow className={styles.tableRow}>
//             {props.columns.map((columnName) => (
//               <TableHead className={styles.table_head} key={columnName}>
//                 <div className={styles.filter}>
//                   {columnName}
//                   <div>
//                     <img
//                       src="/assests/upArrow.svg"
//                       alt="filterup"
//                       onClick={() => handleSort(columnName as keyof TableDataType, 'room')}
//                     ></img>
//                     <img
//                       src="/assests/downArrow.svg"
//                       alt="filterdown"
//                       onClick={() => handleSort(columnName as keyof TableDataType, 'room')}
//                     ></img>
//                   </div>
//                 </div>
//               </TableHead>
//             ))}
//             <TableHead className={styles.table_head}>
//               <div className={styles.filter}>Actions</div>
//             </TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody className={styles.table_body}>
//           {sortedData?.map((elm: any, index: number) => {
//             console.log('sortedData type:', typeof sortedData);
//             const additionalImagePath = props.showAdditionalButton
//               ? './assests/StudentProfile.svg'
//               : null;

//             return (
//               <TableRow className={styles.table_rowdata} key={index}>
//                 {elm.roomId && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.roomId}
//                   </TableCell>
//                 )}
//                 {elm.password && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.password}
//                   </TableCell>
//                 )}
//                 {elm.gameName && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.gameName}
//                   </TableCell>
//                 )}
//                 {elm.gameType && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.gameType}
//                   </TableCell>
//                 )}
//                 {elm.mapType && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.mapType}
//                   </TableCell>
//                 )}
//                 {elm.createdBy && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.createdBy}
//                   </TableCell>
//                 )}
//                 {elm.createdAt && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.createdAt}
//                   </TableCell>
//                 )}
//                 {elm.fullName && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.fullName}
//                   </TableCell>
//                 )}
//                 {elm.userName && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.userName}
//                   </TableCell>
//                 )}
//                 {elm.email && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.email}
//                   </TableCell>
//                 )}{' '}
//                 {elm.uuid && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.uuid}
//                   </TableCell>
//                 )}{' '}
//                 {elm.leadPlayer && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.leadPlayer}
//                   </TableCell>
//                 )}{' '}
//                 {/* {elm.teammates && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.teammates}
//                   </TableCell>
//                 )} */}
//                 {elm.registeredGame && (
//                   <TableCell className={styles.table_cell}>
//                     {elm.registeredGame}
//                   </TableCell>
//                 )}
//                 <TableCell className={styles.table_cell}>
//                   {additionalImagePath ? (
//                     <IconButton>
//                       <div className={styles.iconWrapper}>
//                         <img
//                           src="/assests/studentprofile.svg"
//                           alt="studentProfileView"
//                           className={styles.table_icon}
//                         ></img>
//                         <span>View Profile</span>
//                       </div>
//                     </IconButton>
//                   ) : (
//                     <>
//                       <IconButton onClick={() => handleEdit(elm)}>
//                         <img
//                           src="/assests/TableEdit.svg"
//                           alt="studentProfileEdit"
//                           className={styles.cell_icon}
//                         ></img>
//                       </IconButton>
//                       <IconButton onClick={() => handleDelete(elm)}>
//                         <img
//                           src="/assests/Tabledelete.svg"
//                           alt="studentProfileDelete"
//                           className={styles.cell_icon}
//                         ></img>
//                       </IconButton>
//                     </>
//                   )}
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TableData;

'use client';
import { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';
import styles from '../../styles/TableData.module.scss';
//@ts-ignore
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
} from 'technogetic-iron-smart-ui';

export interface UserData {
  fullName: string;
  userName: string;
  email: string;
  // role?: [];
}

export interface RoomData {
  roomId: string;
  password: string;
  gameName: string;
  gameType: number;
  mapType: string;
  createdBy: string;
  createdAt: number;
}

export interface SpectatorData {
  fullName: string;
  userName: any;
  email: any;
}
interface StudentProfilePropsType {
  showAdditionalButton?: boolean;
  columns: string[];
  userData: UserData[];
  roomData: RoomData[];
  spectatorData: SpectatorData[];
  teamData: RoomData[];

}

type TableDataType = UserData | RoomData | SpectatorData;

interface StudentData {
  [key: string]: string;
}

// const TableData = (props: StudentProfilePropsType) => {
//   const { roomData, userData, teamData } = props;
//   console.log(props.columns);
//   const [sortedData, setSortedData] = useState(
//     roomData || userData || teamData || [],
//   );
//   //   console.log('sortedData ==> user', sortedData);
//   const [isDescending, setIsDescending] = useState(false);
//   const [sortKey, setSortKey] = useState('');

//   useEffect(() => {
//     const { roomData, userData } = props;
//     if (window.location.href.includes('users')) {
//       setSortedData(userData);
//     }
//     if (window.location.href.includes('teams')) {
//       setSortedData(teamData);
//     }
//     if (window.location.href.includes('room')) {
//       setSortedData(roomData);
//     }
// }, [props]);

const TableData = (props: StudentProfilePropsType) => {
  const { roomData, userData, teamData, spectatorData } = props;
  const [sortedData, setSortedData] = useState<TableDataType[]>([]);
  const [isDescending, setIsDescending] = useState(false);
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    const updateSortedData = () => {
      if (window.location.href.includes('users')) {
        setSortedData(userData);
      } else if (window.location.href.includes('teams')) {
        setSortedData(teamData);
      } else if (window.location.href.includes('room')) {
        setSortedData(roomData);
      } else if (window.location.href.includes('spectator')) {
        setSortedData(spectatorData)
      }
    };
    updateSortedData();
  }, [props]);

  // const handleSort = (
  //   key: keyof RoomData | keyof userData,
  //   dataType: 'room' | 'user',
  // ) => {
  const handleSort = (
    key: keyof TableDataType,
    dataType: 'room' | 'user' | 'spectator'
  ) => {
    let sorted = [];

    if (sortKey === key) {
      sorted = [...sortedData].reverse();
      setIsDescending(!isDescending);
    } else {
      sorted = [...sortedData].sort((a: TableDataType, b: TableDataType) => {
        const aValue = dataType === 'room' ? a[key] : a[key];
        const bValue = dataType === 'room' ? b[key] : b[key];

        if (aValue < bValue) return isDescending ? 1 : -1;
        if (aValue > bValue) return isDescending ? -1 : 1;
        return 0;
      });
      setIsDescending(false);
    }
    setSortedData(sorted);
    setSortKey(String(key));
  };

  function handleDelete({ roomData }: { roomData: RoomData }): void {
    const updatedData = sortedData.filter(
      (data: TableDataType) => data !== roomData
    );
    setSortedData(updatedData);
  }

  // const handleEdit = (studentData: studentData) => {
  //   // console.log("Edit student data:", studentData);
  // };
  const handleEdit = (studentData: StudentData, index: number) => {
    // Edit logic remains the same
    console.log('sortedData type:', typeof sortedData);
  };

  console.log('sortedData type:', typeof sortedData);

  return (
    <div>
      <Table className={styles.table_content}>
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {props.columns.map((columnName, index) => (
              <TableHead className={styles.table_head} key={index}>
                <div className={styles.filter}>
                  {columnName}
                  <div>
                    <img
                      src="/assests/upArrow.svg"
                      alt="filterup"
                      onClick={() => handleSort(columnName as keyof TableDataType, 'room')}
                    ></img>
                    <img
                      src="/assests/downArrow.svg"
                      alt="filterdown"
                      onClick={() => handleSort(columnName as keyof TableDataType, 'room')}
                    ></img>
                  </div>
                </div>
              </TableHead>
            ))}
            <TableHead className={styles.table_head}>
              <div className={styles.filter}>Actions</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className={styles.table_body}>
          {sortedData?.map((elm: any, index: number) => {
            console.log('sortedData type:', typeof sortedData);
            const additionalImagePath = props.showAdditionalButton
              ? './assests/StudentProfile.svg'
              : null;

            return (
              <TableRow className={styles.table_rowdata} key={index}>
                {elm.roomId && (
                  <TableCell className={styles.table_cell}>
                    {elm.roomId}
                  </TableCell>
                )}
                {elm.password && (
                  <TableCell className={styles.table_cell}>
                    {elm.password}
                  </TableCell>
                )}
                {elm.gameName && (
                  <TableCell className={styles.table_cell}>
                    {elm.gameName}
                  </TableCell>
                )}
                {elm.gameType && (
                  <TableCell className={styles.table_cell}>
                    {elm.gameType}
                  </TableCell>
                )}
                {elm.mapType && (
                  <TableCell className={styles.table_cell}>
                    {elm.mapType}
                  </TableCell>
                )}
                {elm.createdBy && (
                  <TableCell className={styles.table_cell}>
                    {elm.createdBy}
                  </TableCell>
                )}
                {elm.createdAt && (
                  <TableCell className={styles.table_cell}>
                    {elm.createdAt}
                  </TableCell>
                )}
                {elm.fullName && (
                  <TableCell className={styles.table_cell}>
                    {elm.fullName}
                  </TableCell>
                )}
                {elm.userName && (
                  <TableCell className={styles.table_cell}>
                    {elm.userName}
                  </TableCell>
                )}
                {elm.email && (
                  <TableCell className={styles.table_cell}>
                    {elm.email}
                  </TableCell>
                )}{' '}
                {elm.uuid && (
                  <TableCell className={styles.table_cell}>
                    {elm.uuid}
                  </TableCell>
                )}{' '}
                {elm.leadPlayer && (
                  <TableCell className={styles.table_cell}>
                    {elm.leadPlayer}
                  </TableCell>
                )}{' '}
                {/* {elm.teammates && (
                  <TableCell className={styles.table_cell}>
                    {elm.teammates}
                  </TableCell>
                )} */}
                {elm.registeredGame && (
                  <TableCell className={styles.table_cell}>
                    {elm.registeredGame}
                  </TableCell>
                )}

                <TableCell className={styles.table_cell}>
                  {additionalImagePath ? (
                    <IconButton>
                      <div className={styles.iconWrapper}>
                        <img
                          src="/assests/studentprofile.svg"
                          alt="studentProfileView"
                          className={styles.table_icon}
                        ></img>
                        <span>View Profile</span>
                      </div>
                    </IconButton>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(elm, index)}>
                        <img
                          src="/assests/TableEdit.svg"
                          alt="studentProfileEdit"
                          className={styles.cell_icon}
                        ></img>
                      </IconButton>
                      <IconButton onClick={() => handleDelete(elm)}>
                        <img
                          src="/assests/Tabledelete.svg"
                          alt="studentProfileDelete"
                          className={styles.cell_icon}
                        ></img>
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div >
  );
};

export default TableData;

