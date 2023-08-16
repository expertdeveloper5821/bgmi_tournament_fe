'use client';
import React, {useEffect, useState} from 'react';
import styles from '../../../../styles/videoCard.module.scss';
import sendRequest from '@/services/auth/auth_All_Api';

interface CustomPaginationProps {
  onDataUpdate: (data: any) => void;
}

const VideoCard: React.FC<CustomPaginationProps> = ({onDataUpdate}) => {
  const [data, setData] = useState<any>();
  // will use spectator login token here
  console.log(data);
  //   const accessToken =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQyM2NmZmYyZGU4ZDVhODM2OTVlOWYiLCJyb2xlIjpbeyJfaWQiOiI2NGM3ODE1M2QyYzhhODQzMWNjMzZiZjIiLCJyb2xlIjpbImFkbWluIl19XSwiaWF0IjoxNjkxNzM2MzcwLCJleHAiOjE2OTE5MDkxNzB9.GGAIOjgZs9q82XdLZNvR-TQ4JwALiIev8lfLBtajhE4'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('jwttoken');
        const response = await sendRequest('api/v1/role/allvideolink', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response?.data?.data);
        onDataUpdate(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {' '}
      {data &&
        data.map((info: any, index: any) => {
          return (
            <div className={styles.main_container} key={index}>
              <div className={styles.bannercontainer}>
                <img src="/assests/ytbanner.svg" className={styles.ytbanner} />
              </div>
              <div className={styles.gameInfo}>
                <h1 className={styles.heading}>BGMI SQUAD MATCH</h1>
                <h4 className={styles.time}>
                  Time :{info.date} at {info.time}{' '}
                </h4>
                <h4 className={styles.time}>{info.videoLink}</h4>
                <div className={styles.button_maincontainer}>
                  <div className={styles.btnContainer}>
                    <span className={styles.copyimg}>
                      <img src="/assests/copy.svg" alt="copy" />
                    </span>
                    <button className={styles.btn}> copy link</button>
                  </div>
                  <div className={styles.btnContainer}>
                    <button className={styles.btn}> watch video</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default VideoCard;
