'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/card.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import { debounce } from '@/utils/commonFunction';
import Image from 'next/image';

export interface UserTeamMember {
  email: string;
  fullName: string;
  _id: string;
  profilePic?: string;
  userName?: string;
}
interface CardProps {
  toOpen: (value: boolean) => void;
  forwardModalOpen: (value: boolean) => void;
  teamData: (value: UserTeamMember[]) => void;
  setUserMail: (value: string) => void;
  handleOpenFwdModal: () => void;
  query?: string;
  addFriendList: UserTeamMember[];
}

const Card: React.FC<CardProps> = ({
  toOpen,
  forwardModalOpen,
  teamData,
  query,
  setUserMail,
  handleOpenFwdModal,
  addFriendList,
}) => {
  const [friends, setFriends] = useState<UserTeamMember[] | null>(null);
  console.log('check Friend', friends);
  console.log(' Friend List', addFriendList);

  const profileImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  async function fetchData() {
    try {
      const response = await sendRequest(`/team/user-teams?search=${query}`, {
        method: 'GET',
      });
      if (query && query.length > 0) {
        setFriends(response?.data?.data?.teamMates);
      } else {
        setFriends(response?.data?.data?.yourTeam?.teamMates);
      }
      teamData(response?.data?.data?.yourTeam?.teamMates);
    } catch (error) {
      toast.error('Something went worng');
    }
  }

  useEffect(() => {
    debounce(fetchData(), 500);
  }, [query]);

  if (!friends) {
    <div>No Friend Added Add By Invitation</div>;
  }
  return (
    <div>
      <div className={styles.cardContainer}>
        <div
          className={`${styles.reviewsContainer} ${
            addFriendList.length && styles.addFriendContainer
          }`}
        >
          {addFriendList?.length
            ? addFriendList?.map((elm: UserTeamMember) => {
                return (
                  elm && (
                    <div key={elm.email} className={`${styles.reviewCard} ${styles.addFriendCard}`}>
                      <div className={styles.reviews}>
                        <img
                          src={elm?.profilePic ? elm?.profilePic : profileImg}
                          alt="user photo"
                          className={styles.profile}
                        />
                        <div className={styles.reviewer}>
                          <div className={styles.name}>
                            <h2>{elm?.fullName}</h2>
                          </div>
                          <p>{elm?.email}</p>
                        </div>
                      </div>
                      <button
                        className={styles['addFriendBtn']}
                        onClick={() => forwardModalOpen(true)}
                      >
                        Add Friend
                      </button>
                    </div>
                  )
                );
              })
            : friends?.map((elm: UserTeamMember) => {
                return (
                  elm && (
                    <div className={styles.reviewCard}>
                      <div className={styles.reviews}>
                        <img
                          src={elm?.profilePic ? elm?.profilePic : profileImg}
                          alt="user photo"
                          className={styles.profile}
                        />
                        <div className={styles.reviewer}>
                          <div className={styles.name}>
                            <h2>{elm?.fullName}</h2>
                            <span className={styles.greenCircle}></span>
                          </div>
                          <p>{elm?.email}</p>
                        </div>
                      </div>
                      <span
                        className={styles['deleteBtn']}
                        onClick={() => {
                          toOpen(true);
                          setUserMail(elm?.email);
                        }}
                      >
                        x
                      </span>
                    </div>
                  )
                );
              })}
        </div>
        <NotFoundCard
          addFriendList={addFriendList}
          friends={friends}
          handleOpenFwdModal={handleOpenFwdModal}
        />
      </div>
    </div>
  );
};

export default Card;

export const NotFoundCard = ({ friends, handleOpenFwdModal, addFriendList }) => {
  return (
    <div>
      {addFriendList.lenght == 0 && friends?.length == 0 ? (
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
  );
};
