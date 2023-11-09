'use client';
import React, { useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { useFormik, FormikHelpers } from 'formik';
// import Dateandtime from "@/Components/CommonComponent/Dateandtime/Dateandtime"
import { Select, Input, Button } from "technogetic-iron-smart-ui";
import Image from 'next/image';
import { videoPostSchema } from '@/utils/schema';
import { useSearchParams } from 'next/navigation';
// import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import { videoService } from '@/services/authServices';
import { VideoFormValuesType } from '../../../Components/pageComponents/auth/authInterfaces';


const matchHistoryDetails = () => {
    const [thumbnailURL, setThumbnailURL] = useState<string>('');
    const [showThumbnail, setShowThumbnail] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const searchParams = useSearchParams();
    const uuid = searchParams.get('id') || '';

    console.log("error", error)
    console.log('UUID from:', uuid);

    console.log("date")


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setThumbnailURL(imageURL);
            setShowThumbnail(true);
        }
    };

    const initialValues: VideoFormValuesType = {
        title: '',
        videoLink: '',
        dateAndTime: ''
    };



    const { values, handleSubmit, handleChange, handleBlur, touched, errors } = useFormik<VideoFormValuesType>({

        initialValues,
        validationSchema: videoPostSchema,



        onSubmit: async (values, { resetForm }: FormikHelpers<VideoFormValuesType>) => {
            console.log('errors', errors);
            console.log("values", values)

            try {
                if (Object.keys(errors).length === 0) {
                    console.log('Form Values:', values);

                    console.log('Date:', date); // Log date value
                    console.log('Time:', time); // Log time value


                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('videoLink', values.videoLink);
                    formData.append('dateAndTime', `${date} ${time}`);

                    const response = await videoService(values, uuid);

                    if (response && response.status === 200) {
                        resetForm();
                        toast.success(response.data.message);
                    } else {
                        setError('Failed to Add room. Please try again.');
                        toast.error('Failed to Add room. Please try again.');
                    }
                } else {
                    toast.error('Please fix validation errors before submitting.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                setError('Failed to Add room. Please try again.');
                toast.error('Failed to Add room. Please try again.');
            }
        }
    });

    console.log('errors', errors);
    console.log("values", values)


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };




    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.main_container} id="mainLayoutContainerInner">
                <div className={styles.inner_main_container}>
                    <div className={styles.sidebar_wrapper}>
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
                                <span className={styles.typeofmatch}>Match Type</span>
                                <span className={styles.select_match_type}>Please select match type. It can help viewers discover your content faster.</span>
                                <Select
                                    placeholder="Select"
                                    className={styles.select}
                                    onChange={function noRefCheck() { }}
                                    option={[
                                        'Solo',
                                        'Squad',
                                        'Duo'
                                    ]}
                                    optionClassName={styles.downside}
                                />
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
                                    <div className={styles.imageshown} style={{ display: showThumbnail ? 'block' : 'none' }}>
                                        <img src={thumbnailURL} className={styles.thumbnailPreview} />
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
                                                    onChange={handleDateChange}
                                                    onBlur={handleBlur}
                                                    value={date}

                                                />
                                            </div>
                                            <div className={styles.input_box_calendar}>
                                                <Input
                                                    className={`${styles.room_field_calendar} ${styles.room_field_cls2}`}
                                                    type="time"
                                                    name="time"
                                                    placeholder="Enter time"
                                                    onChange={handleTimeChange}
                                                    onBlur={handleBlur}
                                                    value={time}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.btn_form_wrapper}>
                                    <Button className={styles.cancel} variant="contained" id="cancel">Cancel</Button>
                                    <Button className={styles.publish} type="submit" onClick={handleSubmit} variant="contained" id="publish">Publish</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default matchHistoryDetails;






