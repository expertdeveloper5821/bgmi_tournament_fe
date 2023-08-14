

'use client';
import React, { useState, useEffect } from "react";
import styles from "../../../styles/Dashboard.module.scss";
import sendRequest from "@/services/auth/auth_All_Api";
//@ts-ignore
import { Input } from 'technogetic-iron-smart-ui';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableData, { SpectatorData } from '../../../Components/Table/Table'



interface FormCreate {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: any;
}




export default function Modal() {
  const [paginatedData, setPaginatedData] = useState<SpectatorData[]>([]);
  const [spectatorData, setSpectatorData] = useState<any>([]);



  const getAllUsers = async () => {
    const tokens = localStorage.getItem('jwtToken');
    const allUsersData: any = await sendRequest('api/v1/user/getalluser', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokens}` }
    });
    const spectatorData = allUsersData?.data?.data;
    //console.log("spectatorData", spectatorData)
    const filteredData = spectatorData.filter((spectator: any) => {
      return spectator.role.role === 'spectator';
    });
    setSpectatorData(filteredData);
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  const columns: string[] = [
    'fullName',
    'userName',
    'email',
  ];

  const [modal, setModal] = useState(false);

  const initialFormData = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    role: ''
  };


  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token: any = localStorage.getItem('jwtToken');
    setFormData({ ...initialFormData, role: '64d7239c8a677a5d2e21b00d' });
    try {
      const response = await sendRequest("api/v1/role/spectator/Register", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (response.status === 200) {
        console.log("added Spectator Successfully");
      } else {
        console.log("Something Wrong, Please Try Again Later");
      }
    } catch (error: any) {
      console.log("Please try again.");
    }
    console.log('Form data submitted:', formData);
    toggleModal(); // Close the modal after submission
  };

  const toggleModal = () => {
    setModal(!modal);
    // Use React state to manage the body class instead of directly manipulating the DOM
    if (!modal) {
      document.body.classList.add('activemodal');
    } else {
      document.body.classList.remove('activemodal');
    }
  };

  return (
    <>

      <div className={styles.main_container}>
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.popupbutton}>
              <button onClick={toggleModal} className={styles.btnmodal}>Open</button>
            </div>
            {
              <TableData
                spectatorData={spectatorData}
                columns={columns}
                showAdditionalButton={true} userData={[]} teamData={[]} roomData={[]} />
            }

          </div></div></div>


      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalcontent}>
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.text}>
                  <label className={styles.name}>Full Name:</label>
                  <Input
                    type="text"
                    name="fullName"
                    className={styles.email_wrapper}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>User Name:</label>
                  <Input
                    type="text"
                    name="userName"
                    className={styles.email_wrapper}
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>Email:</label>
                  <Input
                    type="email"
                    name="email"
                    className={styles.email_wrapper}

                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>Password:</label>
                  <Input
                    type="password"
                    name="password"
                    className={styles.email_wrapper}
                    value={formData.password}
                    onChange={handleChange}

                  />
                </div>
                <button type="submit">Register</button>
              </form>
            </div>
            <button className={styles.closemodal} onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>


      )
      }
    </>
  );
}



