'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/friends.module.scss';
import Image from 'next/image';
import CardConatiner from '@/Components/userDashboard/CardContainer';
import { toast } from 'react-toastify';
import { decodeJWt, getTokenFromLS } from '@/utils/globalfunctions';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import CustomSelect from '@/Components/CommonComponent/CustomSelect';
import InviteModal from '@/Components/userDashboard/InviteModal';
import { debounce } from '@/utils/commonFunction';
import { optionsFriendFilter } from '@/utils/constant';
import { UserTeamMemberType } from '@/types/usersTypes';
import {
  deleteFriendService,
  fetchFriendsService,
  globalSearchService,
  sendEmailInviteService,
} from '@/services/userDashboardServices';

const Friend = () => {
  const [open, setOpen] = useState(false);
  const [invitationModal, setInvitationModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [addFriendList, setAddFriendList] = useState<UserTeamMemberType[]>([]);
  const [friends, setFriends] = useState<UserTeamMemberType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const token = getTokenFromLS();
  let decodedToken;
  if (token) {
    decodedToken = decodeJWt(token);
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setEmailList([...emailList, inputValue.trim()]);
      setInputValue('');
      setUserMail('');
    }
    if (event.key === 'Enter' && userMail) {
      setEmailList([...emailList, userMail.trim()]);
      setUserMail('');
    }
  };

  const handleForwardModal = (value: boolean) => {
    setInvitationModal(value);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteFriendService(userMail);
      toast.success(response.data.message);
      setOpen(false);
    } catch (error) {
      toast.error('Something went worng');
    }
  };

  const sendInviteByEmail = async () => {
    if (emailList.length > 0) {
      const payload = {
        teamName: decodedToken.teamName || newTeamName,
        emails: emailList,
      };
      try {
        setLoading(true);
        const response = await sendEmailInviteService(payload);
        setMessage('Friends added Successfully');
        setEmailList([]);
        setLoading(false);
        setInvitationModal(false);
        toast.success(response.data.message);
      } catch (error) {
        setEmailList([]);
        setLoading(false);
        setInvitationModal(false);
        toast.error(error.response.data.message);
        setMessage(error.response.data.message);
      }
    }
  };

  const handleDeleteEmail = (indexToDelete: number) => {
    const updatedEmailList = emailList.filter((_, index) => index !== indexToDelete);
    setEmailList(updatedEmailList);
  };

  const handleSelect = (value) => {
    console.log(value);
  };

  async function handleGlobalSearch() {
    if (query && query.length > 0) {
      setLoading(true);
      try {
        const response = await globalSearchService(query);
        if (response?.data) {
          setAddFriendList(response?.data?.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(`User not found with this name ${query}`);
      }
    }
  }

  let cachedResponse;
  function makeAPIRequest() {
    let previousQuery;
    const response = handleGlobalSearch();
    if (query === previousQuery) {
      return cachedResponse;
    } else {
      previousQuery = query;
      cachedResponse = response;
      return response;
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetchFriendsService(query);
      if (query && query.length > 0) {
        const team = await response?.data?.data?.teamMates;
        setLoading(false);
        if (team[0] != null) {
          setFriends(team);
        }
      } else {
        const team = response?.data?.data?.yourTeam?.teamMates;
        setLoading(false);
        if (team[0] != null) {
          setFriends(team);
        }
      }
    } catch (error) {
      toast.error('Something went worng');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    if (query.length == 0 || !query) {
      setAddFriendList([]);
    }
  }, [query]);

  const debouncedOnChange = debounce(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setQuery(event.target.value);
    },
  );

  return (
    <IsAuthenticatedHoc>
      <div className={styles.friendsParentContainder}>
        <div className={styles.main_container}>
          <div className={styles.sub_container}>
            <div className={styles.header}>
              <h2>Invite your friends</h2>
            </div>
            <div className={styles.searchBar}>
              <div className={styles.inputContainer}>
                <input
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Search by username"
                  onChange={debouncedOnChange}
                />
                {!query && (
                  <span className={styles.searchIcon}>
                    <Image src="/assests/search.svg" alt="search" height={20} width={20} />
                  </span>
                )}
              </div>
              <button className={`${styles.btnPrime} ${styles.searchBtn}`} onClick={makeAPIRequest}>
                Search Global
              </button>
              <button
                className={`${styles.btnPrime} ${styles.sendMailBtn}`}
                onClick={() => setInvitationModal(true)}
              >
                SEND INVITE BY EMAIL
              </button>
            </div>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.filterTab}>
              <h2>Your friend list</h2>
              <CustomSelect options={optionsFriendFilter} handleSelect={handleSelect} />
            </div>

            <CardConatiner
              isLoading={isLoading}
              friends={friends}
              addFriendList={addFriendList}
              setOpen={setOpen}
              forwardModalOpen={handleForwardModal}
              setUserMail={setUserMail}
              handleOpenInviteModal={() => setInvitationModal(true)}
            />
          </div>
          <div className={styles.pagination}>{/* <CustomPagination data={teamData} /> */}</div>
        </div>

        {/* deleteModal here */}
        {open && (
          <DeleteModal handleDeleteUser={handleDeleteUser} handleCloseModal={handleCloseModal} />
        )}

        {/* Invitation modal here */}
        {invitationModal && (
          <InviteModal
            isLoading={isLoading}
            newTeamName={newTeamName}
            setNewTeamName={setNewTeamName}
            inputValue={inputValue}
            userMail={userMail}
            setInputValue={setInputValue}
            handleKeyPress={handleKeyPress}
            emailList={emailList}
            handleDeleteEmail={handleDeleteEmail}
            setInvitationModal={setInvitationModal}
            sendInviteByEmail={sendInviteByEmail}
            message={message}
          />
        )}
      </div>
    </IsAuthenticatedHoc>
  );
};

export default Friend;
