import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Dashboard.module.scss';
import { useRouter } from 'next/navigation';
import { formatDate, formatTime } from '../CommonComponent/moment';
import { IMatchProps } from '@/app/userDashboard/types';
import moment from 'moment';

const MiniMatchComponent = ({ match, visibleRooms }: IMatchProps) => {
  const router = useRouter();

  const regMatchRedirect = (matchID: string) => {
    router.push(`/userDashboard/registerMatches?id=${matchID}`);
  };

  const getIdPass = (dateAndTime: string) => {
    const REDUCE_TIME = 15 * 60 * 1000;
    const currentTime = new Date().getTime();
    let dateNumber = new Date(dateAndTime).getTime();
    const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
    return currentTime >= reducedTime;
  };

  return (
    <div className={styles.container3}>
      <div className={styles.reg_match_image_container} style={{ position: 'relative' }}>
        <Image
          src={match?.mapImg || '../assests/registeredmatches.svg'}
          alt={`${styles.slide}`}
          className={styles.container3_img}
          width={100}
          height={100}
          onClick={() => regMatchRedirect(match?._id)}
        />
        <div className={styles.gameCardFade}>
          <p>{match.gameName}</p>
          <p
            className={styles.tvm_font}
            style={{ color: 'rgba(255, 122, 0, 1)', cursor: 'pointer' }}
            onClick={() => regMatchRedirect(match?._id)}
          >
            View more
          </p>
        </div>
      </div>
      <div className={styles.Tournaments}>
        <div className={styles.tournament_slider}>
          <div className={styles.winning_prize}>
            <span> TYPE</span>
            <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>
              {match?.gameType}
            </span>
          </div>
          <div className={styles.winning_prize}>
            <span>Version</span>
            <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>
              {match?.version}
            </span>
          </div>
          <div className={styles.winning_prize}>
            <span>MAP</span>
            <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>
              {match?.mapType}
            </span>
          </div>
        </div>
        <div className={styles.room_create}>
          <div className={styles.winning_prize}>
            <span> Match start Date </span>
            <span>{formatDate({ date: match?.dateAndTime })}</span>
          </div>
          <div className={styles.winning_prize}>
            <span>Time</span>
            <span>{formatTime({ time: match?.dateAndTime, format: 'LT' })}</span>
          </div>
        </div>
        <div className={styles.id_password}>
          <span>Room Id: {getIdPass(match.dateAndTime) ? match.roomId : '*****'}</span>
          <span>Room password: {getIdPass(match.dateAndTime) ? match.password : '****'}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniMatchComponent;
