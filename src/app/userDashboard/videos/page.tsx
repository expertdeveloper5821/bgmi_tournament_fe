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
                                        <option>Status Timeline</option>
                                        <option>Match Type</option>
                                        <option>Date</option>
                                    </select></div>
                            </div>
                            <div className={styles.main_video} style={{ width: "100%" }}>
                                <div className={styles.image_video}>
                                    <img src="../assests/image.svg" alt="videoimage" className={styles.video_image} style={{ width: "100%", objectFit: "none" }} />


                                    <div className={styles.main_div}>
                                        <div className={styles.col}>
                                            <h1 className={styles.head}>BGMI SQUAD MATCH</h1>
                                            <div className={styles.flex}>
                                                <span>Time: 02/08/2023 at 06:00 pm</span>
                                                <img src="../assests/copylink.svg" alt="videoimage" className={styles.copy_link} />
                                            </div>
                                            <div className={styles.flex_end}>
                                                <img src="../assests/arrow buttonnext.svg" alt="nextbutton" className={styles.button} />
                                                <img src="../assests/arrow buttonprevious.svg" alt="previousbutton" className={styles.button} />
                                            </div>

                                        </div>

                                        <div className={styles.card}>
                                            <div className={styles.card1}>
                                                <img src="../assests/cardimage1.svg" alt="cardImage" className={styles.cardImage} />
                                                <div className={styles.flex_absolute}>
                                                    <img src="../assests/playicon.svg" alt="cardImage" className={styles.playicon} />
                                                    <span className={styles.time}>8:00</span>
                                                </div>
                                                <div className={styles.flex_justify}>
                                                    <span className={styles.match_name}>BGMI Squad Match</span>
                                                    <img src="../assests/copy.svg" alt="videoimage" className={styles.copy_link} /></div>
                                                <span className={styles.timedate}>Time: 02/08/2023 at 06:00 pm</span>
                                            </div>
                                            <div className={styles.card1}>
                                                <img src="../assests/cardImge2.svg" alt="cardImage" className={styles.cardImage} />
                                                <div className={styles.flex_absolute}>
                                                    <img src="../assests/playicon.svg" alt="cardImage" className={styles.playicon} />
                                                    <span className={styles.time}>8:00</span>
                                                </div>
                                                <div className={styles.flex_justify}>
                                                    <span className={styles.match_name}>BGMI Squad Match</span>
                                                    <img src="../assests/copy.svg" alt="videoimage" className={styles.copy_link} /></div>
                                                <span className={styles.timedate}>Time: 02/08/2023 at 06:00 pm</span>
                                            </div>
                                            <div className={styles.card1}>
                                                <img src="../assests/cardimage1.svg" alt="cardImage" className={styles.cardImage} />
                                                <div className={styles.flex_absolute}>
                                                    <img src="../assests/playicon.svg" alt="cardImage" className={styles.playicon} />
                                                    <span className={styles.time}>8:00</span>
                                                </div>
                                                <div className={styles.flex_justify}>
                                                    <span className={styles.match_name}>BGMI Squad Match</span>
                                                    <img src="../assests/copy.svg" alt="videoimage" className={styles.copy_link} /></div>
                                                <span className={styles.timedate}>Time: 02/08/2023 at 06:00 pm</span>
                                            </div>

                                            <div className={styles.card1}>
                                                <img src="../assests/card4.svg" alt="cardImage" className={styles.cardImage} />
                                                <div className={styles.flex_absolute}>
                                                    <img src="../assests/playicon.svg" alt="cardImage" className={styles.playicon} />
                                                    <span className={styles.time}>8:00</span>
                                                </div>
                                                <div className={styles.flex_justify}>
                                                    <span className={styles.match_name}>BGMI Squad Match</span>
                                                    <img src="../assests/copy.svg" alt="videoimage" className={styles.copy_link} /></div>
                                                <span className={styles.timedate}>Time: 02/08/2023 at 06:00 pm</span>
                                            </div>
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
