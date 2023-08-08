
import { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import styles from "../../styles/TableData.module.scss";
//@ts-ignore
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, IconButton } from "technogetic-iron-smart-ui";

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
    }, [props.userData]);

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
        // const updatedData = sortedData.filter(
        //     (data: any) => data.studentID !== userData.studentID
        // );
        // setSortedData(updatedData);
        // console.log("data", updatedData);
    }

    const handleEdit = (userData: USER_DATA) => {
        console.log("Edit student data:", userData);
    };

    return (
        <Table className={styles.table_content}>
            <TableHeader className={styles.tableHeader}>
                <TableRow className={styles.tableRow}>
                    {props.columns?.map((columnName) => (
                        <TableHead className={styles.table_head} key={columnName}>
                            <div className={styles.filter}>
                                {columnName}
                                <div>
                                    <img
                                        src="/assests/upArrow.svg"
                                        alt="filterup"
                                        onClick={() => handleSort(columnName)}
                                    ></img>
                                    <img
                                        src="/assests/downArrow.svg"
                                        alt="filterdown"
                                        onClick={() => handleSort(columnName)}
                                    ></img>
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
                {sortedData?.map((userData: USER_DATA, index: number) => {
                    // const teamData = props.userData.find((team: TeamsProfile) => team.id === userData.id);
                    //console.log("userData", userData)

                    const additionalImagePath = props.showAdditionalButton
                        ? "./assests/UserProfile.svg"
                        : null;

                    return (
                        <TableRow className={styles.table_rowdata} key={index}>
                            <TableCell className={styles.table_cell}>
                                {userData?.Course}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData?.Mobile}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData?.Student}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData.StudentName}
                            </TableCell>
                            <TableCell className={styles.table_cell}>
                                {userData.studentID}
                            </TableCell>
                            {/* <TableCell className={styles.table_cell}>
                    {userData.emails}
                  </TableCell>
                  <TableCell className={styles.table_cell}>
                    {userData.leadPlayer}
                  </TableCell>
                  <TableCell className={styles.table_cell}>
                    {userData.id}
                  </TableCell> */}
                            <TableCell className={styles.table_cell}>
                                {additionalImagePath ? (
                                    <IconButton>
                                        <div className={styles.iconWrapper}>
                                            <img
                                                src="/assests/UserProfile.svg"
                                                alt="UserProfileView"
                                                className={styles.table_icon}
                                            ></img>
                                            <span>View Profile</span>
                                        </div>
                                    </IconButton>
                                ) : (
                                    <>
                                        <IconButton onClick={() => handleEdit(userData)}>
                                            <img
                                                src="/assests/TableEdit.svg"
                                                alt="UserProfileEdit"
                                                className={styles.cell_icon}
                                            ></img>
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete({ userData })}>
                                            <img
                                                src="/assests/Tabledelete.svg"
                                                alt="UserProfileDelete"
                                                className={styles.cell_icon}
                                            ></img>
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default TableData;


