'use client'
import { useEffect } from "react";
import styles from "./loader.module.scss";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";

type Props = {};

const Loader = (props: Props) => {

    // const navigate = useNavigate();
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/Signup");
        }, 2000)
    })
    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.background_container}>
                    <div className={styles.container}>
                        <div className={styles.logo}>
                            <img src="./assests/technogeticlogo.svg" alt="Tg-logo"></img>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Loader</h2>
        </>
    );
};

export default Loader;