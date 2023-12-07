'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.scss';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

// @ts-ignore
import { Popover } from 'technogetic-iron-smart-ui';
import { decodeJWt } from '@/utils/globalfunctions';
import { useUserContext } from '@/utils/contextProvider';
import { toast } from 'react-toastify';
import { NavbarProps } from '@/types/navbarType';

let actualPathname;

export function Navbar({ notificationModalHandler }: NavbarProps) {
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<string | undefined>('');
  const [nameData, setNameData] = useState<string | undefined>('');
  const [initialsName, setInitialsName] = useState<string>('');
  const [, setProfile] = useState<string | undefined>('');
  const { triggerHandleLogout } = useUserContext();
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    actualPathname = pathname.split('/')[1];
  }, [pathname]);

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
    setProfile(userData?.profilePic);
  };

  useEffect(() => {
    getAlldata();
  }, []);

  return (
    <nav className={styles.container}>
      <div className={styles.navbarbrand}>
        {/* {nameData && (
            <h1 className={styles.page_title}>
              Welcome <span className={styles.fullname_title}>{nameData}</span>
            </h1>
          )} */}
      </div>
      <ul
        className={styles.listItems}
        style={{ justifyContent: actualPathname === 'userDashboard' ? 'space-around' : 'flex-end' }}
      >
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

        {actualPathname === 'userDashboard' && (
          <li className={styles.notificationIcon} onClick={notificationModalHandler}>
            <Image src={'/assests/bellIcon.svg'} alt="notification" width={28} height={28} />
            <span className={styles.notificationCount}>2</span>
          </li>
        )}

        <li className={styles.logoutModalToggleBtn}>
          {nameData && (
            <Popover
              className={styles.popover_show}
              isOpen={isPopOpen}
              setIsOpen={setIsPopOpen}
              content={
                <>
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
                </>
              }
              // height="238px"
              // placement="bottom"
              // width="224px"
            >
              {/* {profile ? (
                  <></>
                  // <Avatar src={profile} onClick={() => setIsPopOpen(!isPopOpen)} />
                ) : ( */}
              <p className={styles.navprofile} onClick={() => setIsPopOpen(!isPopOpen)}>
                {initialsName}
              </p>
              {/* )} */}
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
  );
}
