'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import styles from '@/styles/Dashboard.module.scss';
import { Select, Popover } from "technogetic-iron-smart-ui"
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import CustomPagination from '@/Components/CommonComponent/Pagination/Pagination';
import { sendRequest } from '@/utils/axiosInstanse';
import { BiSolidChevronLeft, BiChevronRight } from 'react-icons/bi';
import Image from 'next/image';

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

interface CustomPaginationProps {
    onDataUpdate: (data: any) => void;
}

const Page: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<VideoInfo[]>([]);
    console.log("data---->", data)
    const isMobile = window.innerWidth <= 768; // Define your own mobile breakpoint
    const maxCards = isMobile ? 2 : 4;
    // const maxCards = 4;
    const [currentCardIndex, setCurrentCardIndex] = useState(0);


    // Function to go to the previous card
    const goToPreviousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            console.log('Previous button clicked');
        }
    };

    // Function to go to the next card
    const goToNextCard = () => {
        if (currentCardIndex < data.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            console.log('Next button clicked');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
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
                console.log("response===>", response)
            } catch (error) {
                // console.log(error);
            }
        };
        fetchData();
    }, []);


    const visibleCards = data.slice(currentCardIndex, currentCardIndex + maxCards);

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
                                    <Select className={styles.demo}
                                        onChange={function noRefCheck() { }}
                                        option={[
                                            'orange',
                                            'apple',
                                            'mango'
                                        ]}
                                        placeholder="Sort by"
                                    />
                                </div>
                            </div>
                            <div className={styles.main_video} style={{ width: "100%" }}>
                                <div className={styles.image_video}>
                                    <img src="../assests/image.svg" alt="videoimage" className={styles.video_image} style={{ width: "100%", objectFit: "none" }} />

                                    <div className={styles.main_div}>
                                        <div className={styles.col}>
                                            <h1 className={styles.head}>{data[currentCardIndex]?.title}</h1>
                                            <div className={styles.flex}>
                                                <span> {formatDateTime(data[currentCardIndex]?.dateAndTime)}</span>
                                                <img src="../assests/copylink.svg" alt="videoimage" className={styles.copy_link} />
                                            </div>

                                            <div className={styles.flex_end}>
                                                <button
                                                    onClick={goToPreviousCard}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        height: '40px',
                                                        width: '40px',
                                                        marginRight: '-32px',
                                                        zIndex: 10,
                                                    }}
                                                    // className={styles.button_prev}
                                                    disabled={currentCardIndex === 0}
                                                >
                                                    <BiSolidChevronLeft className={styles.outline_icon} />
                                                </button>

                                                <button
                                                    onClick={goToNextCard}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        height: '40px',
                                                        width: '40px',
                                                        marginRight: '-32px',
                                                        zIndex: 10,
                                                    }}
                                                    // className={styles.button_next}
                                                    disabled={isMobile ? currentCardIndex >= data.length - maxCards : currentCardIndex === data.length - 1}
                                                // disabled={currentCardIndex === data.length - 1}
                                                >
                                                    <BiChevronRight className={styles.outline_icon} />
                                                </button>
                                            </div>
                                        </div>


                                        <div className={styles.card}>
                                            {visibleCards.map((item, index) => (
                                                <>
                                                    <div key={item._id} className={`${styles.card1} ${isMobile && index !== 0 ? styles.hideOnMobile : ''}`}>
                                                        <img src="../assests/cardimage1.svg" alt="cardImage" className={styles.cardImage} />
                                                        <div className={styles.flex_absolute}>
                                                            <img src="../assests/playicon.svg" alt="cardImage" className={styles.playicon} />
                                                            <span className={styles.time}>8:00</span>
                                                        </div>
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

        </>
    );
};

export default Page;
