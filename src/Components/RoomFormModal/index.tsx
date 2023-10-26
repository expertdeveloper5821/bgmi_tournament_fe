'use client';
import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';

import { validationSchema } from '@/utils/schema';
import { sendRequest } from '@/utils/axiosInstanse';
import styles from '@/styles/Spectator.module.scss';

interface FormCreate {
  dateAndTime: string | Date;
  roomId: string;
  gameName: string;
  gameType: string;
  mapType: string;
  password: string;
  version: string;
  date: string;
  time: string;
  lastSurvival: string;
  thirdWin: string;
  highestKill: string;
  secondWin: string;
  entryFee: string;
  mapImg: string | null;
}

const RoomFormModal = ({ getAllSpectator }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const initialValues: FormCreate = {
    roomId: '',
    gameName: '',
    gameType: '',
    mapType: '',
    password: '',
    version: '',
    date: '',
    time: '',
    lastSurvival: '',
    thirdWin: '',
    highestKill: '',
    secondWin: '',
    mapImg: '',
    entryFee: '',
    dateAndTime: '',
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik<FormCreate>(
    {
      initialValues,
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        const dateTimeString = new Date(`${values.date} ${values.time}`);
        values.dateAndTime = dateTimeString;

        const form = new FormData();
        form.append('mapImg', image);
        for (const key in values) {
          form.append(key, values[key]);
        }
        try {
          setIsLoading(true);
          const response = await sendRequest('room/rooms', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: form,
          });
          if (response.status === 200) {
            resetForm();
            setIsLoading(false);
            getAllSpectator();
            toast.success(response.data.message);
            setShowModal(false);
          } else {
            setIsLoading(false);
            setError('Failed to Add room. Please try again.');
            toast.error('Failed to Add room. Please try again.');
          }
        } catch (error) {
          setIsLoading(false);
          setError('Failed to Add room. Please try again.');
          toast.error('Failed to Add room. Please try again.');
        }
      },
    },
  );

  return (
    <>
      <div>
        <button className={styles.main_form_btn} onClick={() => setShowModal(true)}>
          CREATE ROOM ID
        </button>
        {showModal ? (
          <div className={styles.main_pop_cls}>
            <div className={styles.check_model}>
              <div className={styles.class_check}>
                <h1 className={styles.pop_heading}>Create new room</h1>
              </div>
              <div className={styles.main_form}>
                <div className={styles.check}>
                  <form onSubmit={handleSubmit} className={styles.form_spectator_cls}>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.flex_col}>
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="room_id">
                          Room ID
                        </label>
                        <Input
                          id="roomId"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="roomId"
                          placeholder="Enter Room ID from BGMI"
                          value={values.roomId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.roomId && touched.roomId && (
                        <div className={styles.error}>{String(errors?.roomId)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="password">
                          Game Name
                        </label>
                        <Input
                          id="gameName"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="gameName"
                          placeholder="Enter Game Name BGMI"
                          value={values.gameName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.gameName && touched.gameName && (
                        <div className={styles.error}>{String(errors.gameName)}</div>
                      )}

                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="password">
                          Game Map Name
                        </label>
                        <Input
                          id="mapType"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="mapType"
                          placeholder="Enter bgmi map"
                          value={values.mapType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.mapType && touched.mapType && (
                        <div className={styles.error}>{String(errors.mapType)}</div>
                      )}

                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="password">
                          Time
                        </label>
                        <Input
                          id="time"
                          className={`${styles.room_field_wrapper} ${styles.room_field_cls2}`}
                          type="time"
                          name="time"
                          placeholder="Enter time"
                          value={values?.time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.time && touched.time && (
                        <div className={styles.error}>{String(errors.time)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="secondWin">
                          Last Survival
                        </label>
                        <Input
                          id="lastSurvival"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="lastSurvival"
                          placeholder="Enter last Servival"
                          value={values.lastSurvival}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.lastSurvival && touched.lastSurvival && (
                        <div className={styles.error}>{String(errors.lastSurvival)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="secondWin">
                          Second Win
                        </label>
                        <Input
                          id="secondWin"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="secondWin"
                          placeholder="Enter second Win"
                          value={values.secondWin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.secondWin && touched.secondWin && (
                        <div className={styles.error}>{String(errors.secondWin)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="entryFee">
                          Entry Fee
                        </label>
                        <Input
                          id="entryFee"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="entryFee"
                          placeholder="Enter Entry Fee"
                          value={values.entryFee}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.entryFee && touched.entryFee && (
                        <div className={styles.error}>{String(errors.entryFee)}</div>
                      )}
                    </div>

                    <div className={styles.flex_col}>
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="password">
                          Room Password
                        </label>
                        <Input
                          id="password"
                          className={styles.room_field_wrapper}
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.password && touched.password && (
                        <div className={styles.error}>{String(errors.password)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="password">
                          No. Of Players (Game Type)
                        </label>
                        <Input
                          id="gameType"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="gameType"
                          placeholder="Enter no of players"
                          value={values.gameType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.gameType && touched.gameType && (
                        <div className={styles.error}>{String(errors.gameType)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="password">
                          Version
                        </label>
                        <Input
                          id="version"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="version"
                          placeholder="Enter version"
                          value={values.version}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>

                      {errors.version && touched.version && (
                        <div className={styles.error}>{String(errors.version)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="Date">
                          Date
                        </label>
                        <Input
                          type="date"
                          className={`${styles.room_field_wrapper} ${styles.room_field_cls2}`}
                          id="gameid"
                          name="date"
                          value={values.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.date && touched.date && (
                        <div className={styles.error}>{String(errors.date)}</div>
                      )}

                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="highestKill">
                          Highest Kill
                        </label>
                        <Input
                          id="highestKill"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="highestKill"
                          placeholder="Enter highest Kill"
                          value={values.highestKill}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.highestKill && touched.highestKill && (
                        <div className={styles.error}>{String(errors.highestKill)}</div>
                      )}

                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="thirdWin">
                          Third Win
                        </label>
                        <Input
                          id="thirdWin"
                          className={styles.room_field_wrapper}
                          type="text"
                          name="thirdWin"
                          placeholder="Enter third Win"
                          value={values.thirdWin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.thirdWin && touched.thirdWin && (
                        <div className={styles.error}>{String(errors.thirdWin)}</div>
                      )}

                      <div className={styles.input_box}>
                        <label className={styles.room_id} htmlFor="secondWin">
                          Image Upload
                        </label>
                        <Input
                          id="file"
                          className={styles.room_field_wrapper}
                          type="file"
                          name="mapImg"
                          accept="image/*"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setImage(e.target.files[0]);
                            }
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </form>

                  <div className={styles.btn_form_wrapper}>
                    <Button className={styles.cancel_btn} onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                    <Button
                      id="check"
                      disabled={isLoading}
                      className={styles.roombutton}
                      variant="contained"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {isLoading ? 'Loading...' : 'Add Room'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default RoomFormModal;
