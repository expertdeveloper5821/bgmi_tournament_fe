'use client';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import styles from '../../styles/Navabar.module.scss';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { Avatar, Popover } from 'technogetic-iron-smart-ui';
import Image from 'next/image';
import { sendRequest } from '@/services/auth/auth_All_Api';

interface INavbar {
  setUserName?: Dispatch<SetStateAction<string>>
}

export function Navbar(props: INavbar) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [useData, setUseData] = useState<string>('');
  const [namData, setNamData] = useState<string>('');
  const [pofile, setPofile] = useState<string>('');

  const { setUserName = () => { } } = props;

  function handleClosePopover() {
    setIsOpen(false);
  }
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      setError('Logout failed');
    }
  };

  const userData = JSON.parse(localStorage.getItem('userData'));
  const getAlldata = async () => {

    setUseData(userData.email);
    setNamData(userData.fullName);
    setUserName(userData.fullName);
    setPofile(userData.profilePic);

  };

  useEffect(() => {
    getAlldata();
  }, []);

  return (
    <header>
        <nav className={styles.container}>
          <div className={styles.navbarbrand}>
            <h1 className={styles.page_title}>Welcome <span className={styles.fullname_title}>{userData.fullName}</span></h1>
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
              <Popover
              className={styles.popover_show}
                isOpen={isPopOpen}
                setIsOpen={setIsPopOpen}
                content={
                  <div className={styles.myprofilesection}>
                    <div className={styles.userdetails}>
                      <p className={styles.dropdownprofileimage}>{namData.charAt(0).toUpperCase()}</p>
                      <div className={styles.username_details}>
                        <h1 className={styles.user_name_heading}>{namData}</h1>
                        <span className={styles.gmail}>{useData}</span>
                      </div>
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
                    <div className={styles.logoutbutton}>
                      <div
                        className={styles.inner_logout}
                        onClick={handleLogout}
                      >
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
                    </div>
                  </div>
                }
                height="238px"
                placement="bottom"
                width="224px"
              >
                {pofile  ?   <Avatar src={pofile}  onClick={() => setIsPopOpen(!isPopOpen)}/> :   <p className={styles.navprofile} onClick={() => setIsPopOpen(!isPopOpen)}>{namData.charAt(0).toUpperCase()}</p>}
              
              
              </Popover>
            </li>
            {/* <li className={styles.navitem}>
              <div className={styles.username_details}>
                <h1 className={styles.user_name_title}>{namData}</h1>
              </div>
            </li> */}
          </ul>
        </nav>
    </header>
  );
}
