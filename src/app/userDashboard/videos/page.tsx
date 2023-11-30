'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import styles from '@/styles/Dashboard.module.scss';
import { Select } from "technogetic-iron-smart-ui"
import { sendRequest } from '@/utils/axiosInstanse';
import { BiSolidChevronLeft, BiChevronRight } from 'react-icons/bi';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
interface VideoInfo {
    _id: string;
    title: string;
    dateAndTime: string;
    videoLink: string;
}
function formatDateTime(dateTime: string) {
    const dateObj = new Date(dateTime);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';

    return `Time: ${month}/${day}/${year} at ${hours % 12}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
}

const Page: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<VideoInfo[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const maxCards = isMobile ? 2 : 4;
    const [currentCardIndex, setCurrentCardIndex] = useState(0);


    const goToPreviousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
    };

    const goToNextCard = () => {
        if (currentCardIndex < data.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const accessToken = localStorage.getItem('jwttoken');
                const response = await sendRequest('/role/allvideolink', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const responseData = response?.data?.data as VideoInfo[];
                setData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768);
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const visibleCards = data.slice(currentCardIndex, currentCardIndex + maxCards);

    return (
        <>
            <IsAuthenticatedHoc>
                <div className={styles.main_container} id="mainLayoutContainerInner">
                    {isLoading && <Loading />}
                    <div className={styles.abcd}>
                        <div className={styles.sidebar_wrapper}>
                            <div className={styles.content}>
                                <div className={styles.dashboard_video}>
                                    <div className={styles.video_section}>
                                        <span className={styles.head_desc}>Videos</span>
                                    </div>
                                    <div className={styles.sorting}>
                                        <Select className={styles.demo}
                                            onChange={function noRefCheck() { }}
                                            option={[
                                                'Status Timeline',
                                                'Match Type',
                                                'Date'
                                            ]}

                                            placeholder="Sort by"
                                            optionClassName={styles.popdown}
                                        />
                                    </div>
                                </div>
                                <div className={styles.main_video} style={{ width: "100%" }}>
                                    <div className={styles.image_video}>
                                        <img src="../assests/image.svg" alt="videoimage" className={styles.video_image} style={{ width: "100%", objectFit: "none" }} />

                                        <div className={styles.main_uservideo}>
                                            <div className={styles.col}>
                                                <h1 className={styles.head}>{data[currentCardIndex]?.title}</h1>
                                                <div className={styles.flex}>
                                                    <span> {formatDateTime(data[currentCardIndex]?.dateAndTime)}</span>
                                                    <img src="../assests/copylink.svg" alt="videoimage" className={styles.copy_link} />
                                                </div>

                                                <div className={styles.flex_end}>
                                                    <button
                                                        onClick={goToPreviousCard}
                                                        className={styles.previous_button}
                                                        disabled={currentCardIndex === 0}
                                                    >
                                                        <BiSolidChevronLeft />
                                                    </button>

                                                    <button
                                                        onClick={goToNextCard}
                                                        className={styles.previous_button}
                                                        disabled={isMobile ? currentCardIndex >= data.length - maxCards : currentCardIndex === data.length - 1}
                                                    >
                                                        <BiChevronRight />
                                                    </button>
                                                </div>
                                            </div>


                                            <div className={styles.card}>
                                                {visibleCards.map((item, index) => (
                                                    <>
                                                        <div key={item._id} className={`${styles.card1} ${isMobile && index !== 0 ? styles.hideOnMobile : ''}`}>
                                                            <img src="../assests/cardimage1.svg" alt="cardImage" className={styles.cardImage} />
                                                            {/* <div className={styles.flex_absolute}>
                                                                <img src="../assests/postvideo.svg" alt="cardImage" className={styles.playicon} />
                                                                <span className={styles.time}>8:00</span>
                                                            </div> */}
                                                            <div className={styles.flex_justify}>
                                                                <span className={styles.match_name}>{item.title}</span>
                                                                <a href={item.videoLink} target="_blank" rel="noopener noreferrer">
                                                                    <img src="../assests/copy.svg" alt="videoimage" className={styles.copy_link} /> </a></div>
                                                            <span className={styles.timedate}>{formatDateTime(item.dateAndTime)}</span>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div >
            </IsAuthenticatedHoc>
        </>
    );
};

export default Page;

