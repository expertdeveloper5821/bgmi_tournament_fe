'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/card.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import { FaUserFriends } from 'react-icons/fa';
import { debounce } from '@/utils/commonFunction';
import Loader from '../Loader/Loader';
import Image from 'next/image';

interface CardProps {
  toOpen: (value: boolean) => void;
  forwardModalOpen: (value: boolean) => void;
  teamData: (value: any[]) => void;
  fwdindex: (value: number) => void;
  setUserMail: (value: any) => void;
  handleOpenFwdModal: (value: any) => void;
  query?: string;
}
const Card: React.FC<CardProps> = ({
  fwdindex,
  toOpen,
  forwardModalOpen,
  teamData,
  query,
  setUserMail,
  handleOpenFwdModal,
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [forwardModal, setForwardModal] = useState<boolean>(false);
  const [addFriend, setAddFriend] = useState(false);

  const [res, setRes] = useState<any>();

  const profileImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  useEffect(() => {
    if (query.length > 0) {
      res?.map((obj: any) => {
        let s = obj.fullName.toLocaleLowerCase();
        let q = query.toLocaleLowerCase();
        if (s.includes(q)) {
          setAddFriend(true);
        }
      });
    } else {
      setAddFriend(false);
    }
  }, [query]);

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
        const response = await sendRequest(`/team/user-teams?search=${query}`, {
          method: 'GET',
        });
        if (query.length > 0) {
          setRes(response?.data?.data?.teamMates);
        } else {
          setRes(response?.data?.data?.yourTeam?.teamMates);
        }
        teamData(response?.data?.data?.yourTeam?.teamMates);
      } catch (error) {
        toast.error('Something went worng');
      }
    };
    debounce(fetchData(), 200);
  }, [query]);

  if (!res) {
    <>No data</>;
  }
  return (
    <div>
      {res && (
        <div className={styles.cardContainer}>
          <div className={`${styles.reviewsContainer} ${addFriend && styles.addFriendContainer}`}>
            {res?.map((elm: any, index: number) => {
              return addFriend ? (
                <div className={`${styles.reviewCard} ${styles.borderNone}`}>
                  <div className={styles.reviews}>
                    <img
                      src={elm.profilePic ? elm.profilePic : profileImg}
                      alt="user photo"
                      className={styles.profile}
                    />
                    <div className={styles.reviewer}>
                      <div className={styles.name}>
                        <h2>{elm.fullName}</h2>
                      </div>
                      <p>{elm.email}</p>
                    </div>
                  </div>
                  <button
                    className={styles['addFriendBtn']}
                    onClick={() => {
                      openForwardModal(index);
                    }}
                  >
                    Add Friend
                  </button>
                </div>
              ) : (
                <div className={styles.reviewCard}>
                  <div className={styles.reviews}>
                    <img
                      src={elm.profilePic ? elm.profilePic : profileImg}
                      alt="user photo"
                      className={styles.profile}
                    />
                    <div className={styles.reviewer}>
                      <div className={styles.name}>
                        <h2>{elm.fullName}</h2>
                        <span className={styles.greenCircle}></span>
                      </div>
                      <p>{elm.email}</p>
                    </div>
                  </div>
                  <span
                    className={styles['deleteBtn']}
                    onClick={() => {
                      handleOpenModal(index);
                      setUserMail(elm.email);
                    }}
                  >
                    x
                  </span>
                </div>
              );
            })}
          </div>
          {res.length == 0 ? (
            <div className={styles.noDataCard}>
              <Image
                width={200}
                height={400}
                src="/assests/lamp.svg"
                alt="banner"
                // className={styles.cardbannerimg}
              />
              <strong>SORRY!</strong>
              <h2>We couldn’t find your friend. Send invite your friend by email</h2>
              <button className={styles.sendMailBtn} onClick={handleOpenFwdModal}>
                SEND INVITE BY EMAIL
              </button>
            </div>
          ) : (
            <div className={styles.bannerContainer}>
              <Image
                width={200}
                height={400}
                src="/assests/friendside.svg"
                alt="banner"
                className={styles.cardbannerimg}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
