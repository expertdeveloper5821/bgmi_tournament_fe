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
  updateRoleService,
} from '@/services/authServices';
import {
  FormDataType,
  ModalType,
  RoleType,
  SpectatorDataType,
  SpectatorEditDataType,
} from '@/types/spectatorTypes';
import { addFormValidations } from '@/utils/schema';
import { CreateSpectatorOrAssignRoleForm } from '@/Components/Forms/CreateSpectatorOrAssignRoleForm';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import { adminSpecColumns } from '@/utils/constant';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import { ROLES_DETAILS_TYPE } from '@/types/roomsTypes';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';

function Page() {
  const [spectatorData, setSpectatorData] = useState<SpectatorDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<ModalType>({ isOpen: false, buttonVal: '' });
  const [formErrors, setFormErrors] = useState<FormDataType>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [allspectatorData, setAllspectatorData] = useState<SpectatorDataType[] | []>([]);
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [roles, setRoles] = useState<RoleType[] | undefined>();
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [rolesDetails, setRolesDetails] = useState<[] | ROLES_DETAILS_TYPE[]>([]);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken') || '';
      const response = await getAllUsersDataService(token);
      const allspectatorData = response?.data?.data;
      setAllspectatorData(allspectatorData);
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
    } else if (modal?.buttonVal === 'Assign') {
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
    if (modal?.buttonVal === 'Create') {
      addFormValidations(name, value, setFormErrors);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (modal?.buttonVal === 'Assign') {
      if (roles) {
        roles.forEach((role) => {
          if (role?._id === value) {
            setFormData({ role: { _id: role?._id, role: role?.role, userUuid: role?.userUuid } });
          }
        });
      }
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

    const token: string = localStorage.getItem('jwtToken') || '';

    if (rolesDetails?.length) {
      try {
        if (modal?.buttonVal === 'Create') {
          await registerSpectatorService({
            token,
            formData,
            id: rolesDetails.find((role: ROLES_DETAILS_TYPE) => role.role === 'spectator')?._id,
          });
          toast.success('Spectator Created Successfully');
        } else if (modal?.buttonVal === 'Assign') {
          await updateRoleService({ token, formData });
        }
        getAllUsers();
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
    setModal({ isOpen: false, buttonVal: '' });
  };

  const handleEdit = (spectatorData: SpectatorEditDataType) => {
    setDisabled(true);
    if (spectatorData) {
      setModal({ isOpen: true, buttonVal: 'Assign' });
      setRoles([
        {
          role: 'spectator',
          _id: allspectatorData.find(
            (spec: SpectatorEditDataType) => spec?.role?.role === 'spectator',
          )?.role?._id,
          userUuid: spectatorData?.userUuid,
        },
        {
          role: 'admin',
          _id: allspectatorData.find((spec: SpectatorEditDataType) => spec?.role?.role === 'admin')
            ?.role?._id,
          userUuid: spectatorData?.userUuid,
        },
        {
          role: 'user',
          _id: allspectatorData.find((spec: SpectatorEditDataType) => spec?.role?.role === 'user')
            ?.role?._id,
          userUuid: spectatorData?.userUuid,
        },
      ]);

      setFormData({
        role: {
          _id: spectatorData?.role?._id || '',
          role: spectatorData?.role?.role || '',
          userUuid: spectatorData?.userUuid || '',
        },
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

  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container}>
        <div className={styles.sidebar_wrapper}>
          <Navbar />
          <div className={styles.popupbutton}>
            <h1 className={styles.heading}>Welcome to Admin Dashboard</h1>
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
          <div className={styles.breadcrumbs_container} style={{ margin: '10px 0px 10px 34px' }}>
            <Breadcrumb />
          </div>
          {isDeleteModalOpen && (
            <DeleteModal handleCloseModal={handleCloseModal} handleDeleteUser={deleteroom} />
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <TableData
              data={spectatorData}
              columns={adminSpecColumns}
              type={'SPECTATOR'}
              deleteroom={handleDeleteUser}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </div>

      {modal?.isOpen && (
        <div className={styles.modal}>
          <div
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
            roles={roles}
            isDisabled={isDisabled}
          />
        </div>
      )}
    </IsAuthenticatedHoc>
  );
}

export default Page;
