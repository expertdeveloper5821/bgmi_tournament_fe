'use client'
import React from "react";
import styles from "./Dashboard.module.scss";
import Sidebar from "../../Components/SideBar/Sidebar"
import { useRouter } from "next/router";
import { Navbar } from "../../Components/Navbar/Navbar";
import TableData from "../../Components/Table/TableData"

export interface IAppProps { }

export default function Dashboard() {

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar/>
        
        <div className={styles.abcd}>
          <div className={styles.sidebar_wrapper}>
            <Navbar />
          </div>
        </div>
      </div>
      <div>
        {/* <TableData/> */}
      </div>
      <h1>Dashboard</h1>
    </>
  );
}