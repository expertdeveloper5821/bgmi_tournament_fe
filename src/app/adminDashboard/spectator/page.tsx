
'use client';
import React, { useState, useEffect } from "react";
import styles from "../../../styles/Dashboard.module.scss";
import sendRequest from "@/services/auth/auth_All_Api";
//@ts-ignore
import { Input, Button } from 'technogetic-iron-smart-ui';
import { Navbar } from '../../../Components/Navbar/Navbar';
import Loader from "@/Components/Loader/Loader";
import TableData, { SpectatorData } from '../../../Components/Table/Table';
import Image from "next/image";

interface FormCreate {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: any;
}

export default function Modal() {
  const [spectatorData, setSpectatorData] = useState<SpectatorData[]>([]);
  console.log("spectatorData", spectatorData)
  const [isLoading, setIsLoading] = useState(true);
  const [isupdateData, setIsUpdateData] = useState<any>(null)
  const imageIcon: string = 'spectator';
  const [getSpectatorId, setSetSpectatorId] = useState<any>()
  console.log("getSpectatorId______________", getSpectatorId)

  // console.log('getData', isupdateData)
  const [modal, setModal] = useState(false);
  const [formErrors, setFormErrors] = useState<FormCreate>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    role: '64d7239c8a677a5d2e21b00d'
  });

  const getAllUsers = async () => {
    try {
      const tokens = localStorage.getItem('jwtToken');
      const allUsersData: any = await sendRequest('/user/getalluser', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokens}` }
      });

      const allspectatorData = allUsersData?.data?.data;
      const filteredData = allspectatorData.filter((spectator: any) => {
        return spectator.role.role === 'spectator';
      });

      setSpectatorData(filteredData);
      // console.log('sortedData____________>', allUsersData);
      setIsLoading(false);
    } catch (error) {
      // console.error('Error fetching spectator data:', error);
      setIsLoading(false);
    }
  };


  const deleteroomId = async (userUuid: any) => {
    // console.log("id__________", userUuid)
    try {
      const tokens = localStorage.getItem('jwtToken');
      console.log(tokens)
      const response: any = await sendRequest(`/role/deleterole/${userUuid}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${tokens}` }
      });
      //const updatedData = spectatorData.filter(data => data. !== _id);
      getAllUsers();
      setSpectatorData(spectatorData);
    } catch (error) {
      console.error('Error deleting room:', error);

    }
  };

  console.log("getSpectatorId", getSpectatorId)

  const toggleModal = (userid: string) => {
    setModal(!modal);

    if (!modal) {
      document.body.classList.add('activemodal');
    } else {
      document.body.classList.remove('activemodal');
    }

    setSetSpectatorId(userid || null);
    setFormData(initialFormData); // Reset form data when modal is opened
  };

  const updateSpectatorByid = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response: any = await sendRequest(`/role/updaterole/${getSpectatorId.userUuid}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      getAllUsers();
      //console.log("responseupdate____________________", response)
      // alert(JSON.stringify(response))
      setSetSpectatorId(null);
    } catch (error) {
      console.error('Error deleting room', error);
    }

  }
  // console.log("updateSpectatorByid______________________", updateSpectatorByid)



  useEffect(() => {
    getAllUsers();
  }, []);

  const columns: string[] = [
    'fullName',
    'userName',
    'email',
    // 'password',

  ];


  const initialFormData: FormCreate = {
    fullName: getSpectatorId != null ? getSpectatorId?.fullName : '',
    userName: getSpectatorId != null ? getSpectatorId?.userName : '',
    email: getSpectatorId?.email || '',
    password: getSpectatorId?.password || '',
    role: '64d7239c8a677a5d2e21b00d'
  };




  const [formData, setFormData] = useState<FormCreate>(initialFormData);

  // useEffect(() => {
  //   if (getSpectatorId) {
  //     const spectatorToUpdate = spectatorData.find(spectator => spectator.userUuid === getSpectatorId);
  //     if (spectatorToUpdate) {
  //       setFormData(spectatorToUpdate);
  //     }
  //   }
  // }, [getSpectatorId]);
  useEffect(() => {
    if (getSpectatorId) {
      setFormData(initialFormData)
    }
    if (!getSpectatorId) {
      const initialFormData: FormCreate = {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        role: '64d7239c8a677a5d2e21b00d'
      };
      setFormData(initialFormData)
    }
  }, [getSpectatorId])

  console.log("FormData", formData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.userName || !formData.email || !formData.password) {
      setFormErrors({
        fullName: formData.fullName ? '' : 'Please Enter your FullName',
        userName: formData.userName ? '' : 'Please Enter your User Name ',
        email: formData.email ? '' : 'Please Enter your Email ',
        password: formData.password ? '' : ' Please Enter your Password ',
        role: ''
      });
      return;
    }

    setFormErrors({
      fullName: '',
      userName: '',
      email: '',
      password: '',
      role: '64d7239c8a677a5d2e21b00d'
    });

    const token: any = localStorage.getItem('jwtToken');
    setFormData({ ...initialFormData, role: '64d5d42ee428f9561c3a125f' });
    try {
      const response = await sendRequest("/role/spectator/Register", {
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
    setModal(false)
    setSetSpectatorId(null)
    // toggleModal(''); // Close the modal after submission
    // getAllUsers()
  };
  console.log(getSpectatorId)
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.popupbutton}>
              <button onClick={() => { setModal(true) }

              } className={styles.btnmodal}>Sign up</button>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <TableData
                imageIcon={imageIcon}
                setSetSpectatorId={setSetSpectatorId}
                updateSpectatorByid={updateSpectatorByid}
                deleteroomId={deleteroomId}
                spectatorData={spectatorData}
                columns={columns}
                setModal={setModal}
                showAdditionalButton={true}
                userData={[]}
                teamData={[]}
                roomData={[]}
              />
            )}
          </div>
        </div>
      </div>

      {modal && (
        <div className={styles.modal}>
          <div onClick={() => { setModal(false); setSetSpectatorId(null) }} className={styles.overlay}></div>
          <div className={styles.modalcontent}>
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.text}>
                  <label className={styles.name}>Full Name:</label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Enter Fullname"
                    className={styles.email_wrapper}
                    value={formData.fullName}
                    //  (e:any)=>{{ e?.target.fullname}}
                    onChange={handleChange}
                  />
                  {formErrors.fullName && <div className={styles.error}>{formErrors.fullName}</div>}
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>User Name:</label>
                  <Input
                    type="text"
                    name="userName"
                    placeholder="Enter Username"
                    className={styles.email_wrapper}
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  {formErrors.userName && <div className={styles.error}>{formErrors.userName}</div>}

                </div>
                <div className={styles.text}>
                  <label className={styles.name}>Email:</label>
                  <Input
                    type="email"
                    name="email"
                    className={styles.email_wrapper}
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && <div className={styles.error}>{formErrors.email}</div>}
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>Password:</label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className={styles.email_wrapper}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && <div className={styles.error}>{formErrors.password}</div>}
                </div>

                {getSpectatorId ? (
                  <button onClick={updateSpectatorByid} className={styles.update_button}>Update</button>
                ) : (
                  <button type="submit" className={styles.register_button}>Register</button>
                )}

                {/* <button type="submit" className={styles.register_button}>Register</button>
                <button type="submit" className={styles.update_button}>Update</button> */}
              </form>
            </div>
            <Button className={styles.closemodal}>
              <Image
                className={styles.close}
                src="../assests/cross.svg"
                alt="close"
                width={10}
                height={10}
                onClick={() => { setModal(false); setSetSpectatorId(null) }}
              />
            </Button>
          </div>
        </div>
      )}

    </>
  );
}




