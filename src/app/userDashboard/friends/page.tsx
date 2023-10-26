'use client';
import React, { useState } from 'react';
import styles from '@/styles/friends.module.scss';
import { sendRequest } from '@/utils/axiosInstanse';
import Image from 'next/image';
import Card, { UserTeamMember } from '@/Components/CommonComponent/Card/Card';
import withAuth from '@/Components/HOC/WithAuthHoc';
import { toast } from 'react-toastify';
import { decodeJWt } from '@/utils/globalfunctions';

const Friend = () => {
  const [open, setOpen] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [, setTeamData] = useState<UserTeamMember[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [, setFwdId] = useState<number>();
  const [query, setQuery] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');
  const [newTeamName, setNewTeamName] = useState<string>('');
  const token = localStorage.getItem('jwtToken');
  const { teamName } = decodeJWt(token);

  const handleModal = (value: boolean) => {
    setOpen(value);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCloseForwardModal = () => {
    setForwardModal(false);
  };

  const handleTeamData = (value: UserTeamMember[]) => {
    setTeamData(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setEmailList([...emailList, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleForwardIndex = (value: number) => {
    setFwdId(value);
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
        teamName: teamName || newTeamName,
        emails: emailList,
      };
      const response = await sendRequest('/user/send-invite', {
        method: 'POST',
        data: userData,
      });

      if (response.data.code) {
        setMessage('Friends added Successfully');
        setEmailList([]);
        setForwardModal(false);
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setEmailList([]);
      setMessage(error.response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const handleDeleteEmail = (indexToDelete: number) => {
    const updatedEmailList = emailList.filter((_, index) => index !== indexToDelete);
    setEmailList(updatedEmailList);
  };

  const handleSelect = () => {};

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleTeamName = ({ target }) => {
    setNewTeamName(target.value);
  };

  return (
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
              <Image
                src="/assests/search.svg"
                alt="search"
                height={20}
                width={20}
                className={styles.searchIcon}
              />
            </div>
            <div className={styles.btnContainer}>
              <div>
                <button className={styles.sendMailBtn} onClick={handleOpenFwdModal}>
                  SEND INVITE BY EMAIL
                </button>
              </div>
            </div>
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
              <Image
                src="/assests/icons/downarrow.svg"
                alt="arrow"
                height={12}
                width={12}
                className={styles.arrowicon}
              />
              <select className={styles.select} defaultValue={'Sort By'} onChange={handleSelect}>
                <option className={styles.sortByOption}>Sort By</option>
                <option value="active">Active first</option>
                <option value="inactive">Inactive first</option>
                <option value="atoz">A to Z</option>
                <option value="ztoa">Z to A</option>
              </select>
            </div>
          </div>

          <div className={styles.card}>
            <Card
              fwdindex={handleForwardIndex}
              toOpen={handleModal}
              forwardModalOpen={handleForwardModal}
              teamData={handleTeamData}
              query={query}
              setUserMail={setUserMail}
              handleOpenFwdModal={handleOpenFwdModal}
            />
          </div>
        </div>
        <div className={styles.pagination}>{/* <CustomPagination data={teamData} /> */}</div>
      </div>
      {/* deleteModal here */}
      {open ? (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <div className={styles.deleteModalHeader}>
              <div className={styles.titleCloseBtn}>
                <Image
                  src="/assests/delcancel.svg"
                  alt="delete"
                  height={100}
                  width={100}
                  onClick={handleCloseModal}
                />
              </div>
              <div className={styles.title}>
                <h1>Delete</h1>
              </div>
            </div>
            <div className={styles.body}>
              <p>Are you sure want to delete this?</p>
            </div>
            <div className={styles.footer}>
              <button className={styles.deletebtn} onClick={handleDeleteUser}>
                Delete
              </button>
              <button className={styles.cancelbtn} onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* forwarding modal here */}
      {forwardModal ? (
        <div className={styles.modalBackground}>
          <div className={styles.forwardmodalContainer}>
            <div className={styles.forwardModaltitle}>
              <h1> {`<`} Invite your friends</h1>
            </div>
            <div className={styles.forwardModalbody}>
              {!teamName && (
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
                  value={inputValue}
                  placeholder="Enter email press enter and send invitation"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
              </label>
              {emailList.length > 0 &&
                emailList.map((email, index) => {
                  const truncatedEmail = email.length > 15 ? email.substring(0, 15) + '...' : email;
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
      ) : (
        ''
      )}
    </div>
  );
};

export default withAuth(Friend);
