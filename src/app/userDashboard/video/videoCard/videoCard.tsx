'use client';
import React, { useEffect, useState } from 'react';
('');
import styles from '@/styles/card.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
import Image from 'next/image';

interface VideoInfo {
  date: string;
  time: string;
  videoLink: string;
}
interface CustomPaginationProps {
  onDataUpdate: (data: any) => void;
}

const VideoCard: React.FC<CustomPaginationProps> = ({ onDataUpdate }) => {
  const [data, setData] = useState<VideoInfo[]>([]);
  // will use spectator login token here
  console.log(data);
  //   const accessToken =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQyM2NmZmYyZGU4ZDVhODM2OTVlOWYiLCJyb2xlIjpbeyJfaWQiOiI2NGM3ODE1M2QyYzhhODQzMWNjMzZiZjIiLCJyb2xlIjpbImFkbWluIl19XSwiaWF0IjoxNjkxNzM2MzcwLCJleHAiOjE2OTE5MDkxNzB9.GGAIOjgZs9q82XdLZNvR-TQ4JwALiIev8lfLBtajhE4'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('jwttoken');
        const response = await sendRequest('/role/allvideolink', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const responseData = response?.data?.data as VideoInfo[];
        setData(responseData);
        onDataUpdate(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {data.length > 0 &&
        data.map((info: VideoInfo, index: number) => {
          return (
            <div className={styles.main_container} key={index}>
              <div className={styles.bannercontainer}>
                <Image
                  src="/assests/ytbanner.svg"
                  alt="ytbanner"
                  height={100}
                  width={100}
                  className={styles.ytbanner}
                />
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
                      <Image src="/assests/copy.svg" alt="copy" height={100} width={100} />
                    </span>
                    <button className={styles.btn}> Copy link</button>
                  </div>
                  <div className={styles.btnContainer}>
                    <button className={styles.btn}> Watch video</button>
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
