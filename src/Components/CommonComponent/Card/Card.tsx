'use client';
import React from 'react';
import styles from '@/styles/card.module.scss';
import Image from 'next/image';
import { userProfileImg } from '@/utils/constant';
import { UserTeamMemberType } from '@/types/usersTypes';

interface CardProps {
  toOpen: (value: boolean) => void;
  forwardModalOpen: (value: boolean) => void;
  setUserMail: (value: string) => void;
  handleOpenFwdModal: () => void;
  friends?: UserTeamMemberType[];
  addFriendList: UserTeamMemberType[];
}

const CardConatiner: React.FC<CardProps> = ({
  toOpen,
  friends,
  addFriendList,
  forwardModalOpen,
  setUserMail,
  handleOpenFwdModal,
}) => {
  return (
    <>
      {friends || addFriendList ? (
        <div className={styles.cardContainer}>
          {(friends && friends?.length > 0) || addFriendList?.length > 0 ? (
            <>
              <div
                className={`${styles.reviewsContainer} ${
                  addFriendList.length && styles.addFriendContainer
                }`}
              >
                {addFriendList?.length
                  ? addFriendList?.map((elm: UserTeamMemberType) => {
                      return (
                        elm && (
                          <div
                            key={elm.email}
                            className={`${styles.reviewCard} ${styles.addFriendCard}`}
                          >
                            <div className={styles.reviews}>
                              <img
                                src={elm?.profilePic ? elm?.profilePic : userProfileImg}
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
                              onClick={() => {
                                setUserMail(elm?.email);
                                forwardModalOpen(true);
                              }}
                            >
                              Add Friend
                            </button>
                          </div>
                        )
                      );
                    })
                  : friends?.length
                  ? friends?.map((elm: UserTeamMemberType) => {
                      return (
                        elm && (
                          <div className={styles.reviewCard}>
                            <div className={styles.reviews}>
                              <img
                                src={elm?.profilePic ? elm?.profilePic : userProfileImg}
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
                    })
                  : ''}
              </div>
              <div className={styles.bannerContainer}>
                <Image
                  width={200}
                  height={400}
                  src="/assests/friendsherobanner.svg"
                  alt="banner"
                  className={styles.cardbannerimg}
                />
              </div>
            </>
          ) : (
            <NotFoundCard handleOpenFwdModal={handleOpenFwdModal} />
          )}
        </div>
      ) : (
        <NotFoundCard handleOpenFwdModal={handleOpenFwdModal} />
      )}
    </>
  );
};

export default CardConatiner;

export const NotFoundCard = ({ handleOpenFwdModal }) => {
  return (
    <div className={styles.noDataCard}>
      <Image width={200} height={400} src="/assests/lamp.svg" alt="banner" />
      <div className={styles.sorryTag}>
        <strong>SORRY!</strong>
      </div>
      <h2>
        We couldn’t find your friend. Send <br /> invite your friend by email
      </h2>
      <button className={styles.sendMailBtn} onClick={handleOpenFwdModal}>
        SEND INVITE BY EMAIL
      </button>
    </div>
  );
};
