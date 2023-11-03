'use client';
import React from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import { Table, TableBody, TableCell, Button } from 'technogetic-iron-smart-ui';
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import Image from 'next/image';

const Video = () => {
    const columns: string[] = [
        'Video',
        'Title',
        'Match Type',
        'Date',
        'Time',
        'Action',
    ];

    const videos = [
        {
            imageSrc: '/assests/videocardimage.svg',
            title: 'BGMI Squad Match',
            matchType: 'Squad',
            date: '2 Oct 2023',
            time: '11:00PM',
        },
        {
            imageSrc: '/assests/videocardimage.svg',
            title: 'BGMI Squad Match',
            matchType: 'Squad',
            date: '2 Oct 2023',
            time: '11:00PM',
        },
        {
            imageSrc: '/assests/videocardimage.svg',
            title: 'BGMI Squad Match',
            matchType: 'Squad',
            date: '2 Oct 2023',
            time: '11:00PM',
        },
        {
            imageSrc: '/assests/videocardimage.svg',
            title: 'BGMI Squad Match',
            matchType: 'Squad',
            date: '2 Oct 2023',
            time: '11:00PM',
        },
        // Add more video objects here...
    ];

    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.inner_main_container}>
                <div className={styles.sidebar_wrapper}>
                    <Navbar />
                    <div className={styles.inner_specter_cls}>
                        <h1 className={styles.r_main_title}>Your Videos</h1>
                        <Button
                            className={styles.upload_button}
                            onClick={() => { }}
                            type="file"
                            varient="contained"
                            text="Upload Video"
                        />
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
                                {videos.map((video, index) => (
                                    <TableRow className={styles.table_row_cell} key={index}>
                                        <TableCell className={styles.table_data}>
                                            <Image src={video.imageSrc} className={styles.video_card} alt="Image" width={120} height={75} />
                                        </TableCell>
                                        <TableCell className={styles.table_data}>{video.title}</TableCell>
                                        <TableCell className={styles.table_data}>{video.matchType}</TableCell>
                                        <TableCell className={styles.table_data}>{video.date}</TableCell>
                                        <TableCell className={styles.table_data}>{video.time}</TableCell>
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

