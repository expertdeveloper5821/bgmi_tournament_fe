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
                                    <span>Prize Pool : <span className={styles.boldText}>Chicken Dinner</span></span>
                                </div>
                                <span>Match Name : <span className={styles.bold}>BGMI</span></span>
                                <span>Match Type : <span className={styles.bold}>Squad</span></span>
                                <span>Team Name  : <span className={styles.bold}> Rockers</span></span>
                                <span>Map Name : <span className={styles.bold}>Squad </span></span>
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
                                    <span>Prize Pool : <span className={styles.boldText}>Highest Kill</span></span>
                                </div>
                                <span>Match Name : <span className={styles.bold}>BGMI</span></span>
                                <span>Match Type : <span className={styles.bold}>Squad</span></span>
                                <span>Team Name  : <span className={styles.bold}> Ro@#dsrs </span></span>
                                <span>Map Name :   <span className={styles.bold}> Squad</span></span>
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
                                    <span>Prize Pool :<span className={styles.boldText}> 2nd Winner </span></span>
                                </div>
                                <span>Match Name :  <span className={styles.bold}>BGMI</span></span>
                                <span>Match Type :  <span className={styles.bold}>Squad</span></span>
                                <span>Team Name  : <span className={styles.bold}>hary%5%rs</span></span>
                                <span>Map Name :  <span className={styles.bold}>Squad</span></span>
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
                                    <span>Prize Pool : <span className={styles.boldText}> 3nd Winner </span></span>
                                </div>
                                <span>Match Name : <span className={styles.bold}>BGMI</span></span>
                                <span>Match Type :  <span className={styles.bold}>Squad</span></span>
                                <span>Team Name  : <span className={styles.bold}>gkh887 </span></span>
                                <span>Map Name : <span className={styles.bold}> Squad </span></span>
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



