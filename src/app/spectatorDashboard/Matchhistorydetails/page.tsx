'use client';
import React, { useState } from 'react'
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { TextArea, Select, Input, Button, } from "technogetic-iron-smart-ui"
import Image from 'next/image';
// import { useState } from 'react';


const matchHistoryDetails = () => {
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [showThumbnail, setShowThumbnail] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setThumbnailURL(imageURL);
            setShowThumbnail(true);
        }
    };



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
                                onChange={function noRefCheck() { }}
                                placeholder="Title (required)"
                                className={styles.text_Area_context}
                            />
                            <span className={styles.typeofmatch}>Match Type</span>
                            <span className={styles.select_match_type}>Please select match type. It can help viewers discover your content faster.</span>

                            <Select
                                className={styles.select}
                                onChange={function noRefCheck() { }}
                                placeholder="Select"
                                option={[
                                    'orange',
                                    'apple',
                                    'mango'
                                ]}
                            />

                            <span className={styles.Uploadthumbnail}>Upload Thumbnail</span>
                            <span className={styles.select_match_type}>Select and upload a picture that shows what in your video. Your thumbnail stands out and grab viewers attention.</span>

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
                                        onChange={function noRefCheck() { }}
                                        placeholder="Type and paste Video URL"
                                        type="text"
                                        className={styles.video_url}
                                    />
                                    <div className={styles.copy_link_videos}>
                                        <Image src="/assests/copylink.svg" alt="uploadImg" width={20} height={20} /></div>
                                </div>
                            </div>

                            <div className={styles.btn_form_wrapper}>
                                <Button
                                    className={styles.cancel}
                                >
                                    Cancel
                                </Button>


                                <Button
                                    className={styles.publish}
                                    type="button"
                                >
                                    Publish
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default matchHistoryDetails;





