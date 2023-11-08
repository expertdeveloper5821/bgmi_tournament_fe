import React from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { Input, Button } from 'technogetic-iron-smart-ui';
import Image from 'next/image';

export function CreateSpectatorOrAssignRoleForm({
  setModal,
  setFormErrors,
  setFormData,
  handleSubmit,
  modal,
  formData,
  handleChange,
  formErrors,
  roles,
  isDisabled,
}) {
  return (
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

      <div className={styles.modalcontent}>
        <div>
          <form
            onSubmit={handleSubmit}
            className={modal.buttonVal === 'Create' ? styles.create_spectator_form : ''}
          >
            {modal.buttonVal === 'Create' && (
              <>
                <div className={styles.text}>
                  <label className={styles.name}>Full Name:</label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Enter Fullname"
                    className={styles.email_wrapper}
                    value={formData?.fullName}
                    onChange={handleChange}
                  />
                  {formErrors?.fullName && (
                    <div className={styles.error_message}>{formErrors?.fullName}</div>
                  )}
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>User Name:</label>
                  <Input
                    type="text"
                    name="userName"
                    placeholder="Enter Username"
                    className={styles.email_wrapper}
                    value={formData?.userName}
                    onChange={handleChange}
                  />
                  {formErrors?.userName && (
                    <div className={styles.error_message}>{formErrors?.userName}</div>
                  )}
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>Email:</label>
                  <Input
                    type="email"
                    name="email"
                    className={styles.email_wrapper}
                    placeholder="Enter Email"
                    value={formData?.email}
                    onChange={handleChange}
                  />
                  {formErrors?.email && (
                    <div className={styles.error_message}>{formErrors?.email}</div>
                  )}
                </div>
                <div className={styles.text}>
                  <label className={styles.name}>Password:</label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className={styles.email_wrapper}
                    value={formData?.password}
                    onChange={handleChange}
                  />
                  {formErrors?.password && (
                    <div className={styles.error_message}>{formErrors?.password}</div>
                  )}
                </div>
              </>
            )}
            {modal.buttonVal === 'Assign' && (
              <>
                <label htmlFor="role" className={styles.role_Label}>
                  Choose Role:
                </label>
                <select
                  name="role"
                  id="role"
                  onChange={handleChange}
                  className={styles.role_select}
                >
                  {roles?.map((role) => <option value={role?._id}>{role?.role}</option>)}
                </select>
              </>
            )}
            <button
              type="submit"
              disabled={isDisabled}
              className={isDisabled ? styles.disabled_register_button : styles.register_button}
            >
              {modal?.buttonVal}
            </button>
          </form>
        </div>
        <Button className={styles.closemodal}>
          <Image
            className={styles.close}
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
            }}
          />
        </Button>
      </div>
    </div>
  );
}
