'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { Table, TableBody, TableCell, Select, TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { getAllVideo, deleteVideoService } from '@/services/authServices';
import { getVideo } from '@/types/spectatorTypes';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '@/Components/CommonComponent/Loader/Loader';


const Video = () => {
    const [data, setData] = useState<getVideo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    const getAllVideos = async () => {
        const token = localStorage.getItem('jwtToken') || '';
        try {
            const response = await getAllVideo(token);
            setData(response || []);
            // console.log("response", response)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getAllVideos();
    }, []);

    const deleteVideo = async (_id: string) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('jwtToken') || '';
            const response = await deleteVideoService({ _id, token });
            getAllVideos();
            toast.success(response?.data?.message);
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };


    function formatDateTime(dateTime: string) {
        const dateObj = new Date(dateTime);
        const formattedDate = `${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}/${dateObj.getFullYear()}`
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
        return {
            date: formattedDate,
            time: formattedTime,
        };
    }

    const handleClickUpdate = (_id: string) => {
        router.push(`/spectatorDashboard/Matchhistorydetails?id=${_id}`);
    }


    const columns: string[] = [
        'Video',
        'Title',
        'Match Type',
        'Date',
        'Time',
        'Action',
    ];

    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.inner_main_container}>
                <div className={styles.sidebar_wrapper}>
                    <Navbar />
                    <div className={styles.inner_specter_cls}>
                        <h1 className={styles.title_video}>Your Videos</h1>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Select
                                onChange={function noRefCheck() { }}
                                option={[
                                    'Status Timeline',
                                    'Match Type',
                                    'Date'
                                ]}
                                placeholder="Sort By"
                                className={styles.sort}
                                optionClassName={styles.popdown}
                            />
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Table className={styles.table_content}>
                                <TableHeader className={styles.tableHeader}>
                                    <TableRow className={styles.tableRow}>
                                        {columns?.map((column, index) => (
                                            <TableHead className={styles.table_head_sectat} key={index}>
                                                <div className={styles.filter}>{column}</div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((video, index) => (
                                        <TableRow className={styles.table_row_cell} key={index}>
                                            <TableCell className={styles.table_data}>
                                                <img src={video.mapImg ?? '/assests/about.jpg'} className={styles.video_card} alt="Image" width={120} height={75} />
                                            </TableCell>
                                            <TableCell className={styles.table_data}>{video.title ?? '--'}</TableCell>
                                            <TableCell className={styles.table_data_color}>Squad</TableCell>
                                            <TableCell className={styles.table_data_color}>{formatDateTime(video.dateAndTime ?? '--').date}</TableCell>
                                            <TableCell className={styles.table_data_color}>{formatDateTime(video.dateAndTime ?? '--').time}</TableCell>
                                            <TableCell className={styles.table_data}>
                                                <span className={styles.gap}>
                                                    <Image src="/assests/update.svg" alt="Image" width={12} height={12} onClick={() => handleClickUpdate(video._id)} />
                                                    <Image src="/assests/Tabledeleted.svg" alt="Image" width={12} height={12} onClick={() => deleteVideo(video._id)} />
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;

