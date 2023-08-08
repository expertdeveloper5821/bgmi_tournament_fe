"use client"
import React, { useState } from "react";
import styles from "../../styles/Navabar.module.scss";
import { useRouter } from "next/navigation";
import sendRequest from "../../services/api/apiServices";
// @ts-ignore
import { Avatar, Popover } from "technogetic-iron-smart-ui";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleClosePopover() {
    setIsOpen(false);
  }
  const router = useRouter();

  //logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest("auth/logout", {
        method: "POST",
      });

      setIsLoading(false);

      if (response.status === 200) {
        localStorage.removeItem("jwtToken");
        router.push("/login");
      } else {
        setError("Logout failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Logout failed");
    }
  };

  return (
    <header>
      <div className={styles.maincontainer}>
        <nav className={styles.container}>
          <div className={styles.navbarbrand}>
          </div>
          <ul className={styles.navbarnav}>
            <li className={styles.navitem}>
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
                  src="../assests/notificationImg.svg"
                  alt="notification"
                  onClick={() => setIsOpen(true)}
                  width={20}
                  height={20}
                />
              </Popover>
            </li>
            <li className={styles.navitem}>
              <Avatar onClick={() => { }} src="./assests/avatar.png" size={20} />
            </li>
            <li className={styles.navitem}>
              <Popover
                isOpen={isPopOpen}
                setIsOpen={setIsPopOpen}
                content={
                  <div className={styles.myprofilesection}>
                    <div className={styles.userdetails}>
                      <Avatar
                        onClick={() => { }}
                        src="../assests/avatar.png"
                        size={25}
                      />
                      <div className={styles.username_details}>
                        <h1>Harry Verma</h1>
                        <span className={styles.gmail}>
                          harry@technogetic.com
                        </span>
                      </div>
                    </div>
                    <div className={styles.profilesection}>
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
                          src="../assests/settingicon.svg"
                          alt="setting"
                          width={20}
                          height={20}
                        />
                        <div className={styles.myprofile}>Settings</div>
                      </div>
                      <div className={styles.flexcol}>
                        <Image
                          className={styles.notification_icon}
                          src="../assests/notification.svg"
                          alt="notification"
                          width={20}
                          height={20}
                        />
                        <div className={styles.myprofile}>Notification</div>
                      </div>
                    </div>
                    <div className={styles.logoutbutton}>
                      <div>
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
                <Image
                  className={styles.dropdown}
                  src="../assests/dropdown.svg"
                  alt="dropdown"
                  onClick={() => setIsPopOpen(!isPopOpen)}
                  width={20}
                  height={20}
                />
              </Popover>
            </li>
            <li className={styles.navitem}>
              <div className={styles.username_details}>
                <h1>Harry Verma</h1>
                <span className={styles.profile}>Web Developer</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

