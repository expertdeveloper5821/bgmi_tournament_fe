import React, { useState } from "react";
import styles from "./Navabar.module.scss";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { Avatar, Popover } from "technogetic-iron-smart-ui";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);

  function handleClosePopover() {
    setIsOpen(false);
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    setIsPopOpen(false);
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
                      <img
                        className={styles.close}
                        src="./assets/cross.svg"
                        alt="close"
                        onClick={handleClosePopover}
                      ></img>
                    </div>
                    <div className={styles.dropdown}>
                      <Avatar
                        onClick={() => { }}
                        size={20}
                        src="./assets/avatar.png"
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
                        src="./assets/avatar.png"
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
                        src="./assets/avatar.png"
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
                <img
                  className={styles.notification}
                  src="./assets/notification.svg"
                  alt="notification"
                  onClick={() => setIsOpen(true)}
                ></img>
              </Popover>
            </li>
            <li className={styles.navitem}>
              <Avatar onClick={() => { }} src="./assets/avatar.png" size={20} />
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
                        src="./assets/avatar.png"
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
                        <img
                          className={styles.profileicon}
                          src="./assets/profile.svg"
                          alt="profile"
                        ></img>
                        <div className={styles.myprofile}>My Account</div>
                      </div>
                      <div className={styles.flexcol}>
                        <img
                          className={styles.settingicon}
                          src="./assets/settingicon.svg"
                          alt="setting"
                        ></img>
                        <div className={styles.myprofile}>Settings</div>
                      </div>
                      <div className={styles.flexcol}>
                        <img
                          className={styles.notification_icon}
                          src="./assets/notification.svg"
                          alt="notification"
                        ></img>
                        <div className={styles.myprofile}>Notification</div>
                      </div>
                    </div>
                    <div className={styles.logoutbutton}>
                      <div>
                        <img
                          className={styles.logoutbuttonicon}
                          src="./assets/logouticon.svg"
                          alt="logouticon"
                          onClick={handleLogout}
                        ></img>
                        Logout
                      </div>
                    </div>
                  </div>
                }
                height="238px"
                placement="bottom"
                width="224px"
              >
                <img
                  className={styles.dropdown}
                  src="./assets/dropdown.svg"
                  alt="dropdown"
                  onClick={() => setIsPopOpen(!isPopOpen)}
                ></img>
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
