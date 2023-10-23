'use client';
import React, { useState } from 'react'
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { Table, TableBody, TableCell } from 'technogetic-iron-smart-ui';
import { Button } from 'technogetic-iron-smart-ui';


const postWinners = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const columns: string[] = [
        'Team Name',
        'Chicken Dinner',
        'Highest Kill',
        'Second Winner',
        'Third Winner'
    ];

    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.inner_main_container}>
                <div className={styles.sidebar_wrapper}>
                    <Navbar />
                    <div className={styles.inner_specter_cls}>
                        <h1 className={styles.r_main_title}>Your Room</h1>
                    </div>
                    <Table className={styles.table_content} >
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
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Rockers</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Rockers</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Spider</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Naughty</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Mens</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}> <input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Shouter</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Rockers</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className={styles.table_row_cell}>
                                <TableCell className={styles.table_data}>Rockers</TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                                <TableCell className={styles.table_data}><input type="checkbox" className={styles.checkbox_round} /></TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>

                    <div className={styles.button_wrapper}>
                        <Button
                            className={styles.cancel_button}
                        >
                            Cancel
                        </Button>

                        <Button
                            id="add"
                            disabled={isLoading}
                            className={styles.submitbutton}
                            variant="contained"
                            type="submit"
                        >
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default postWinners;



