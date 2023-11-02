'use client';
import React from 'react'
import styles from '@/styles/Spectator.module.scss';
import { Navbar } from '@/Components/Navbar/Navbar';
import Image from 'next/image';


const matchHistory = () => {

    return (
        <div className={styles.main_container} id="mainLayoutContainerInner">
            <div className={styles.inner_main_container}>
                <div className={styles.sidebar_wrapper}>
                    <Navbar />
                    <div className={styles.inner_specter_cls}>
                        <h1 className={styles.r_main_title}>Match History</h1>
                    </div>
                    <div className={styles.match_details}>
                        <div className={styles.match_details1}>
                            <div className={styles.flex}>
                                <span className={styles.date}>Fri, 29 Oct</span>
                                <span className={styles.time}>5:00 PM</span>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.row}>
                                    <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                                    <span>Prize Pool : Chicken Dinner</span>
                                </div>
                                <span>Match Name : BGMI</span>
                                <span>Match Type : Squad</span>
                                <span>Team Name  : Rockers</span>
                                <span>Map Name : Squad</span>
                            </div>
                            <div className={styles.team_members}>
                                <div className={styles.team_member1}>
                                    <Image src="/assests/teammember1.svg" alt="Image" width={55} height={65} />
                                </div>
                                <div className={styles.team_member2}>
                                    <Image src="/assests/teammember2.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member3}>
                                    <Image src="/assests/teammember3.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member4}>
                                    <Image src="/assests/teammember4.svg" alt="Image" width={50} height={60} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.match_details2}>
                            <div className={styles.flex}>
                                <span className={styles.date}>Fri, 29 Oct</span>
                                <span className={styles.time}>5:00 PM</span>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.row}>
                                    <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                                    <span>Prize Pool : Highest Kill</span>
                                </div>
                                <span>Match Name : BGMI</span>
                                <span>Match Type : Squad</span>
                                <span>Team Name  : Ro@#dsrs</span>
                                <span>Map Name : Squad</span>
                            </div>
                            <div className={styles.team_members}>
                                <div className={styles.team_member1}>
                                    <Image src="/assests/teammember1.svg" alt="Image" width={55} height={65} />
                                </div>
                                <div className={styles.team_member2}>
                                    <Image src="/assests/teammember2.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member3}>
                                    <Image src="/assests/teammember3.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member4}>
                                    <Image src="/assests/teammember4.svg" alt="Image" width={50} height={60} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.match_details}>
                        <div className={styles.match_details1}>
                            <div className={styles.flex}>
                                <span className={styles.date}>Fri, 29 Oct</span>
                                <span className={styles.time}>5:00 PM</span>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.row}>
                                    <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                                    <span>Prize Pool : 2nd Winner</span>
                                </div>
                                <span>Match Name : BGMI</span>
                                <span>Match Type : Squad</span>
                                <span>Team Name  : hary%5%rs</span>
                                <span>Map Name : Squad</span>
                            </div>
                            <div className={styles.team_members}>
                                <div className={styles.team_member1}>
                                    <Image src="/assests/teammember1.svg" alt="Image" width={55} height={65} />
                                </div>
                                <div className={styles.team_member2}>
                                    <Image src="/assests/teammember2.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member3}>
                                    <Image src="/assests/teammember3.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member4}>
                                    <Image src="/assests/teammember4.svg" alt="Image" width={50} height={60} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.match_details2}>
                            <div className={styles.flex}>
                                <span className={styles.date}>Fri, 29 Oct</span>
                                <span className={styles.time}>5:00 PM</span>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.row}>
                                    <Image src="/assests/trophie.svg" alt="Image" width={22} height={22} />
                                    <span>Prize Pool : 3rd Winner</span>
                                </div>
                                <span>Match Name : BGMI </span>
                                <span>Match Type : Squad</span>
                                <span>Team Name  : gkh887</span>
                                <span>Map Name : Squad</span>
                            </div>
                            <div className={styles.team_members}>
                                <div className={styles.team_member1}>
                                    <Image src="/assests/teammember1.svg" alt="Image" width={55} height={65} />
                                </div>
                                <div className={styles.team_member2}>
                                    <Image src="/assests/teammember2.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member3}>
                                    <Image src="/assests/teammember3.svg" alt="Image" width={50} height={60} />
                                </div>
                                <div className={styles.team_member4}>
                                    <Image src="/assests/teammember4.svg" alt="Image" width={50} height={60} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

};

export default matchHistory;



