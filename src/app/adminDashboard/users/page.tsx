// 'use client';
// import React, { useState, useEffect } from 'react';
// import styles from '../../../styles/Dashboard.module.scss';
// import { Navbar } from '../../../Components/Navbar/Navbar';
// import TableData, { userData } from '../../../Components/Table/Table';
// import assignmentData from '../../../utils/CreateAssignment.json';
// //@ts-ignore
// import { Pagination } from 'technogetic-iron-smart-ui';
// import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
// import RequireAuthentication from '../../../utils/requireAuthentication';
// // import apiServices from '@/services/api/apiServices';
// import sendRequest from '@/services/auth/auth_All_Api';

// export interface IAppProps { }

// function page() {
//   const [userData, setUserData] = useState<userData[]>([]);
//   // const transformedStudentData = assignmentData.studentData.map(
//   //   (item: StudentProfile) => ({
//   //     StudentName: item.StudentName,
//   //     Student: item.Student,
//   //     studentID: item.studentID,
//   //     Mobile: item.Mobile,
//   //     Course: item.Course,
//   //   }),
//   // );

//   // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQzM2JmZDBkMGVkNGZlNmZhNTIzYmUiLCJyb2xlIjpbeyJfaWQiOiI2NGM3ODU5MjI2ZmM2NWJjMGYzY2NiMmIiLCJyb2xlIjpbInNwZWN0YXRvciJdfV0sImlhdCI6MTY5MTY1OTQ0MywiZXhwIjoxNjkxODMyMjQzfQ.gRDa4vJQeOqVA_HG8hXN5dPdT2UTofOvq7rikgjyQSA';

//   useEffect(() => {
//     const fetchTournaments = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const response = await sendRequest('api/v1/user/getalluser', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (response?.data) {
//           setUserData(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching tournament data:', error);
//       }
//     };

//     fetchTournaments();
//   }, []);

//   // useEffect(() => {
//   //   const startIndex = (currentPage - 1) * rowPerPage;
//   //   const endIndex = startIndex + rowPerPage;
//   //   const paginatedData = transformedStudentData.slice(startIndex, endIndex);
//   //   setPaginatedData(paginatedData);
//   // }, [currentPage, transformedStudentData]);

//   // const onPageChange = (page: number) => {
//   //   setCurrentPage(page);
//   // };

//   const columns: string[] = [
//     'fullName',
//     'userName',
//     'email',
//     // 'role',
//   ];

//   return (
//     <>
//       <RequireAuthentication>
//         <div className={styles.main_container}>
//           <div className={styles.abcd}>
//             <div className={styles.sidebar_wrapper}>
//               <Navbar />
//               <h1>Welcome to Admin Dashboard</h1>
//               <BtnDashboard />
//               <TableData
//                 userData={userData}
//                 columns={columns}
//                 showAdditionalButton={true} roomData={[]} teamData={[]} />

//               {/* <Pagination
//                 currentPage={currentPage}
//                 totalPages={Math.ceil(
//                   transformedStudentData.length / rowPerPage,
//                 )}
//                 onPageChange={onPageChange}
//               /> */}
//             </div>
//           </div>
//         </div>
//       </RequireAuthentication>
//     </>
//   );
// }

// export default page;

'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData, { UserData } from '../../../Components/Table/Table';
import assignmentData from '../../../utils/CreateAssignment.json';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
import RequireAuthentication from '../../../utils/requireAuthentication';
// import apiServices from '@/services/api/apiServices';
import sendRequest from '@/services/auth/auth_All_Api';

export interface IAppProps { }

function page() {
  const [userData, setUserData] = useState<UserData[]>([]);;
  // const transformedStudentData = assignmentData.studentData.map(
  //   (item: StudentProfile) => ({
  //     StudentName: item.StudentName,
  //     Student: item.Student,
  //     studentID: item.studentID,
  //     Mobile: item.Mobile,
  //     Course: item.Course,
  //   }),
  // );

  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQzM2JmZDBkMGVkNGZlNmZhNTIzYmUiLCJyb2xlIjpbeyJfaWQiOiI2NGM3ODU5MjI2ZmM2NWJjMGYzY2NiMmIiLCJyb2xlIjpbInNwZWN0YXRvciJdfV0sImlhdCI6MTY5MTY1OTQ0MywiZXhwIjoxNjkxODMyMjQzfQ.gRDa4vJQeOqVA_HG8hXN5dPdT2UTofOvq7rikgjyQSA';

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await sendRequest('api/v1/user/getalluser', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response?.data) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching tournament data:', error);
      }
    };

    fetchTournaments();
  }, []);

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * rowPerPage;
  //   const endIndex = startIndex + rowPerPage;
  //   const paginatedData = transformedStudentData.slice(startIndex, endIndex);
  //   setPaginatedData(paginatedData);
  // }, [currentPage, transformedStudentData]);

  // const onPageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const columns: string[] = [
    'fullName',
    'userName',
    'email',
    // 'role',
  ];

  return (
    <>
      <RequireAuthentication>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <h1>Welcome to Admin Dashboard</h1>
              <BtnDashboard />
              <TableData
                userData={userData}
                columns={columns}
                showAdditionalButton={true} roomData={[]} teamData={[]} spectatorData={[]} />

              {/* <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  transformedStudentData.length / rowPerPage,
                )}
                onPageChange={onPageChange}
              /> */}
            </div>
          </div>
        </div>
      </RequireAuthentication>
    </>
  );
}

export default page;

