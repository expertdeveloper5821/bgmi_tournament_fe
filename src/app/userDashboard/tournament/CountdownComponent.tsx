'use client';
// import React from 'react';
// import styles from '../../../styles/CountdownComponent.module.scss';

// function CountdownComponent(props: {
//   roomidd: string;
//   password: string;
//   date: string;
//   time: string;
// }) {
//   return (
//     <div className={styles.id_password}>
//       <span>Room Id: {props.roomidd}</span>
//       <span>Room password: {props.password}</span>
//     </div>
//   );
// }

// export default CountdownComponent;
const CountdownComponent = (dateAndTime: string, roomUuid: string, setVisibleRooms: React.Dispatch<React.SetStateAction<string[]>>) => {
  if (dateAndTime && roomUuid) {
    setInterval(() => {
      const REDUCE_TIME = 15 * 60 * 1000;
      const currentTime = new Date().getTime();
      let dateNumber = new Date(dateAndTime).getTime();
      const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
      if (currentTime >= reducedTime) {
        setVisibleRooms(prevRooms => [...prevRooms, roomUuid])
      }
    }, 60000)
  }
};

export default CountdownComponent;