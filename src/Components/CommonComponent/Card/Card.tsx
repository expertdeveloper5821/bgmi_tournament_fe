'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/card.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';

interface CardProps {
  toOpen: (value: boolean) => void;
  forwardModalOpen: (value: boolean) => void;
  teamData: (value: any[]) => void;
  fwdindex: (value: any) => void;
}
const Card: React.FC<CardProps> = ({ fwdindex, toOpen, forwardModalOpen, teamData }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [forwardModal, setForwardModal] = useState<boolean>(false);
  const [res, setRes] = useState<any>();
  console.log(res);

  const handleOpenModal = (index: any) => {
    setDeleteModal(true);
    toOpen(deleteModal);
    fwdindex(index);
  };
  const openForwardModal = (index: any) => {
    setForwardModal(true);
    forwardModalOpen(forwardModal);
    fwdindex(index);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('jwttoken');
        const response = await sendRequest('/team/get-team', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);

        setRes(response?.data);
        teamData(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {res &&
        res.map((data: any, index: any) => {
          const shortEmail = data.email.slice(0, 20);
          return (
            <div className={styles.reviewsContainer} key={index}>
              {' '}
              <div className={styles.reviewCard}>
                <div className={styles.reviews}>
                  <img src="/assests/reviewer.svg" alt="image" className={styles.profile} />
                  <div className={styles.reviewer}>
                    <div className={styles.name}>
                      <h2>JOhn doe</h2>
                      <div className={styles.greenCircle}></div>
                    </div>
                    <p>{shortEmail}</p>
                    <div className={styles.sendinvite}>
                      <span>Send invite</span>
                      <div>
                        <img
                          src="/assests/forward.svg"
                          onClick={() => {
                            openForwardModal(index);
                          }}
                        />
                      </div>
                      <div>
                        <img
                          src="/assests/cancel.svg"
                          onClick={() => {
                            handleOpenModal(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Card;
