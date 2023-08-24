'use client';
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/CountdownComponent.module.scss';

function CountdownComponent(props: { roomidd: string; password: string; date:string; time:string }) {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const dbTime = `${props.date}T${props.time}`;
            //const currentTime = new Date(`2023-08-24T12:36`);
            //const dbTime = `2023-08-23T15:50`;
            const matchTime = new Date(dbTime);
            //console.log('currentTime',matchTime,'    ',currentTime);
            const timeDifference = Number(matchTime) - Number(currentTime);
            if (timeDifference <= 900000 ) {
                setShowComponent(true);
            }
            return () => {
                setShowComponent(false);
                clearInterval(intervalId);
            };
        }, 1000);
    }, []);
    
    if (!showComponent) {
        return null;
    }

    return (
        <div className={styles.id_password}>
            <span>Room Id: {props.roomidd}</span>
            <span>Room password: {props.password}</span>
        </div>  
    )
}

export default CountdownComponent;
