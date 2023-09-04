'use client';
import React, {useEffect, useState} from 'react';
import styles from '../../../../styles/videoCard.module.scss';
import {sendRequest} from '@/services/auth/auth_All_Api';
import Image from 'next/image';
import {toast} from 'react-toastify';

interface VideoInfo {
  date: string;
  time: string;
  videoLink: string;
}
interface CustomPaginationProps {
  onDataUpdate: (data: any) => void;
}

const VideoCard: React.FC<CustomPaginationProps> = ({onDataUpdate}) => {

  const [data, setData] = useState<VideoInfo[]>([]);

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

  // copy link to clipboard
  const handleCopyClick = async (link: any) => {
    try {
      const tempInput = document.createElement('input');
      tempInput.value = link;
      document.body.appendChild(tempInput);
      tempInput.select();
      await navigator.clipboard.writeText(link);
      document.body.removeChild(tempInput);
      toast.success('link copied to clipboard');
    } catch (error) {
      console.log('errorr', error);
    }
  };

 // Redirect to the link directly
  const handleRedirectClick = (linkText:any) => {
    window.location.href = linkText;
  };

  return (
    <div>
      {data &&
        data.length > 0 &&
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
                  Time :{info.date} at {info.time}
                </h4>
                {/* <p className={styles.time}>{info.videoLink}</p> */}
                <div className={styles.button_maincontainer}>
                  <div
                    className={styles.btnContainer}
                    onClick={() => handleCopyClick(info.videoLink)}
                  >
                    <span className={styles.copyimg}>
                      <Image
                        src="/assests/copy.svg"
                        alt="copy"
                        height={100}
                        width={100}
                        className={styles.copyicon}
                      />
                    </span>
                    <button className={styles.btn}> Copy link</button>
                  </div>
                  <div className={styles.btnContainer} onClick={()=>handleRedirectClick(info.videoLink)}>
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
