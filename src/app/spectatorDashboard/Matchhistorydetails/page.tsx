'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFormik, FormikHelpers } from 'formik';
import { videoPostSchema } from '@/utils/schema';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { VideoFormValuesType } from '../../../Components/pageComponents/auth/authInterfaces';
import { videoService, updateVideoService } from '@/services/authServices';
import { getAllVideo } from '@/services/authServices';
import { Navbar } from '@/Components/Navbar/Navbar';
import { Input, Button } from "technogetic-iron-smart-ui";


const matchHistoryDetails = () => {
    const [thumbnailURL, setThumbnailURL] = useState<string>('');
    const [showThumbnail, setShowThumbnail] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const uuid = searchParams.get('id') || '';
    const [updateVideoData, setUpdateVideoData] = useState<VideoFormValuesType | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setThumbnailURL(imageURL);
            setShowThumbnail(true);
            handleChange({
                target: {
                    name: 'mapImg',
                    value: file,
                },
            });
        }
    };

    const initialValues: VideoFormValuesType = {
        title: '',
        videoLink: '',
        dateAndTime: '',
        date: '',
        time: '',
        mapImg: '',
    };

    const { values, handleSubmit, handleChange, handleBlur, touched, errors, setValues } = useFormik<VideoFormValuesType>({

        initialValues,
        validationSchema: videoPostSchema,

        onSubmit: async (values, { resetForm }: FormikHelpers<VideoFormValuesType>) => {
            const dateTimeString = new Date(`${values.date} ${values.time}`);
            values.dateAndTime = dateTimeString;
            const form = new FormData();

            for (const key in values) {
                form.append(key, values[key]);
            }
            try {
                if (Object.keys(errors).length === 0) {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('videoLink', values.videoLink);

                    let response;
                    if (updateVideoData) {
                        response = await updateVideoService(values, uuid);
                    } else {
                        response = await videoService(values, uuid);
                    }

                    if (response && response.status === 200) {
                        resetForm();
                        setThumbnailURL('');
                        setShowThumbnail(false);
                        toast.success(response.data.message);
                        if (updateVideoData) {
                            router.push(`/spectatorDashboard/Video`);
                        }
                    } else {
                        toast.error('Failed to Add room. Please try again.');
                    }
                } else {
                    toast.error('Please fix validation errors before submitting.');
                }
            } catch (error) {
                toast.error('Failed to Add room. Please try again.');
            }
        }
    });

    const getAllVideos = async () => {
        const token = localStorage.getItem('jwtToken') || '';
        try {
            const response = await getAllVideo(token);
            const selectedVideo = response.find(video => video._id === uuid);

            if (selectedVideo) {
                setUpdateVideoData(selectedVideo);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getAllVideos();
    }, []);

    useEffect(() => {
        if (updateVideoData) {
            const dateAndTime = new Date(updateVideoData.dateAndTime);

            setValues({
                title: updateVideoData.title || '',
                videoLink: updateVideoData.videoLink || '',
                dateAndTime: updateVideoData.dateAndTime || '',
                date: dateAndTime.toISOString().split('T')[0] || '',
                time: `${String(dateAndTime.getHours()).padStart(2, '0')}:${String(dateAndTime.getMinutes()).padStart(2, '0')}`,
                mapImg: updateVideoData.mapImg || '',
            });
        }
    }, [updateVideoData]);

    const handleRemoveImage = () => {
        setShowThumbnail(false);
        setValues((prevValues) => ({
            ...prevValues,
            mapImg: '',
        }));
    };

    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.main_container} id="mainLayoutContainerInner">
                <div className={styles.inner_main_container}>
                    <div className={styles.sidebar_wrapper}>
                        <div className={styles.wrapper_background}>
                            <Navbar />
                            <div className={styles.inner_specter_cls}>
                                <h1 className={styles.r_main_title}>Your Videos</h1>
                            </div>
                            <form className={styles.main_div} onSubmit={handleSubmit}>

                                <div className={styles.textArea}>
                                    <div className={styles.title}>
                                        <span className={styles.textDetails}>Details</span>
                                        <Input
                                            label="Hello, world"
                                            type="text"
                                            name="title"
                                            placeholder="Title (required)"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={styles.text_Area_context}
                                        />
                                    </div>
                                    {errors.title && touched.title && <div className={styles.error}>{errors.title}</div>}
                                    <span className={styles.Uploadthumbnail}>Upload Thumbnail</span>
                                    <span className={styles.select_match_type}>Select and upload a picture that shows what's in your video. Your thumbnail stands out and grabs viewers' attention.</span>
                                    <div className={styles.upload_Images}>
                                        <div className={styles.upload}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="imageUpload"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="imageUpload" className={styles.uploadButton}>
                                                <Image src="/assests/upload.svg" alt="uploadImg" width={20} height={20} />
                                                Upload Thumbnail
                                            </label>
                                        </div>
                                        <div className={styles.imageshown} style={{ display: (showThumbnail || values.mapImg) ? 'block' : 'none' }}>
                                            <img src={thumbnailURL ? thumbnailURL : values.mapImg} className={styles.thumbnailPreview} />
                                            <span className={styles.cross} onClick={handleRemoveImage} >X</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.video_section}>
                                    <div className={styles.videos_copy}>
                                        <span className={styles.typeofmatch}>Video Link</span>
                                        <div className={styles.spc_btw}>
                                            <Input
                                                label="Hello, world"
                                                type="text"
                                                name="videoLink"
                                                placeholder="Type and paste Video URL"
                                                value={values.videoLink}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={styles.video_url}
                                            />
                                        </div>
                                        {errors.videoLink && touched.videoLink && <div className={styles.error}>{errors.videoLink}</div>}
                                        <div className={styles.datetime}>
                                            <span className={styles.Uploadthumbnail}>Select Date/Time</span>
                                            <span className={styles.select_match_type}>Select date and time for publish your video</span>
                                            <div className={styles.flex_gap}>
                                                <div className={styles.input_box_calendar}>
                                                    <Input
                                                        type="date"
                                                        className={`${styles.room_field_calendar} ${styles.room_field_cls2}`}
                                                        name="date"
                                                        value={values.date}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div className={styles.input_box_calendar}>
                                                    <Input
                                                        className={`${styles.room_field_calendar} ${styles.room_field_cls2}`}
                                                        type="time"
                                                        name="time"
                                                        placeholder="Enter time"
                                                        value={values.time}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.btn_form_wrapper}>
                                        <Button className={styles.cancel} variant="contained" id="cancel" onClick={() => router.back()}>Cancel</Button>
                                        {updateVideoData ? (
                                            <Button className={styles.publish} type="submit" onClick={handleSubmit} variant="contained" id="update">Update</Button>
                                        ) : (
                                            <Button className={styles.publish} type="submit" onClick={handleSubmit} variant="contained" id="publish">Publish</Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default matchHistoryDetails;






