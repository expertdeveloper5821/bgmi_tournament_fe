'use client';
import React, {useState} from 'react';
import styles from '../../../styles/Spectator.module.scss';
//@ts-ignore
import {Button, Input} from 'technogetic-iron-smart-ui';
import {useFormik, FormikHelpers} from 'formik';
import {createspectater} from '@/schemas/SignupSchemas';
import sendRequest from '../../../services/api/apiServices';
interface FormCreate {
  roomId: string;
  gameName: string;
  gameType: string;
  mapType: string;
  password: string;
  version: string;
  time: any;
  date: any;
  lastServival: string;
  thirdWin: string;
  highestKill: string;
  secondWin: string;
}

const Form = ({getAllSpectator}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const initialValues: FormCreate = {
    roomId: '',
    gameName: '',
    gameType: '',
    mapType: '',
    password: '',
    version: '',
    time: '',
    date: '',
    lastServival: '',
    thirdWin: '',
    highestKill: '',
    secondWin: '',
  };
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: createspectater,
    onSubmit: async (
      values: FormCreate,
      {setSubmitting}: FormikHelpers<FormCreate>,
    ) => {
      setIsLoading(true);
      const {
        roomId,
        gameName,
        gameType,
        mapType,
        password,
        version,
        time,
        date,
        lastServival,
        thirdWin,
        highestKill,
        secondWin,
      } = values;

      try {
        const token = localStorage.getItem('jwtToken');

        const response = await sendRequest('room/rooms', {
          method: 'POST',
          headers: {Authorization: `Bearer ${token}`},
          data: {
            roomId,
            gameName,
            gameType,
            mapType,
            password,
            version,
            time,
            date,
            lastServival,
            thirdWin,
            highestKill,
            secondWin,
          },
        });
        getAllSpectator();

        if (response.status === 200) {
        } else {
          setError('Failed to Add room. Please try again.');
        }
      } catch (error: any) {
        setIsLoading(false);
        setError('Failed to Add room. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div>
      <button
        className={styles.main_form_btn}
        onClick={() => setShowModal(true)}
      >
        CREATE ROOM ID
      </button>
      {showModal ? (
        <div className={styles.main_pop_cls}>
          <div className={styles.check_model}>
            <div className="class_check">
              <h1 className={styles.pop_heading}>Create new room</h1>
            </div>
            <div className="check">
              <form
                onSubmit={handleSubmit}
                className={styles.form_spectator_cls}
              >
                {error && <div className={styles.error}>{error}</div>}
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
                {/* {errors.roomId && touched.roomId && (
                  <div className={styles.error}>{errors.roomId}</div>
                )} */}
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
                  <div className={styles.error}>{errors.gameName}</div>
                )}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="password">
                    Game Type (No of players)
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
                  <div className={styles.error}>{errors.gameType}</div>
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
                  <div className={styles.error}>{errors.mapType}</div>
                )}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="password">
                    Password
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
                  <div className={styles.error}>{errors.password}</div>
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
                  <div className={styles.error}>{errors.version}</div>
                )}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="password">
                    Time
                  </label>
                  <Input
                    id="time"
                    className={styles.room_field_wrapper}
                    type="time"
                    name="time"
                    placeholder="Enter time"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {/* {errors.time && touched.time && (
                  <div className={styles.error}>{errors.time}</div>
                )} */}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="password">
                    Date
                  </label>
                  <input
                    type="date"
                    className={styles.room_field_wrapper}
                    id="gameid"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {/* {errors.date && touched.date && (
                  <div className={styles.error}>{errors.date}</div>
                )} */}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="secondWin">
                    Last Servival
                  </label>
                  <Input
                    id="lastServival"
                    className={styles.room_field_wrapper}
                    type="text"
                    name="lastServival"
                    placeholder="Enter last Servival"
                    value={values.lastServival}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {/* {errors.password && touched.password && (
                  <div className={styles.error}>{errors.password}</div>
                )} */}
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
                {/* {errors.password && touched.password && (
                  <div className={styles.error}>{errors.password}</div>
                )} */}
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
                {/* {errors.password && touched.password && (
                  <div className={styles.error}>{errors.password}</div>
                )} */}
                <div className={styles.input_box}>
                  <label className={styles.room_id} htmlFor="secondWin">
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
                {/* {errors.password && touched.password && (
                  <div className={styles.error}>{errors.password}</div>
                )} */}
                <div className={styles.btn_form_wrapper}>
                  <Button
                    className={styles.cancel_btn}
                    onClick={() => setShowModal(false)}
                  >
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
                    {' '}
                    {isLoading ? 'Loading...' : 'Add Room'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Form;