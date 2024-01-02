'use client';
import React from 'react';
import styles from '@/styles/friends.module.scss';
import Image from 'next/image';
import { decodeJWt, getTokenFromLS } from '@/utils/globalfunctions';

const InviteModal = ({
  newTeamName,
  setNewTeamName,
  inputValue,
  userMail,
  setInputValue,
  handleKeyPress,
  emailList,
  handleDeleteEmail,
  setInvitationModal,
  sendInviteByEmail,
  message,
  isLoading,
}) => {
  const token = getTokenFromLS();
  let decodedToken;
  if (token) {
    decodedToken = decodeJWt(token);
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.forwardmodalContainer}>
        <div className={styles.forwardModaltitle}>
          <h1> Invite your friends</h1>
        </div>
        <div className={styles.forwardModalbody}>
          {!decodedToken.teamName && (
            <label>
              Enter you team name
              <input
                type="text"
                value={newTeamName}
                placeholder="Enter TeamName"
                onChange={({ target }) => setNewTeamName(target.value)}
                className={styles.teamName}
              />
            </label>
          )}
          <label>
            Enter your friends email
            <input
              type="search"
              id="search"
              name="search"
              value={inputValue || userMail}
              placeholder="Enter email press enter and send invitation"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(event.target.value)
              }
              onKeyDown={handleKeyPress}
            />
          </label>
          {emailList.length > 0 &&
            emailList.map((email: string, index: number) => {
              const truncatedEmail = email.length > 15 ? email.substring(0, 15) + '...' : email;
              return (
                <div key={email} className={styles.inputemail_container}>
                  <div className={styles.inputemail}>
                    {truncatedEmail}
                    <Image
                      src="/assests/orangecross.svg"
                      alt="search"
                      height={10}
                      width={10}
                      className={styles.cancelsvg}
                      onClick={() => handleDeleteEmail(index)}
                    />
                  </div>
                </div>
              );
            })}
          <div className={styles.resMsg}>{message}</div>
        </div>
        <div className={styles.forwardcheckbox}>
          <input type="checkbox" />
          <span>Notify Please</span>
        </div>
        <div className={styles.forwardModalfooter}>
          <button onClick={() => setInvitationModal(false)} className={styles.cancelbtn}>
            Cancel
          </button>
          <button
            disabled={emailList.length || !isLoading ? false : true}
            className={styles.sendbtn}
            onClick={sendInviteByEmail}
          >
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
