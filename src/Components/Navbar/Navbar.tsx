'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.scss';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { Avatar, Popover } from 'technogetic-iron-smart-ui';
import Image from 'next/image';

import jwtDecode from 'jwt-decode';
import { DecodedTokenType } from '@/types/decodedTokenType';
import { useUserContext } from '@/utils/contextProvider';

export function Navbar() {
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<string>('');
  const [nameData, setNameData] = useState<string>('');
  const [initialsName, setInitialsName] = useState<string>('');
  const [pofile, setPofile] = useState<string | undefined | null>(null);
  const { triggerHandleLogout } = useUserContext();

  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('expirationTime');
    triggerHandleLogout();
    router.push('/auth/login');
  };

  const getAlldata = async () => {
    const userData: DecodedTokenType = jwtDecode(localStorage.getItem('jwtToken')!);
    const { email, fullName, profilePic } = userData;
    setUserData(email);
    setNameData(fullName);
    let initials = '';
    fullName?.split(' ')?.forEach((initial) => {
      if (initials.length > 0) {
        initials = `${initials} ${initial.charAt(0).toUpperCase()}`;
      } else {
        initials = initial.charAt(0).toUpperCase();
      }
    });
    setInitialsName(initials);
    setPofile(profilePic);
  };

  useEffect(() => {
    getAlldata();
  }, []);
  return (
    <header>
      <nav className={styles.container}>
        <div className={styles.navbarbrand}>
          <h1 className={styles.page_title}>
            Welcome <span className={styles.fullname_title}>{nameData}</span>
          </h1>
        </div>
        <ul className={styles.navbarnav}>
          <li className={styles.navitem}>
            <Popover
              className={styles.popover_show}
              isOpen={isPopOpen}
              setIsOpen={setIsPopOpen}
              content={
                <div className={styles.myprofilesection}>
                  <div className={styles.userdetails}>
                    <p className={styles.dropdownprofileimage}>{initialsName}</p>
                    <div className={styles.username_details}>
                      <h1 className={styles.user_name_heading}>{nameData}</h1>
                      <span className={styles.gmail}>{userData}</span>
                    </div>
                  </div>
                  <div className={styles.logoutbutton}>
                    <div className={styles.inner_logout} onClick={handleLogout}>
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
              {pofile ? (
                <Avatar src={pofile} onClick={() => setIsPopOpen(!isPopOpen)} />
              ) : (
                <p className={styles.navprofile} onClick={() => setIsPopOpen(!isPopOpen)}>
                  {initialsName}
                </p>
              )}
            </Popover>
          </li>
        </ul>
      </nav>
    </header>
  );
}
