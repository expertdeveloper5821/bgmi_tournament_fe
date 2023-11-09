import React from 'react'
import styles from '@/styles/Spectator.module.scss';
import { Input } from "technogetic-iron-smart-ui";

const Dateandtime = () => {
    return (
        <div className={styles.flex_gap}>
            <div className={styles.input_box_calendar}>
                <Input
                    type="date"
                    className={`${styles.room_field_calendar} ${styles.room_field_cls2}`}
                    name="date"

                />
            </div>
            <div className={styles.input_box_calendar}>
                <Input
                    className={`${styles.room_field_calendar} ${styles.room_field_cls2}`}
                    type="time"
                    name="time"
                    placeholder="Enter time"

                />
            </div>
        </div>

    )
}

export default Dateandtime
