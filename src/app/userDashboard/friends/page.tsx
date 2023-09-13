'use client';
import React, { useState } from 'react';
import styles from '@/styles/friends.module.scss';
Navbar
import { sendRequest } from '@/utils/axiosInstanse';
import Image from 'next/image';
import Card from '@/Components/CommonComponent/Card/Card';
import { Navbar } from '@/Components/CommonComponent/Navbar/Navbar';
import CustomPagination from '@/Components/CommonComponent/Pagination/Pagination';

const Friend = () => {
  const [open, setOpen] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [fwdId, setFwdId] = useState<any>();

  const handleModal = (value: boolean) => {
    setOpen(value);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleCloseForwardModal = () => {
    setForwardModal(false);
  };
  const handleTeamData = (value: any) => {
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
  const handleForwardIndex = (value: any) => {
    setFwdId(value);
  };
  const handleOpenFwdModal = () => {
    setForwardModal(true);
  };
  const handleForwardModal = (value: boolean) => {
    setForwardModal(value);
  };
  const handleDelete = async () => {
    try {
      const data = teamData[fwdId];
      const id = data.id;
      const accessToken = localStorage.getItem('jwttoken');
      const response = await sendRequest(`/team/deleteteam/${id}`, {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.code === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // send email
  // const sendEmail = async () => {
  //   console.log(teamData[fwdId]);
  //   try {
  //     const data = teamData[fwdId];
  //     const userData = {
  //       leadPlayer: data.leadPlayer,
  //       id: data.uuid,
  //       emails: emailList,
  //     };
  //     console.log(userData);

  //     const accessToken = localStorage.getItem('jwttoken');
  //     const response = await sendRequest('/api/v1/team/addteam', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: userData,
  //     });
  //     if (response.data.code === 200) {
  //       setMessage(response.data.message)
  //       setEmailList([]);
  //       toast(response.data.message, {
  //         position: 'top-center',
  //       });
  //       setTimeout(() => {
  //         window.location.reload()
  //       }, 2000);
  //     }
  //         } catch (error: any) {
  //     setEmailList([]);
  //     setMessage(error.response.data.message)
  //     toast.error(error.response.data.message, {
  //       position: 'top-center',
  //     });
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 2000);
  //   }
  // };
  const sendInviteByEmail = async () => {
    try {
      setForwardModal(true);
      const userData = {
        emails: emailList,
      };

      const accessToken = localStorage.getItem('jwttoken');
      const response = await sendRequest('/team/send-invite', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: userData,
      });

      if (response.data.code) {
        setMessage('Friends added Successfully');
        setEmailList([]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
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
  return (
    <>
      <div className={styles.main_container}>
        <div>
          <Navbar />
        </div>
        <div className={styles.sub_container}>
          <div className={styles.header}>
            <h2>Invite your friends</h2>
            <span>Dashboard /invite your friends</span>
          </div>
          <div className={styles.inputContainer}>
            <input type="search" id="search" name="search" placeholder="Search by Name" />

            <Image
              src="/assests/search.svg"
              alt="search"
              height={20}
              width={20}
              className={styles.searchIcon}
            />
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.selectContainer}>
              <Image
                src="/assests/sort.svg"
                alt="sort"
                height={10}
                width={10}
                className={styles.sortIcon}
              />
              <Image
                src="/assests/downarrow.svg"
                alt="arrow"
                height={20}
                width={20}
                className={styles.arrowicon}
              />
              <select className={styles.select}>
                <option className={styles.sortByOption}> Sort By</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div>
              <button className={styles.sendMailBtn} onClick={handleOpenFwdModal}>
                SEND INVITE BY EMAIL
              </button>
            </div>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <Card
              fwdindex={handleForwardIndex}
              toOpen={handleModal}
              forwardModalOpen={handleForwardModal}
              teamData={handleTeamData}
            />
          </div>
          <div className={styles.bannerContainer}>
            <Image
              src="/assests/friendsherobanner.svg"
              alt="banner"
              className={styles.cardbannerimg}
              height={100}
              width={100}
            />
          </div>
        </div>
        <div className={styles.pagination}>
          <CustomPagination data={teamData} />
        </div>
      </div>
      {/* deleteModal here */}
      {open ? (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
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
            <div className={styles.body}>
              <p>Are you sure want to delete this?</p>
            </div>
            <div className={styles.footer}>
              <button className={styles.deletebtn} onClick={handleDelete}>
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
              <input
                type="search"
                id="search"
                name="search"
                value={inputValue}
                placeholder="Enter email press enter and send invitation"
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
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
    </>
  );
};

export default Friend;
