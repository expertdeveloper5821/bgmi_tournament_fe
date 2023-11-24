'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/Spectator.module.scss';
//@ts-ignore
import { Button, Input } from 'technogetic-iron-smart-ui';
import { useFormik } from 'formik';
import { validationSchema } from '@/utils/schema';
import { sendRequest } from '@/utils/axiosInstanse';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { CreateRoomFormType } from '@/types/roomsTypes';
import { initialValueCreateRoom } from '@/utils/constant';

const CreateRoomForm = (props) => {
  const { showModal, setShowModal, roomIdToUpdate, setRoomIdToUpdate, getAllRooms } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [thirdImage, setThirdImage] = useState<File | null>(null);

  const { values, touched, errors, handleSubmit, handleBlur, setValues, setFieldValue } =
    useFormik<CreateRoomFormType>({
      initialValues: initialValueCreateRoom,
      validationSchema,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit: async (values, { resetForm }) => {
        const dateTimeString = new Date(`${values.date} ${values.time}`);
        const roomId = roomIdToUpdate ? roomIdToUpdate._id : '';
        try {
          setIsLoading(true);
          const response = await sendRequest(`room/rooms/${roomId}`, {
            method: roomIdToUpdate ? 'PUT' : 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: '',
            },
            data: { ...values, dateAndTime: dateTimeString, mapImg: thirdImage },
          });
          if (response.status === 200) {
            resetForm();
            setImages([]);
            setValues(initialValueCreateRoom);
            getAllRooms();
            setIsLoading(false);
            toast.success(response.data.message);
            setShowModal(false);
          } else {
            setIsLoading(false);
            setRoomIdToUpdate('');
            setError('Failed to Add room. Please try again.');
            toast.error('Failed to Add room. Please try again.');
          }
        } catch (error) {
          setIsLoading(false);
          setRoomIdToUpdate('');
          setError('Failed to Add room. Please try again.');
          toast.error('Failed to Add room. Please try again.');
        }
      },
    });

  useEffect(() => {
    if (roomIdToUpdate) {
      const dateAndTimeParts = roomIdToUpdate.dateAndTime?.split('T');
      const dateValue = dateAndTimeParts ? dateAndTimeParts[0] : '';
      const timeValue = dateAndTimeParts ? dateAndTimeParts[1] : '';
      const [hours, minutes] = timeValue.split(':');
      const formattedTime = `${hours}:${minutes}:${timeValue}.000Z`;
      const formattedTimeWithoutSeconds = formattedTime.split(':').slice(0, 2).join(':');

      setValues({
        roomId: roomIdToUpdate.roomId,
        gameName: roomIdToUpdate.gameName,
        gameType: roomIdToUpdate.gameType,
        mapType: roomIdToUpdate.mapType,
        password: roomIdToUpdate.password,
        version: roomIdToUpdate.version,
        lastSurvival: roomIdToUpdate.lastSurvival,
        thirdWin: roomIdToUpdate.thirdWin,
        highestKill: roomIdToUpdate.highestKill,
        secondWin: roomIdToUpdate.secondWin,
        mapImg: roomIdToUpdate.mapImg,
        entryFee: roomIdToUpdate.entryFee,
        time: formattedTimeWithoutSeconds,
        date: dateValue,
      });
    }
  }, [roomIdToUpdate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        const newImage = {
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
        };
        setImages((prevImages) => [...prevImages, newImage]);
        setFieldValue('mapImg', newImage.url);
      }
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (files.length === 0) {
        return;
      }
      setThirdImage(files[0]);
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split('/')[0] !== 'image') continue;
        if (!images.some((e) => e.name === files[i].name)) {
          const newImage = {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          };
          setImages((prevImages) => [...prevImages, newImage]);
          setFieldValue('mapImg', newImage.url);
        }
      }
    }
  };

  const selectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (newImages.length === 0) {
      setFieldValue('mapImg', null);
    }
  };

  return (
    <>
      <div>
        <button
          className={styles.main_form_btn}
          onClick={() => {
            setShowModal(true);
            setRoomIdToUpdate('');
          }}
        >
          CREATE ROOM ID
        </button>
        {showModal ? (
          <div className={styles.main_pop_cls}>
            <div className={styles.check_model}>
              <div className={styles.class_check}>
                <h1 className={styles.pop_heading}>
                  {roomIdToUpdate ? 'Update Room' : 'Create new room'}
                </h1>
              </div>
              <div className={styles.main_form}>
                <div className={styles.check}>
                  <form onSubmit={handleSubmit} className={styles.form_spectator_cls}>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.flex_col}>
                      <div className={styles.input_box}>
                        <label className={styles.labelStyle}>Room ID</label>
                        <Input
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
                        <label className={styles.labelStyle}>Game Name</label>
                        <Input
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
                        <label className={styles.labelStyle}>Game Map Name</label>
                        <Input
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
                        <label className={styles.labelStyle}>Time</label>
                        <Input
                          className={`${styles.room_field_wrapper} ${styles.room_field_cls2}`}
                          type="time"
                          name="time"
                          placeholder="Enter time"
                          value={values.time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.time && touched.time && (
                        <div className={styles.error}>{String(errors.time)}</div>
                      )}
                      <div className={styles.input_box}>
                        <label className={styles.labelStyle}>Last Survival</label>
                        <Input
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
                        <label className={styles.labelStyle}>Second Win</label>
                        <Input
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
                        <label className={styles.labelStyle}>Entry Fee</label>
                        <Input
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
                        <label className={styles.labelStyle}>Room Password</label>
                        <Input
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
                        <label className={styles.labelStyle}>No. Of Players (Game Type)</label>
                        <Input
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
                        <label className={styles.labelStyle}>Version</label>
                        <Input
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
                        <label className={styles.labelStyle}>Date</label>
                        <Input
                          type="date"
                          className={`${styles.room_field_wrapper} ${styles.room_field_cls2}`}
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
                        <label className={styles.labelStyle}>Highest Kill</label>
                        <Input
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
                        <label className={styles.labelStyle}>Third Win</label>
                        <Input
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
                        <div className={styles.card}>
                          <div className={styles.top}>
                            <p>Drag & Drop Image Uploading</p>
                          </div>
                          <div className={styles.drag_area} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                            {isDragging ? (
                              <span className={styles.select}>Drop Image here</span>
                            ) : (
                              <>
                                <div className={styles.drag_drop}> Drag and Drop image here or ,</div>
                                <span className={styles.select} role='button' onClick={selectFiles}>Browse</span>
                              </>
                            )}

                            <input name='file' type='file' className={styles.file} multiple ref={fileInputRef} onChange={onFileSelect}></input>
                          </div>
                          <div className={styles.container}>
                            {images.map((image, i) => (
                              <div className={styles.image} key={i}>
                                <span className={styles.delete} onClick={() => deleteImage(i)}>
                                  &times;
                                </span>
                                <img
                                  width={280}
                                  height={150}
                                  src={image.url}
                                  alt={image.name}
                                ></img>
                              </div>
                            ))}
                            {roomIdToUpdate && (
                              <img
                                src={roomIdToUpdate.mapImg}
                                alt="Map Image"
                                width={280}
                                height={150}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className={styles.btn_form_wrapper}>
                    <Button
                      className={styles.cancel_btn}
                      onClick={() => {
                        setValues(initialValueCreateRoom);
                        setShowModal(false);
                        setRoomIdToUpdate('');
                      }}
                    >
                      Cancel
                    </Button>

                    {roomIdToUpdate ? (
                      <Button
                        id="update"
                        disabled={isLoading}
                        className={styles.roombutton}
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {isLoading ? 'Updating...' : 'Update Room'}
                      </Button>
                    ) : (
                      <Button
                        id="add"
                        disabled={isLoading}
                        className={styles.roombutton}
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {isLoading ? 'Loading...' : 'Add Room'}
                      </Button>
                    )}
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

export default CreateRoomForm;
