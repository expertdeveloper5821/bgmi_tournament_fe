'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.scss';
import { Navbar } from '../../../Components/Navbar/Navbar';
import TableComponent, { TeamsProfile } from "../../../Components/Table/TableData";
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';
import { BtnDashboard } from '../../../Components/CommonComponent/BtnDashboard';
import sendRequest from '@/services/auth/auth_All_Api';
import { useRouter, NextRouter } from 'next/router';

export default function Teams() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [paginatedData, setPaginatedData] = useState<TeamsProfile[]>([]);
    const rowPerPage: number = 8;
    const totalPages: number = 10;

    const fetchDataFromAPI = async () => {
        setLoading(true)
        try {
            const response = await sendRequest('v1/addteam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                throw new Error('API response is not valid');
            }

            const data: TeamsProfile[] = response.data.data;
            console.log("response", data);

            setPaginatedData(data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
            setPaginatedData([]);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        console.log("FUN")
        fetchDataFromAPI();
    }, []);

    const onPageChange = (page: number): void => {
        setCurrentPage(page);
    };


    const columns: string[] = ['emails', 'leadPlayer', 'id'];


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.abcd}>
                    <div className={styles.sidebar_wrapper}>
                        <Navbar />
                        <BtnDashboard />
                        {/* <TableComponent
                            userData={paginatedData}
                            columns={columns}
                            showAdditionalButton={true}
                        /> */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(columns.length / rowPerPage)}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}




