'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData, { UserProfile, USER_DATA } from '../../../Components/Table/TableData';
import assignmentData from '../../../utils/CreateAssignment.json';
// @ts-ignore
import { Pagination, Button, Input } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
import sendRequest from '@/services/auth/auth_All_Api';

interface RoomPageProps {
}

function RoomPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<UserProfile[]>([]);
  const [formValues, setFormValues] = useState({
    roomId: '',
    gameName: '',
    gameType: '',
    gameMapName: '',
    password: ''
  });
  const [apiData, setApiData] = useState<USER_DATA[] | []>([]);
  console.log("apiData", apiData)
  const rowPerPage = 8;

  const transformedStudentData = assignmentData.StudentData.map(
    (item: USER_DATA) => ({
      StudentName: item.StudentName,
      Student: item.Student,
      studentID: item.studentID,
      Mobile: item.Mobile,
      Course: item.Course,
    }),
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchDataFromAPI();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("setFormValues", setFormValues)
  };

  const fetchDataFromAPI = async () => {
    try {
      const response = await sendRequest('v3/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response) {
        throw new Error('API request failed');
      }
      console.log("response", response)

      const data = await response.data();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };


  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns: string[] = [
    'Squad',
    'Room Id',
    'Spectator Id',
    'Date and Time',
    'Map',
  ];

  const page = () => {
    return (
      <>
        <div className={styles.main_container}>
          <div className={styles.abcd}>
            <h1>Welcome to tournament</h1>
            <div className={styles.sidebar_wrapper}>
              <Navbar />
              <BtnDashboard />
            </div>
            <form>
              <div className={styles.input_box}>
                <label className={styles.email} htmlFor="email">
                  Room ID
                </label>
                <Input
                  id="roomId"
                  className={styles.email_wrapper}
                  type="number"
                  name="roomId"
                  placeholder="Enter Room ID from BGMI"
                  value={formValues.roomId}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.input_box}>
                <label className={styles.password} htmlFor="password">
                  Game Name
                </label>
                <Input
                  id="gameName"
                  className={styles.password_wrapper}
                  type="text"
                  name="gameName"
                  placeholder="Enter Game Name BGMI"
                  value={formValues.gameName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.input_box}>
                <label className={styles.password} htmlFor="password">
                  Game Type (No of players)
                </label>
                <Input
                  id="gameType"
                  className={styles.password_wrapper}
                  type="number"
                  name="gameType"
                  placeholder="Enter no of players"
                  value={formValues.gameType}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.input_box}>
                <label className={styles.password} htmlFor="password">
                  Game Map Name
                </label>
                <Input
                  id="gameMapName"
                  className={styles.password_wrapper}
                  type="text"
                  name="gameMapName"
                  placeholder="Enter bgmi map"
                  value={formValues.gameMapName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.input_box}>
                <label className={styles.password} htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  className={styles.password_wrapper}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.button_wrapper}>
                <Button
                  className={styles.forgetbutton}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                />
              </div>
            </form>
            <TableData
              userData={apiData}
              columns={columns}
              showAdditionalButton={true} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(transformedStudentData.length / rowPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default RoomPage;