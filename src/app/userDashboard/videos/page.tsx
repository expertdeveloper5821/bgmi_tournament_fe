'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import styles from '@/styles/Dashboard.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import CustomPagination from '@/Components/CommonComponent/Pagination/Pagination';
import Image from 'next/image';

const Page: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <div className={styles.main_container} id="mainLayoutContainerInner">
                {isLoading && <Loading />}
                <div className={styles.abcd}>
                    <div className={styles.sidebar_wrapper}>
                        <div className={styles.content}>
                            <div className={styles.dashboard_video}>
                                <div className={styles.video_section}>
                                    <span className={styles.head_desc}>Videos</span>
                                    <span className={styles.description}>Dashboard / Videos</span>
                                </div>
                                <div className={styles.sorting}>
                                    {/* <Image className={styles.sort_image} src='../assests/sorting.svg' alt='sorting' width={20} height={20} /> */}
                                    <select className={styles.select}>

                                        <option className={styles.sortByOption}> Sort By </option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select></div>
                            </div>
                            <div className={styles.main_video} style={{ width: "100%" }}>
                                <div className={styles.image_video}>
                                    <img src="../assests/image.svg" alt="videoimage" className={styles.video_image} style={{ width: "100%", objectFit: "none" }} />
                                    <div className={styles.col}>
                                        <h1 className={styles.head}>BGMI SQUAD MATCH</h1>
                                        <span className={styles.timeanddate}>Time: 02/08/2023 at 06:00 pm</span>
                                        <img src="../assests/copylink.svg" alt="videoimage" className={styles.copy_link} />

                                        <img src="../assests/arrow buttonnext.svg" alt="nextbutton" className={styles.nextbutton} />
                                        <img src="../assests/arrow buttonprevious.svg" alt="previousbutton" className={styles.previousbutton} />

                                        <div className={styles.card}>
                                            <div className={styles.card1}>
                                                <img src="../assests/cardimage1.svg" alt="cardImage" className={styles.cardImage} />
                                                <img src="../assests/cardImge2.svg" alt="cardImage" className={styles.cardImage} />
                                                <img src="../assests/cardimage1.svg" alt="cardImage" className={styles.cardImage} />
                                            </div>
                                            <div className={styles.card2}>
                                                <span>BGMI Squad Match</span>
                                                <span>BGMI Squad Match</span>
                                                <span>BGMI Squad Match</span>
                                            </div>
                                            <div className={styles.card3}>
                                                <span>Time: 02/08/2023 at 06:00 pm</span>
                                                <span>Time: 02/08/2023 at 06:00 pm</span>
                                                <span>Time: 02/08/2023 at 06:00 pm</span>
                                            </div>

                                        </div>

                                        <div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Page;
