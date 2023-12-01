'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/friends.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
import Image from 'next/image';
import Card, { UserTeamMember } from '@/Components/CommonComponent/Card/Card';
import { toast } from 'react-toastify';
import { decodeJWt, getTokenFromLS } from '@/utils/globalfunctions';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';
import DeleteModal from '@/Components/CommonComponent/DeleteModal/DeleteModal';
import { FaCaretDown } from 'react-icons/fa';
import CustomSelect from '@/Components/CommonComponent/CustomSelect';

const options = [
  { name: 'Active', value: 'active' },
  { name: 'Inactive', value: 'inactive' },
  { name: 'A to Z', value: 'atoz' },
  { name: 'Z to A', value: 'ztoa' },
];

const Friend = () => {
  const [open, setOpen] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [addFriendList, setAddFriendList] = useState<UserTeamMember[]>([]);

  // console.log('check mail', userMail);
  const token: string | undefined | null = getTokenFromLS();
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
      const userData = {
        teamName: decodedToken.teamName || newTeamName,
        emails: emailList,
      };
      const response = await sendRequest('/user/send-invite', {
        method: 'POST',
        data: userData,
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

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleTeamName = ({ target }) => {
    setNewTeamName(target.value);
  };

  async function handleGlobalSearch() {
    try {
      const response = await sendRequest(`/user/getalluser?search=${query}`, {
        method: 'GET',
      });
      if (query && query.length > 0) {
        setAddFriendList(response?.data?.data);
      }
    } catch (error) {
      toast.error(`User not found with this name ${query}`);
    }
  }

  useEffect(() => {
    if (query.length == 0 || !query) {
      setAddFriendList([]);
    }
  }, [query]);

  return (
    <IsAuthenticatedHoc>
      <div className={styles.friendsParentContainder}>
        <div className={styles.main_container}>
          <div className={styles.sub_container}>
            <div className={styles.header}>
              <h2>Invite your friends</h2>
              <span>Dashboard /invite your friends</span>
            </div>
            <div className={styles.searchBar}>
              <div className={styles.inputContainer}>
                <input
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Search by username"
                  onChange={handleSearch}
                />
                {!query && (
                  <Image
                    src="/assests/search.svg"
                    alt="search"
                    height={20}
                    width={20}
                    className={styles.searchIcon}
                  />
                )}
              </div>
              <button
                className={`${styles.btnPrime} ${styles.searchBtn}`}
                onClick={handleGlobalSearch}
              >
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

                <CustomSelect options={options} handleSelect={handleSelect} />

                <div className={styles.downIcon}>
                  <FaCaretDown color={'#ff7a00'} />
                </div>
              </div>
            </div>

            <Card
              addFriendList={addFriendList}
              toOpen={handleModal}
              forwardModalOpen={handleForwardModal}
              query={query}
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

        {/* forwarding modal here */}
        {forwardModal && (
          <div className={styles.modalBackground}>
            <div className={styles.forwardmodalContainer}>
              <div className={styles.forwardModaltitle}>
                <h1> {`<`} Invite your friends</h1>
              </div>
              <div className={styles.forwardModalbody}>
                {!decodedToken.teamName && (
                  <label>
                    Enter you team name
                    <input
                      type="text"
                      value={newTeamName}
                      placeholder="Enter TeamName"
                      onChange={handleTeamName}
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
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />
                </label>
                {emailList.length > 0 &&
                  emailList.map((email, index) => {
                    const truncatedEmail =
                      email.length > 15 ? email.substring(0, 15) + '...' : email;
                    return (
                      <div key={index} className={styles.inputemail_container}>
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
                <button onClick={handleCloseForwardModal} className={styles.cancelbtn}>
                  Cancel
                </button>
                <button className={styles.sendbtn} onClick={sendInviteByEmail}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </IsAuthenticatedHoc>
  );
};

export default Friend;
