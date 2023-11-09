'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Navabar.module.scss';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { Avatar, Popover } from 'technogetic-iron-smart-ui';
import { decodeJWt } from '@/utils/globalfunctions';
import { useUserContext } from '@/utils/contextProvider';
import { toast } from 'react-toastify';

export function Navbar() {
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<string | undefined>('');
  const [nameData, setNameData] = useState<string | undefined>('');
  const [initialsName, setInitialsName] = useState<string>('');
  const [pofile, setPofile] = useState<string | undefined>('');
  const { triggerHandleLogout } = useUserContext();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('expirationTime');
      triggerHandleLogout();
      router.push('/auth/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAlldata = async () => {
    const userData = decodeJWt(localStorage.getItem('jwtToken')!);

    setUserData(userData?.email);
    setNameData(userData?.fullName);
    let initials = '';
    userData?.fullName?.split(' ')?.forEach((initial) => {
      if (initials.length > 0) {
        initials = `${initials} ${initial.charAt(0).toUpperCase()}`;
      } else {
        initials = initial.charAt(0).toUpperCase();
      }
    });
    setInitialsName(initials);
    setPofile(userData?.profilePic);
  };

  useEffect(() => {
    getAlldata();
  }, []);

  return (
    <header>
      <nav className={styles.container}>
        <div className={styles.navbarbrand}>
          {/* {nameData && (
            <h1 className={styles.page_title}>
              Welcome <span className={styles.fullname_title}>{nameData}</span>
            </h1>
          )} */}
        </div>
        <ul className={styles.navbarnav}>
          {/* <li className={styles.navitem}>
              <Popover
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                content={
                  <div>
                    <div className={styles.notification}>
                      Notification
                      <Image
                        className={styles.close}
                        src="../assests/cross.svg"
                        alt="close"
                        width={20}
                        height={20}
                        onClick={handleClosePopover}
                      />
                    </div>
                    <div className={styles.dropdown}>
                      <Avatar
                        onClick={() => { }}
                        size={20}
                        src="../assests/avatar.png"
                      />
                      <div className={styles.notify}>
                        John Doe added new task Create navbar with html/css
                        <div className={styles.time}>4 mins ago</div>
                      </div>
                    </div>
                    <div className={styles.dropdown}>
                      <Avatar
                        onClick={() => { }}
                        size={20}
                        src="../assests/avatar.png"
                      />
                      <div className={styles.notify}>
                        John Doe added new task Create navbar with html/css
                        <div className={styles.time}>4 mins ago</div>
                      </div>
                    </div>
                    <div className={styles.dropdown}>
                      <Avatar
                        onClick={() => { }}
                        size={20}
                        src="../assests/avatar.png"
                      />
                      <div className={styles.notify}>
                        John Doe added new task Create navbar with html/css
                        <div className={styles.time}>4 mins ago</div>
                      </div>
                    </div>
                    <div className={styles.allnotification}>
                      View all Notifications
                    </div>
                  </div>
                }
                placement="bottom"
                width="300px"
                height="350px"
              >
                <Image
                  className={styles.notification}
                  src="../assests/notification.svg"
                  alt="notification"
                  onClick={() => setIsOpen(true)}
                  width={20}
                  height={20}
                />
              </Popover>
            </li> */}
          <li className={styles.navitem}>
            {nameData && (
              <Popover
                className={styles.popover_show}
                isOpen={isPopOpen}
                setIsOpen={setIsPopOpen}
                content={
                  <div style={{ marginRight: '16px' }}>
                    <div className={styles.profileContainer}>
                      <h4 className={styles.profilename}>{nameData}</h4>
                      <p className={styles.profileEmail}>{userData}</p>
                      <button className={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                      </button>
                    </div>

                    {/* <div className={styles.profilesection}>
                      <div className={styles.flexcol}>
                        <Image
                          className={styles.profileicon}
                          src="../assests/profile.svg"
                          alt="profile"
                          width={20}
                          height={20}
                        />
                        <div className={styles.myprofile}>My Account</div>
                      </div>
                      <div className={styles.flexcol}>
                        <Image
                          className={styles.settingicon}
                          src="../assests/settings.svg"
                          alt="setting"
                          width={20}
                          height={20}
                        />
                        <div className={styles.myprofile}>Settings</div>
                      </div>
                      <div className={styles.flexcol}>
                        <img
                          className={styles.notification_icon}
                          src="../assests/notification.svg"
                          alt="notification"
                          width={20}
                          height={20}
                        />
                        <div className={styles.myprofile}>Notification</div>
                      </div>
                    </div> */}
                    {/* <div>
                      <div onClick={handleLogout}>
                        <Image
                          className={styles.logoutbuttonicon}
                          src="../assests/logouticon.svg"
                          alt="logouticon"
                          onClick={handleLogout}
                          width={20}
                          height={20}
                        />
                        Logout
                      </div>
                    </div> */}
                  </div>
                }
                height="238px"
                placement="bottom"
                width="224px"
              >
                {pofile ? (
                  <Avatar src={pofile} onClick={() => setIsPopOpen(!isPopOpen)} />
                ) : (
                  <p className={styles.navprofile} onClick={() => setIsPopOpen(!isPopOpen)}>
                    {initialsName}
                  </p>
                )}
              </Popover>
            )}
          </li>
          {/* <li className={styles.navitem}>
              <div className={styles.username_details}>
                <h1 className={styles.user_name_title}>{nameData}</h1>
              </div>
            </li> */}
        </ul>
      </nav>
    </header>
  );
}
