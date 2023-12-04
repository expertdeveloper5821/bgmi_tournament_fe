'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/friends.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
import Image from 'next/image';
import CardConatiner from '@/Components/CommonComponent/Card/Card';
import { toast } from 'react-toastify';
import { decodeJWt, getTokenFromLS } from '@/utils/globalfunctions';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import { FaCaretDown } from 'react-icons/fa';
import CustomSelect from '@/Components/CommonComponent/CustomSelect';
import InvitationModal from '@/Components/userDashboard/invitationModal';
import Breadcrumb from '@/Components/CommonComponent/Breadcrumb';
import { debounce } from '@/utils/commonFunction';
import { optionsFriendFilter } from '@/utils/constant';
import { UserTeamMemberType } from '@/types/usersTypes';

const Friend = () => {
  const [open, setOpen] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [addFriendList, setAddFriendList] = useState<UserTeamMemberType[]>([]);
  const [friends, setFriends] = useState<UserTeamMemberType[]>([]);

  // console.log('check mail', userMail);
  const token = getTokenFromLS();
  let decodedToken;
  if (token) {
    decodedToken = decodeJWt(token);
  }

  const handleModal = (value: boolean) => {
    setOpen(value);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCloseForwardModal = () => {
    setForwardModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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

  const handleOpenFwdModal = () => {
    setForwardModal(true);
  };

  const handleForwardModal = (value: boolean) => {
    setForwardModal(value);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await sendRequest(`/team/remove-team-mate`, {
        method: 'DELETE',
        data: {
          teammateEmail: userMail,
        },
      });
      toast.success(response.data.message);
      setOpen(false);
    } catch (error) {
      toast.error('Something went worng');
    }
  };

  const sendInviteByEmail = async () => {
    try {
      setForwardModal(true);
      const payload = {
        teamName: decodedToken.teamName || newTeamName,
        emails: emailList,
      };
      const response = await sendRequest('/user/send-invite', {
        method: 'POST',
        data: payload,
      });

      if (response.status === 200) {
        setMessage('Friends added Successfully');
        setEmailList([]);
        setForwardModal(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      setEmailList([]);
      setMessage(error.response.data.message);
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
      try {
        const response = await sendRequest(`/user/getalluser?search=${query}`, {
          method: 'GET',
        });
        if (response?.data) {
          setAddFriendList(response?.data?.data);
        }
      } catch (error) {
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
    try {
      const response = await sendRequest(`/team/user-teams?search=${query}`, {
        method: 'GET',
      });
      if (query && query.length > 0) {
        setFriends(response?.data?.data?.teamMates);
      } else {
        setFriends(response?.data?.data?.yourTeam?.teamMates);
      }
    } catch (error) {
      toast.error('Something went worng');
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
              <Breadcrumb />
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
                onClick={handleOpenFwdModal}
              >
                SEND INVITE BY EMAIL
              </button>
            </div>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.filterTab}>
              <h2>Your friend list</h2>
              <div className={styles.selectContainer}>
                <Image
                  src="/assests/sort.svg"
                  alt="sort"
                  height={22}
                  width={22}
                  className={styles.sortIcon}
                />

                <CustomSelect options={optionsFriendFilter} handleSelect={handleSelect} />

                <div className={styles.downIcon}>
                  <FaCaretDown color={'#ff7a00'} />
                </div>
              </div>
            </div>

            <CardConatiner
              friends={friends}
              addFriendList={addFriendList}
              toOpen={handleModal}
              forwardModalOpen={handleForwardModal}
              setUserMail={setUserMail}
              handleOpenFwdModal={handleOpenFwdModal}
            />
          </div>
          <div className={styles.pagination}>{/* <CustomPagination data={teamData} /> */}</div>
        </div>

        {/* deleteModal here */}
        {open && (
          <DeleteModal handleDeleteUser={handleDeleteUser} handleCloseModal={handleCloseModal} />
        )}

        {/* Invitation modal here */}
        {forwardModal && (
          <InvitationModal
            decodedToken={decodedToken}
            newTeamName={newTeamName}
            setNewTeamName={setNewTeamName}
            inputValue={inputValue}
            userMail={userMail}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            emailList={emailList}
            handleDeleteEmail={handleDeleteEmail}
            handleCloseForwardModal={handleCloseForwardModal}
            sendInviteByEmail={sendInviteByEmail}
            message={message}
          />
        )}
      </div>
    </IsAuthenticatedHoc>
  );
};

export default Friend;
