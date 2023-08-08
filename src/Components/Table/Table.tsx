import { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import styles from "../../styles/TableData.module.scss";
//@ts-ignore
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, IconButton } from "technogetic-iron-smart-ui";
import Image from "next/image";

export interface UserProfile {
    fullName: string;
    userName: string;
    email: string;
    role: string;
}

export interface USER_DATA {
    Course: string;
    Mobile: string;
    Student: string;
    StudentName: string;
    studentID: string;
}

export interface TeamsProfile {
    emails: string;
    leadPlayer: string;
    id: string;
}

interface UserProfilePropsType {
    userData: USER_DATA[] | [];
    teamsData?: TeamsProfile[];
    showAdditionalButton?: boolean;
    columns?: string[];
    studentData?: USER_DATA[] | [];
}

interface UserData {
    [key: string]: string;
}

const TableData: React.FC<UserProfilePropsType> = (props) => {
    const [sortedData, setSortedData] = useState<USER_DATA[] | []>([]);
    const [isDescending, setIsDescending] = useState(false);
    const [sortKey, setSortKey] = useState<string>("");

    useEffect(() => {
        setSortedData(props.userData);
    }, []);

    const handleSort = (key: keyof UserData) => {
        let sorted: USER_DATA[] = [];

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

    function handleDelete({ userData }: { userData: USER_DATA }): void {

    }

    const handleEdit = ({ userData }: { userData: USER_DATA }) => {
        console.log("Edit student data:", userData);
    };

    return (
        <Table className={styles.table_content}>
            <TableHeader className={styles.tableHeader}>
                <TableRow className={styles.tableRow}>

                    {props.columns ? (
                        props.columns.map((columnName) => (
                            <TableHead className={styles.table_head} key={columnName}>
                                <div className={styles.filter}>
                                    {columnName}
                                    <div>
                                        <Image
                                            src="/assests/upArrow.svg"
                                            alt="filterup"
                                            width={20}
                                            height={20}
                                            onClick={() => handleSort(columnName)}
                                        />
                                        <Image
                                            src="/assests/downArrow.svg"
                                            alt="filterdown"
                                            width={20}
                                            height={20}
                                            onClick={() => handleSort(columnName)}
                                        />
                                    </div>
                                </div>
                            </TableHead>
                        ))
                    ) : (
                        <div>No Data Found</div>
                    )}
                    <TableHead className={styles.table_head}>
                        <div className={styles.filter}>Actions</div>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody className={styles.table_body}>
                {sortedData?.length > 0 ? (
                    // Render table rows when sortedData has items
                    sortedData.map((userData, index) => (
                        <TableRow className={styles.table_rowdata} key={index}>
                            <TableCell className={styles.table_cell}>
                                {userData.Course}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData.Mobile}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData.Student}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData.StudentName}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData.studentID}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow className={styles.table_rowdata}>
                        <TableCell>No data found</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

    );
};

export default TableData;


