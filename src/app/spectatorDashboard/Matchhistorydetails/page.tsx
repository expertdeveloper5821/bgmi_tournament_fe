'use client';
import React, { useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { useFormik, FormikHelpers } from 'formik';
import { TextArea, Select, Input, Button } from "technogetic-iron-smart-ui";
import Image from 'next/image';
import { validationSchema } from '@/utils/schema';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';

interface FormValues {
    title: string;
    videoLink: string;

}

const matchHistoryDetails = () => {
    const [thumbnailURL, setThumbnailURL] = useState<string>('');
    const [showThumbnail, setShowThumbnail] = useState<boolean>(false);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setThumbnailURL(imageURL);
            setShowThumbnail(true);
        }
    };

    const initialValues: FormValues = {
        title: '',
        videoLink: '',
    };

    const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik<FormValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }: FormikHelpers<FormValues>) => {
            try {
                // setIsLoading(true);
                // Log the values for debugging
                console.log('Form Values:', values);

                const response = await sendRequest('role/videolink/e3893e50-19e5-4458-a300-52252afcbf46', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    data: values,
                });
                if (response.status === 200) {
                    resetForm();
                    toast.success(response.data.message);
                } else {

                    setError('Failed to Add room. Please try again.');
                    toast.error('Failed to Add room. Please try again.');
                }
            } catch (error) {

                setError('Failed to Add room. Please try again.');
                toast.error('Failed to Add room. Please try again.');
                console.error('API Error:', error); // Log the API error for debugging
            }
        },
    });

    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.inner_main_container}>
                <div className={styles.sidebar_wrapper}>
                    <Navbar />
                    <div className={styles.inner_specter_cls}>
                        <h1 className={styles.r_main_title}>Your Videos</h1>
                    </div>
                    <div className={styles.main_div}>
                        <div className={styles.textArea}>
                            <span className={styles.textDetails}>Details</span>
                            <TextArea
                                name="title"
                                placeholder="Title (required)"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={styles.text_Area_context}
                            />
                            <span className={styles.typeofmatch}>Match Type</span>
                            <span className={styles.select_match_type}>Please select match type. It can help viewers discover your content faster.</span>
                            <Select
                                name="matchType"
                                // value={values.matchType}
                                onChange={handleChange}
                                placeholder="Select"
                                options={['orange', 'apple', 'mango']}
                                className={styles.select}
                            />
                            <span className={styles.Uploadthumbnail}>Upload Thumbnail</span>
                            <span className={styles.select_match_type}>Select and upload a picture that shows what's in your video. Your thumbnail stands out and grabs viewers' attention.</span>
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
                                <img src={thumbnailURL} className={styles.thumbnailPreview} width={160} height={120} />
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
                                    <div className={styles.copy_link_videos}>
                                        <Image src="/assests/copylink.svg" alt="uploadImg" width={20} height={20} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btn_form_wrapper}>
                                <Button className={styles.cancel}>Cancel</Button>
                                <Button className={styles.publish} type="button" onClick={handleSubmit}>Publish</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default matchHistoryDetails;






