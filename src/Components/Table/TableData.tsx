'use client'
import { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import styles from "../../styles/TableData.module.scss";
//@ts-ignore
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, IconButton } from "technogetic-iron-smart-ui";

export interface UserProfile {
    FullName: string;
    UserName: string;
    Email: string;
}

interface UserProfilePropsType {
    userData: UserProfile[];
    showAdditionalButton?: boolean;
    columns: string[];
}
interface userData {
    [key: string]: string;
}

const TableData = (props: UserProfilePropsType) => {

    const [sortedData, setSortedData] = useState(props?.userData);
    const [isDescending, setIsDescending] = useState(false);
    const [sortKey, setSortKey] = useState("");

    useEffect(() => {
        setSortedData(props?.userData);
    }, [props?.userData]);

    console.log("sortedData", sortedData)

    const handleSort = (key: keyof userData) => {
        let sorted = [];

        if (sortKey === key) {
            sorted = [...sortedData].reverse();
            setIsDescending(!isDescending);
        } else {
            sorted = [...sortedData].sort((a: any, b: any) => {
                if (a[key] < b[key]) return isDescending ? 1 : -1;
                if (a[key] > b[key]) return isDescending ? -1 : 1;
                return 0;
            });
            setIsDescending(false);
        }
        setSortedData(sorted);
        setSortKey(String(key));
    };

    function handleDelete({ userData }: { userData: userData; }): void {
        const updatedData = sortedData.filter(
            (data: any) => data.studentID !== userData.studentID
        );
        setSortedData(updatedData);
        console.log("data", updatedData);
    }
    // console.log("sortedData", sortedData)

    const handleEdit = (userData: userData) => {
        console.log("Edit student data:", userData);
    }

    return (

        <div>
            <Table className={styles.table_content}>
                <TableHeader className={styles.tableHeader}>
                    <TableRow className={styles.tableRow}>
                        {props.columns.map((columnName) => (
                            <TableHead className={styles.table_head} key={columnName}>
                                <div className={styles.filter}>
                                    {columnName}
                                    <div>
                                        <img src="/assests/upArrow.svg" alt="filterup" onClick={() => handleSort(columnName)}></img>
                                        <img src="/assests/downArrow.svg" alt="filterdown" onClick={() => handleSort(columnName)}></img>
                                    </div>
                                </div>
                            </TableHead>
                        ))}
                        <TableHead className={styles.table_head}>
                            <div className={styles.filter}>Actions</div>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className={styles.table_body}>
                    {sortedData.map((userData: any, index: number) => {
                        console.log("userData", userData)
                        const additionalImagePath = props.showAdditionalButton ? "./assests/UserProfile.svg" : null;


                        return (
                            <TableRow className={styles.table_rowdata} key={index} >
                                <TableCell className={styles.table_cell}>
                                    {userData.FullName}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {userData.UserName}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {userData.Email}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {additionalImagePath ? (
                                        <IconButton>
                                            <div className={styles.iconWrapper}>
                                                <img src="/assests/UserProfile.svg" alt="UserProfileView" className={styles.table_icon}></img>
                                                <span>View Profile</span>
                                            </div>
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleEdit(userData)}>
                                                <img src="/assests/TableEdit.svg" alt="UserProfileEdit" className={styles.cell_icon}></img>
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete({ userData })}>
                                                <img src="/assests/Tabledelete.svg" alt="UserProfileDelete" className={styles.cell_icon}></img>
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableData;
