'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
//@ts-ignore
import { Input, Button } from 'technogetic-iron-smart-ui';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import TableData from '@/Components/CommonComponent/Table/Table';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface FormCreate {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

export default function Modal() {
  const [spectatorData, setSpectatorData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getSpectatorId, setSetSpectatorId] = useState<any>();
  const [modal, setModal] = useState({ isOpen: false, buttonVal: '' });
  const [formErrors, setFormErrors] = useState<FormCreate>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [allspectatorData, setAllspectatorData] = useState<any>();
  const [formData, setFormData] = useState<FormCreate | any>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [roles, setRoles] = useState<any>();
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const columns: string[] = ['Full Name', 'User Name', 'Email'];


  const getAllUsers = async () => {

    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const allUsersData: any = await sendRequest('/user/getalluser', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (allUsersData?.status === 200) {
        const allspectatorData = allUsersData?.data?.data;
        setAllspectatorData(allspectatorData);
        const filteredData = allspectatorData.filter((spectator: any) => {
          return spectator?.role?.role === 'spectator';
        });
        setSpectatorData(filteredData);
      }
      setIsLoading(false);
 
    } catch (error) {
      toast.error(error?.message);
      setIsLoading(false);
    } 
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if(modal?.buttonVal === 'Create'){
      if(formErrors?.fullName?.length || !formData?.fullName?.length || formErrors?.userName?.length ||!formData?.userName?.length || formErrors?.email?.length || !formData?.email?.length || formErrors?.password?.length || !formData?.password?.length){
        setDisabled(true);
      }else{
        setDisabled(false);
      }
    }else if(modal?.buttonVal === 'Assign'){
      if(formData?.role?.role !== "spectator"){
          setDisabled(false);
        }else{
          setDisabled(true);
        }
    }
  },[formErrors,formData]);

  
  const deleteroom = async (userUuid: any) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const response: any = await sendRequest(`/role/deleterole/${userUuid}`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLoading(false);
      getAllUsers();
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateSpectatorByid = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('jwtToken');
      const response: any = await sendRequest(`/role/updaterole/${getSpectatorId?.userUuid}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
      });
      getAllUsers();
      setSetSpectatorId(null);
    } catch (error) {
      console.error('Error deleting room', error);
    }
  };

  const addFormValidations = (name,value) => {
    if (name === 'fullName') {
      if(value?.length < 3){
        setFormErrors((prevError:any) => {
          return {
            ...prevError,
            fullName:'Username must be at least 3 characters long.'
          }
        })
      }else{
        setFormErrors((prevError:any) => {
          return {
            ...prevError,
            fullName:''
          }
        })
      }
    } else if(name === "userName"){
      const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        if(!usernameRegex.test(value)){
          setFormErrors((prevError:any) => {
            return {
              ...prevError,
              userName: 'Username must be at least 3 characters long and can only contain letters, numbers, and underscores.'
            }
          })
        }else{
          setFormErrors((prevError:any) => {
            return {
              ...prevError,
              userName: ''
            }
          })
        }
    }else if(name === "email"){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormErrors((prevError:any) => {
          return {
            ...prevError,
            email: 'Invalid email address. Please enter a valid email address.'
          }
        })
      } else {
        setFormErrors((prevError:any) => {
          return {
            ...prevError,
            email: ''
          }
        })
      }
    }else if(name === "password"){
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setFormErrors((prevError:any) => {
          return {
            ...prevError,
            password: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
          }
        })
      } else {
        setFormErrors((prevError:any) => {
          return {
            ...prevError,
            password: ''
          }
        })
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (modal?.buttonVal === 'Create') {
      addFormValidations(name,value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (modal?.buttonVal === 'Assign') {
      roles.forEach((role) => {
        if (role?._id === value) {
          setFormData({ role: { _id: role?._id, role: role?.role, userUuid: role?.userUuid } });
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({
      fullName: '',
      userName: '',
      email: '',
      password: '',
    });

    setFormData({
      fullName: '',
      userName: '',
      email: '',
      password: '',
    });

    const token: any = localStorage.getItem('jwtToken');
    
    if (spectatorData?.length) {
      try {
        let response;
        if (modal?.buttonVal === 'Create') {
          response = await sendRequest('/role/spectator/Register', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            data: { ...formData, role: spectatorData[0]?.role?._id },
          });
        } else if (modal?.buttonVal === 'Assign') {
          response = await sendRequest(`role/updaterole/${formData?.role?.userUuid}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            data: { role: formData?.role?._id },
          });
        }
        setIsLoading(false);

          getAllUsers();
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.message);
      }
    }
    setModal({ isOpen: false, buttonVal: '' });
    setSetSpectatorId(null);
  };

  const handleEdit = (studentData: any) => {
    setDisabled(true);
    if (studentData) {
      setModal({ isOpen: true, buttonVal: 'Assign' });
      setRoles([
        {
          role: 'spectator',
          _id: allspectatorData.find((spec: any) => spec?.role?.role === 'spectator')?.role?._id,
          userUuid: studentData?.userUuid,
        },
        {
          role: 'admin',
          _id: allspectatorData.find((spec: any) => spec?.role?.role === 'admin')?.role?._id,
          userUuid: studentData?.userUuid,
        },
        {
          role: 'user',
          _id: allspectatorData.find((spec: any) => spec?.role?.role === 'user')?.role?._id,
          userUuid: studentData?.userUuid,
        },
      ]);

      setFormData({
        role: {
          _id: studentData?.role?._id,
          role: studentData?.role?.role,
          userUuid: studentData?.userUuid,
        },
      });
    }
  };

  return (
    <>
      <div className={styles?.main_container} id="mainLayoutContainerInner">
        <div className={styles?.abcd}>
          <div className={styles?.sidebar_wrapper}>
            <Navbar />
            <div className={styles?.popupbutton}>
              <h1 className={styles?.head}>Welcome to Admin Dashboard</h1>
              <button
                onClick={() => {
                  setModal({ isOpen: true, buttonVal: 'Create' });
                  setDisabled(true);
                }}
                className={styles?.btnmodal}
              >
                Create Spectator
              </button>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <TableData
                studentData={spectatorData}
                columns={columns}
                showAdditionalButton={true}
                type={'SPECTATOR'}
                deleteroom={deleteroom}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>

      {modal?.isOpen && (
        <div className={styles?.modal}>
          <div
            onClick={() => {
              console.log('onClickHandler working');
              setModal({ isOpen: false, buttonVal: '' });
              setFormErrors({
                fullName: '',
                userName: '',
                email: '',
                password: '',
              });
              setFormData({
                fullName: '',
                userName: '',
                email: '',
                password: '',
              });
              setSetSpectatorId(null);
            }}
            className={styles?.overlay}
          ></div>

          <div className={styles?.modalcontent}>
            <div>
              <form onSubmit={handleSubmit} className={modal.buttonVal === 'Create' && styles?.create_spectator_form}>
                {modal.buttonVal === 'Create' && (
                  <>
                    <div className={styles?.text}>
                      <label className={styles?.name}>Full Name:</label>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Enter Fullname"
                        className={styles?.email_wrapper}
                        value={formData?.fullName}
                        onChange={handleChange}
                      />
                      {formErrors?.fullName && (
                        <div className={styles?.error_message}>{formErrors?.fullName}</div>
                      )}
                    </div>
                    <div className={styles?.text}>
                      <label className={styles?.name}>User Name:</label>
                      <Input
                        type="text"
                        name="userName"
                        placeholder="Enter Username"
                        className={styles?.email_wrapper}
                        value={formData?.userName}
                        onChange={handleChange}
                      />
                      {formErrors?.userName && (
                        <div className={styles?.error_message}>{formErrors?.userName}</div>
                      )}
                    </div>
                    <div className={styles?.text}>
                      <label className={styles?.name}>Email:</label>
                      <Input
                        type="email"
                        name="email"
                        className={styles?.email_wrapper}
                        placeholder="Enter Email"
                        value={formData?.email}
                        onChange={handleChange}
                      />
                      {formErrors?.email && (
                        <div className={styles?.error_message}>{formErrors?.email}</div>
                      )}
                    </div>
                    <div className={styles?.text}>
                      <label className={styles?.name}>Password:</label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className={styles?.email_wrapper}
                        value={formData?.password}
                        onChange={handleChange}
                      />
                      {formErrors?.password && (
                        <div className={styles?.error_message}>{formErrors?.password}</div>
                      )}
                    </div>
                  </>
                )}
                {modal.buttonVal === 'Assign' && (
                  <>
                    <label htmlFor="role" className={styles?.role_Label} >Choose Role:</label>
                    <select name="role" id="role" onChange={handleChange} className={styles?.role_select}>
                      {roles?.map((role) => <option value={role?._id}>{role?.role}</option>)}
                    </select>
                  </>
                )}
                <button type="submit" disabled={isDisabled} className={isDisabled ? styles?.disabled_register_button : styles?.register_button}>
                  {modal?.buttonVal}
                </button>
              </form>
            </div>
            <Button className={styles?.closemodal}>
              <Image
                className={styles?.close}
                src="../assests/cross.svg"
                alt="close"
                width={10}
                height={10}
                onClick={() => {
                  setModal({ isOpen: false, buttonVal: '' });
                  setFormErrors({
                    fullName: '',
                    userName: '',
                    email: '',
                    password: '',
                  });
                  setFormData({
                    fullName: '',
                    userName: '',
                    email: '',
                    password: '',
                  });
                  setSetSpectatorId(null);
                }}
              />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
