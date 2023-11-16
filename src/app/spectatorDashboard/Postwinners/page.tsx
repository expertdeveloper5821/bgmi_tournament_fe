'use client';
import React, { useState } from 'react';
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import { TableHeader, TableHead, TableRow } from 'technogetic-iron-smart-ui';
import { Table, TableBody, TableCell } from 'technogetic-iron-smart-ui';
import { Button } from 'technogetic-iron-smart-ui';
import { useRouter } from 'next/navigation';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

const postWinners = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  console.log('isLoading', isLoading);
  const columns: string[] = [
    'Team Name',
    'Chicken Dinner',
    'Highest Kill',
    'Second Winner',
    'Third Winner',
  ];

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <IsAuthenticatedHoc>
      <div className={styles.main_container} id="mainLayoutContainerInner">
        <div className={styles.inner_main_container}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
            <div className={styles.inner_specter_cls}>
              <h1 className={styles.r_main_title}>Your Room</h1>
            </div>
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

              <TableBody className={styles.postWinnerTbody}>
                {[1, 2, 3, 4, 5, 6].map((name) => (
                  <TableRow className={styles.table_row_winner}>
                    <TableCell className={styles.table_data}>User {name}</TableCell>
                    <TableCell className={styles.table_data}>
                      <input type="radio" name="Chicken_dinner" className={styles.checkbox_round} />
                    </TableCell>
                    <TableCell className={styles.table_data}>
                      <input type="radio" name="Highest_kill" className={styles.checkbox_round} />
                    </TableCell>
                    <TableCell className={styles.table_data}>
                      <input type="radio" name="Second_winner" className={styles.checkbox_round} />
                    </TableCell>
                    <TableCell className={styles.table_data}>
                      <input type="radio" name="Third_winner" className={styles.checkbox_round} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className={styles.button_wrapper}>
              <Button
                onClick={() => router.push('/spectatorDashboard')}
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
                onClick={() => handleLoading()}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </IsAuthenticatedHoc>
  );
};

export default postWinners;
