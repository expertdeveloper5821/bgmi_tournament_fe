'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { Table, TableBody, TableCell, Button, Select, TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { getAllVideo } from '@/services/authServices';
import { getVideo } from '@/types/spectatorTypes';
import { toast } from 'react-toastify';


const Video = () => {
    const [data, setData] = useState<getVideo[]>([]);

    useEffect(() => {
        const getAllVideos = async () => {
            const token = localStorage.getItem('jwtToken') || '';
            try {
                const response = await getAllVideo(token);
                setData(response || []);
            } catch (error) {
                toast.error('Failed to fetch videos');
            }
        };

        getAllVideos();
    }, []);






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


                            <Button
                                className={styles.upload_button}
                                onClick={() => { }}
                                type="file"
                                varient="contained"
                                text="Upload Video"
                            />
                        </div>
                    </div>
                    <div>
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
                                            <img src={video.mapImg ?? '--'} className={styles.video_card} alt="Image" width={120} height={75} />
                                        </TableCell>
                                        <TableCell className={styles.table_data}>{video.title ?? '--'}</TableCell>
                                        <TableCell className={styles.table_data_color}>Squad</TableCell>
                                        <TableCell className={styles.table_data_color}>{video.dateAndTime ?? '--'}</TableCell>
                                        {/* <TableCell className={styles.table_data_color}>{video.time}</TableCell> */}
                                        <TableCell className={styles.table_data}>
                                            <span className={styles.gap}>
                                                <Image src="/assests/update.svg" alt="Image" width={12} height={12} />
                                                <Image src="/assests/Tabledeleted.svg" alt="Image" width={12} height={12} />
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;

