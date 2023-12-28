'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss';
//@ts-ignore
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import Loader from '@/Components/CommonComponent/Loader/Loader';
import TableData from '@/Components/CommonComponent/Table/Table';
import { toast } from 'react-toastify';
import {
  deleteRoleService,
  getAllRoles,
  getAllUsersDataService,
  registerSpectatorService,
} from '@/services/authServices';
import {
  FormDataType,
  ModalType,
  SpectatorDataType,
  SpectatorEditDataType,
} from '@/types/spectatorTypes';
import { addFormValidations } from '@/utils/schema';
import { CreateSpectatorOrAssignRoleForm } from '@/Components/Forms/CreateSpectatorOrAssignRoleForm';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminSpecColumns } from '@/utils/constant';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';

const initialFormValues = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
};
import { ROLES_DETAILS_TYPE } from '@/types/roomsTypes';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';

function Page() {
  const [spectatorData, setSpectatorData] = useState<SpectatorDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<ModalType>({ isOpen: false, buttonVal: '' });
  const [formErrors, setFormErrors] = useState<FormDataType>(initialFormValues);
  const [allspectatorData, setAllspectatorData] = useState<SpectatorDataType[] | []>([]);
  const [formData, setFormData] = useState<FormDataType>(initialFormValues);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [rolesDetails, setRolesDetails] = useState<[] | ROLES_DETAILS_TYPE[]>([]);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await getAllUsersDataService(token);
      const allspectatorDataFetch = response?.data?.data;
      setAllspectatorData(allspectatorDataFetch);
      const filteredData = allspectatorData.filter((spectator: SpectatorDataType) => {
        return spectator?.role?.role === 'spectator';
      });
      setSpectatorData(filteredData);

      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRoles();
      if (response.status === 200) {
        setRolesDetails(response.data.data);
      } else {
        toast.error(response.response.data.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllUsers();
    getRoles();
  }, []);

  useEffect(() => {
    if (modal?.buttonVal === 'Create') {
      if (
        formErrors?.fullName?.length ||
        !formData?.fullName?.length ||
        formErrors?.userName?.length ||
        !formData?.userName?.length ||
        formErrors?.email?.length ||
        !formData?.email?.length ||
        formErrors?.password?.length ||
        !formData?.password?.length
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else if (modal?.buttonVal === 'Update') {
      if (formData?.role?.role !== 'spectator') {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [formErrors, formData]);

  const deleteroom = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await deleteRoleService({ userUuid: idToDelete, token });
      setIdToDelete('');
      setIsDeleteModalOpen(false);
      getAllUsers();
      toast.success(response?.data?.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    addFormValidations(name, value, setFormErrors);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors(initialFormValues);
    setFormData(initialFormValues);

    if (rolesDetails?.length) {
      try {
        const { buttonVal } = modal;
        await registerSpectatorService({ buttonVal, formData, spectatorData });
        toast.success('Spectator Created Successfully');
        setIsLoading(false);
        getAllUsers();
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }
    setModal({ isOpen: false, buttonVal: '' });
  };

  const handleEdit = (spectatorData: SpectatorEditDataType) => {
    setDisabled(true);
    if (spectatorData) {
      const { email, fullName, userName } = spectatorData;
      setModal({ isOpen: true, buttonVal: 'Update' });

      setFormData({
        fullName: fullName,
        userName: userName,
        email: email,
        password: '',
      });
    }
  };

  const handleDeleteUser = (_id: string) => {
    setIdToDelete(_id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIdToDelete('');
    setIsDeleteModalOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.popupbutton}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
              <div className={styles.admin_spectator_breadcrumbs_container}>
                <Breadcrumb />
              </div>
            </div>
            <button
              onClick={() => {
                setModal({ isOpen: true, buttonVal: 'Create' });
                setDisabled(true);
              }}
              className={`${styles.btnPrime} ${styles.btnmodal}`}
            >
              Create Spectator
            </button>
          </div>
          {/* <div className={styles.breadcrumbs_container} style={{ margin: '10px 0px 10px 34px' }}>
            <Breadcrumb />
          </div> */}
          {isDeleteModalOpen && (
            <DeleteModal handleCloseModal={handleCloseModal} handleDeleteUser={deleteroom} />
          )}

          <TableData
            data={spectatorData}
            columns={adminSpecColumns}
            type={'SPECTATOR'}
            deleteroom={handleDeleteUser}
            handleEdit={handleEdit}
          />
        </div>
      </div>

      {modal?.isOpen && (
        <div className={styles.modal}>
          <div
            onClick={() => {
              setModal({ isOpen: false, buttonVal: '' });
              setFormErrors(initialFormValues);
              setFormData(initialFormValues);
            }}
            className={styles.overlay}
          ></div>
          <CreateSpectatorOrAssignRoleForm
            setModal={setModal}
            setFormErrors={setFormErrors}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            modal={modal}
            formData={formData}
            handleChange={handleChange}
            formErrors={formErrors}
            isDisabled={isDisabled}
          />
        </div>
      )}
    </IsAuthenticatedHoc>
  );
}

export default Page;
