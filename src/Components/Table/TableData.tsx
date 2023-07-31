import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./TableData.module.scss";
//@ts-ignore
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, IconButton, } from "technogetic-iron-smart-ui";

// interface StudentProfile {
//     Course: string;
//     Mobile: string;
//     Student: string;
//     StudentName: string;
//     studentID: string;
// }
export interface StudentProfile {
    Course: string;
    Mobile: string;
    Student: string;
    StudentName: string;
    studentID: string;
}

interface StudentProfilePropsType {
    studentData: StudentProfile[]
    showAdditionalButton?: boolean;
    columns: string[]
}

interface studentData {
    // StudentName: string;
    // Student: string;
    // studentID: string;
    // Mobile: string;
    // Course: string;
    [key: string]: string;
}

const TableData = (props: StudentProfilePropsType) => {
    // const location = useLocation();

    const [sortedData, setSortedData] = useState(props?.studentData);
    const [isDescending, setIsDescending] = useState(false);
    const [sortKey, setSortKey] = useState("");

    const shouldShowAdditionalButton = true;

    useEffect(() => {
        setSortedData(props?.studentData)
    }, [props?.studentData])

    const handleSort = (key: keyof studentData) => {
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

    const handleDelete = (studentData: studentData) => {
        const updatedData = sortedData.filter(
            (data: any) => data.studentID !== studentData.studentID
        );
        setSortedData(updatedData);
        console.log("data", updatedData)
    };

    const handleEdit = (studentData: studentData) => {
        const handleEdit = sortedData;
    }

    console.log(sortedData)
    const tableHeads = ["Assignment Name", "Assignment ID", "Student", "Assigned Date", "Deadline", "Actions"]
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
                                        <img src="/assets/upArrow.svg" alt="filterup" onClick={() => handleSort(columnName)}></img>
                                        <img src="/assets/downArrow.svg" alt="filterdown" onClick={() => handleSort(columnName)}></img>
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
                    {sortedData.map((studentData: any, index: number) => {
                        const shouldRenderAdditionalButton =
                            location.pathname === "/student";
                        const additionalImagePath = shouldRenderAdditionalButton
                            ? "./assets/StudentProfile.svg"
                            : null;

                        return (
                            <TableRow className={styles.table_rowdata} key={index}>
                                {/* {props.columns.map((columnName) => ( */}
                                <TableCell className={styles.table_cell}>
                                    {studentData.StudentName}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {studentData.Student}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {studentData.studentID}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {studentData.Mobile}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {studentData.Course}
                                </TableCell>
                                <TableCell className={styles.table_cell}>
                                    {additionalImagePath ? (
                                        <IconButton>
                                            <div className={styles.iconWrapper}>
                                                <img src="/assets/StudentProfile.svg" alt="studentProfileView" className={styles.table_icon}></img>
                                                <span>View Profile</span>
                                            </div>
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton>
                                                <img src="/assets/TableProfile.svg" alt="studentProfile" className={styles.cell_icon}></img>
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(studentData)}>
                                                <img src="/assets/TableEdit.svg" alt="studentProfileEdit" className={styles.cell_icon}></img>
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(studentData)}>
                                                <img src="/assets/TableDelete.svg" alt="studentProfileDelete" className={styles.cell_icon}></img>
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







