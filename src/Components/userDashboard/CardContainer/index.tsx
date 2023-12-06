'use client';
import React from 'react';
import styles from '@/styles/card.module.scss';
import Image from 'next/image';
import { UserTeamMemberType } from '@/types/usersTypes';
import { NotFoundCard } from './NotFoundCard';
import { AddFriendCard } from './AddFriendCard';
import { FriendsCard } from './FriendsCard';
import LoaderSm from '@/Components/CommonComponent/LoaderSm';

interface CardProps {
  setOpen: (value: boolean) => void;
  forwardModalOpen: (value: boolean) => void;
  setUserMail: (value: string) => void;
  handleOpenInviteModal: () => void;
  friends?: UserTeamMemberType[];
  addFriendList: UserTeamMemberType[];
  isLoading: boolean;
}

const CardContainer: React.FC<CardProps> = ({
  setOpen,
  friends,
  addFriendList,
  forwardModalOpen,
  setUserMail,
  handleOpenInviteModal,
  isLoading,
}) => {
  if (isLoading) {
    return <LoaderSm />;
  }
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
                {addFriendList?.length > 0
                  ? addFriendList?.map(
                      (user: UserTeamMemberType) =>
                        user && (
                          <AddFriendCard
                            key={user.email}
                            setUserMail={setUserMail}
                            forwardModalOpen={forwardModalOpen}
                            user={user}
                          />
                        ),
                    )
                  : friends?.length && friends?.length > 0
                  ? friends?.map(
                      (user: UserTeamMemberType) =>
                        user && (
                          <FriendsCard
                            key={user.email}
                            user={user}
                            setOpen={setOpen}
                            setUserMail={setUserMail}
                          />
                        ),
                    )
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
            <NotFoundCard handleOpenInviteModal={handleOpenInviteModal} />
          )}
        </div>
      ) : (
        <NotFoundCard handleOpenInviteModal={handleOpenInviteModal} />
      )}
    </>
  );
};

export default CardContainer;
