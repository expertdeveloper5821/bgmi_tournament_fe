import React, {useState} from 'react';
import styles from '../../../styles/Spectator.module.scss';
import {Button, Input} from 'technogetic-iron-smart-ui';

const Form = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className={styles.main_form_btn}
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>
      {showModal ? (
        <div className={styles.main_pop_cls}>
          <div className={styles.check_model}>
            <div className="class_check">
              <h1 className={styles.pop_heading}>Add Room</h1>
            </div>
            <form className={styles.form_spectator_cls}>
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
                  //   value={formValues.roomId}
                  //   onChange={handleChange}
                />
              </div>

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
                  //   value={formValues.gameName}
                  //   onChange={handleChange}
                />
              </div>

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
                  //   value={formValues.gameType}
                  //   onChange={handleChange}
                />
              </div>

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
                  //   value={formValues.gameMapName}
                  //   onChange={handleChange}
                />
              </div>

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
                  //   value={formValues.password}
                  //   onChange={handleChange}
                />
              </div>

              <div className={styles.btn_form_wrapper}>
                <Button
                  id="check"
                  className={styles.roombutton}
                  variant="contained"
                  type="submit"
                />
                <Button
                  className={styles.cancel_btn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Form;
