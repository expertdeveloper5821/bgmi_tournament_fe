"use client"
import { useState } from "react";
import styles from "../../styles/Dashboard.module.scss";
//@ts-ignore
import { Button, Input } from "technogetic-iron-smart-ui";

export interface IAppProps { }

export function SearchFilter({ handleSearch }: any) {

  const [searchFilter, setSearchFilter] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  return (
    <>
      <div className={styles.dashboard_content}>

        <div className={styles.content_wrapper}>
          <div className={styles.input_desc}>
            <Input className={styles.placeholder} placeholder="Search" type="search" onChange={handleInputChange}></Input>
            {/* <Input placeholder="Date and Time" type="text"></Input> */}
            <div className={styles.select_wrapper}>

            </div>
            <div className={styles.button_wrapper}>
              <Button className={styles.searchbutton} varient="contained" onClick={() => handleSearch?.(searchFilter)}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
