'use client';
import React, {useEffect, useState} from 'react';
import styles from '../../styles/landingpage.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import NavBar from './navBar/page';
import Image from 'next/image';
import sendRequest from '@/services/auth/auth_All_Api';
import {toast} from 'react-toastify';
import CustomCursor from './customCursor/page';

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [poolModal, setPoolModal] = useState<boolean>(false);
  const [id, setId] = useState<any>(0);
  const [disable, setDisable] = useState<boolean>(false);

  const handleIncrement = () => {
    if (id === data.length - 1) {
      setId(id);
    } else {
      setId(id + 1);
    }
    toast.success('Contest Joined Successfully', {
      position: 'top-right',
      autoClose: 2000, // Automatically close after 2 seconds
      hideProgressBar: false, // Show the progress bar
    });
  };

  const playBulletFireSound = () => {
    const audio = new Audio('../assests/gunsound.mp3');
    audio.currentTime = 0;
    audio.play();
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleData = (id: number) => {
    setId(id);
  };

  const [width] = useWindowSize();
  useEffect(() => {
    window.addEventListener('click', playBulletFireSound);

    return () => {
      window.removeEventListener('click', playBulletFireSound);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(`api/v1/room/rooms`, {
        method: 'Get',
      });
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
    <CustomCursor/>
      <div className={styles.main_container}>
        <div>
          <NavBar />
        </div>
        <div className={styles.parashoot}>
          <Image
            className={styles.person_Img}
            src="/assests/parashoot.png"
            alt="parashoot"
            height={100}
            width={100}
          />
        </div>
        <div className={styles.parashoot2}>
          <Image
            src="/assests/p.png"
            alt="parashoot"
            height={100}
            width={100}
          />
        </div>
        <div className={styles.parashoot3}>
          <img
            className={styles.person_Img}
            height={100}
            width={100}
            src="/assests/heli.gif"
            alt="parashoot"
          />
        </div>
        <div className={styles.parashoot4}>
          <img
            className={styles.person_Img}
            height={100}
            width={100}
            src="./assests/heli.gif"
            alt="parashoot"
          />
        </div>
        <div className={styles.parashoot5}>
          <img
            className={styles.person_Img}
            height={100}
            width={100}
            src="./assests/p.png"
            alt="parashoot"
          />
        </div>
        <div className={styles.banner_center_text}>
          <h1 className={styles.banner_heading}>PATT SE</h1>
          <p className={styles.banner_subheading}>Warriors Wanted</p>
        </div>
      </div>
      <div className={styles.upcoming_mathces_container}>
        <div className={styles.rn_text}>
          <h2>EARN CASH REWARDS FOR CONQUERING</h2>
        </div>
        <div className={styles.upcoming_mathces}>
          <h3 className={styles.upComingHeading}>Upcoming Matches</h3>
          <p className={styles.upComingPara}>
            Are you ready to take your BGMI gaming to the next level? Look no
            further! BGMI Rewards brings you an exhilarating platform where your
            gaming skills translate into real cash rewards. Join thousands of
            enthusiastic players who have already unlocked the true potential of
            their gaming passion.
          </p>
        </div>
        <div className={styles.upcoming_mathces_sub_container}>
          {data && data.length > 0 && (
            <div className={styles.banner_bgmi_img}>
              <img
                src={data && data[id].mapImg}
                alt="bg"
                className={styles.banner_image}
              />
            </div>
          )}

          {poolModal ? (
            <div className={styles.main_winning_pool}>
              <div className={styles.inner_winning_pool}>
                <div className={styles.text_pool_cls}>
                  <h1 className={styles.pool_heading}>WINNING PRIZE POOL</h1>

                  <p className={styles.pool_para}>BGMI Squad match</p>
                </div>
                <div className={styles.pool_cancel_p}>
                  <p className={styles.pool_text_p}>
                    Last Survival: {data[id].lastServival}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupeeimg.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                  <p className={styles.pool_text_p}>
                    Highest kill: {data[id].highestKill}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupeeimg.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                  <p className={styles.pool_text_p}>
                    2nd Winner: {data[id].secondWin}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupeeimg.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>

                  <p className={styles.pool_text_p}>
                    3nd Winner: {data[id].thirdWin}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupeeimg.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                </div>{' '}
                <p
                  className={styles.pool_cancel_p}
                  onClick={() => setPoolModal(false)}
                >
                  <button className={styles.cancel_btn}>Cancel</button>
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className={styles.time_container}>
            {data && data.length > 0 ? (
              <>
              <div>
                  <h2>Coming Soon</h2>
                  <span>Time: {data.length > 0 && data[id].time} pm</span>
                </div>
                <div className={styles.prizepool}>
                  <div className={styles.prize_container}>
                    <span>
                      WINNING PRIZE{' '}
                      <Image
                        src="../assests/downhead.svg"
                        height={10}
                        width={20}
                        alt="rupees"
                        onClick={() => setPoolModal(true)}
                      />
                    </span>
                    <h2>
                      Last Survival: 200
                      <Image
                        src="../assests/rupeeimg.svg"
                        height={20}
                        width={10}
                        alt="rupees"
                        className={styles.rsSign}
                      />
                    </h2>
                  </div>
                  <div className={styles.fee_container}>
                    <span>ENTRY FEES</span>
                    <h2>
                      0
                      <Image
                        src="../assests/rupeeimg.svg"
                        height={20}
                        width={10}
                        alt="rupees"
                        className={styles.rsSign}
                      />
                    </h2>
                  </div>
                </div>
                <div className={styles.gameInfo}>
                  <div className={styles.game}>
                    <span>TYPE</span>
                    <span>{data[id].gameType}</span>
                  </div>
                  <div className={styles.game}>
                    <span>VERSION</span>
                    <span>{data[id].version}</span>
                  </div>
                  <div className={styles.game}>
                    <span>MAP</span>
                    <span>{data[id].mapType}</span>
                  </div>
                </div>
                <div className={styles.range_container}>
                  <div className={styles.range}>
                    <input type="range" value={50} />
                    <span>Only 30 spots left 20/50</span>
                  </div>
                  <button
                    className={styles.joinbtn}
                    onClick={handleIncrement}
                    disabled={disable}
                  >
                    JOIN
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.elseText}>
                <h1>Please wait the rooms creation is in progress...</h1>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rn_images_container}>
          {data?.length > 0 &&
            data?.map((gameDetails: any, index: number) => {
              return (
                <>
                  <img
                    src={gameDetails.mapImg}
                    className={styles.rn_images}
                    height={100}
                    width={100}
                    alt="image"
                    onClick={() => handleData(index)}
                  />
                </>
              );
            })}
        </div>
        <div className={styles.welcome_Container}>
          <div className={styles.stone}>
            <img src="../assests/stone.svg" />
            <img src="../assests/Group20.svg" />
          </div>
          <div className={styles.welcome_subcontainer}>
            <h2>WELCOME TO PATT SE HEADSHOT</h2>
            <p>
              Welcome to our cutting-edge esports platform designed exclusively
              for BGMI players. Engage in thrilling competitive tournaments,
              test your skills, and climb the leaderboards to showcase your
              mastery. Enjoy personalized team-building features, connect with
              fellow gamers, and strategize for victory. Our platform provides
              in-depth game analytics to enhance your performance and gain
              valuable insights. Embrace the ultimate battleground for mobile
              gaming enthusiasts, where the passion for esports meets
              unparalleled excitement. Join our growing community, fuel your
              competitive spirit, and seize the chance to win fantastic rewards.
              Elevate your gaming experience and be a part of the future of
              esports with us!
            </p>
          </div>
        </div>
        <div>
          <div className={styles.choseSection}>
            <h2>Why Choose PATT SE HEADSHOT</h2>
            <p>
              Join the ranks of those who have chosen us as their preferred
              esports platform for BGMI. Experience the future of gaming
              excellence and be part of our ever-growing success story.
            </p>
            <img src={'../assests/directionindicator.svg'} />
          </div>
          <div className={styles.scopeSection}>
            <div className={styles.centerscope}>
              <Image
                src="../assests/newscope.svg"
                alt="center scope"
                height={100}
                width={100}
                className={styles.newscope}
              />
              <Image
                src="../assests/zoominimage.svg"
                className={styles.bg_img_static}
                height={100}
                width={100}
                alt="zoom in image"
              />
              <Image
                className={styles.scope_line}
                src="../assests/scopeline.svg"
                height={100}
                width={100}
                alt=" scope line"
              />
              <div className={styles.scope_target_text}>150 meters</div>
              <div className={styles.scope_line_red_dot}></div>
            </div>
            <div className={styles.bulletcontainer}>
              <Image
                src="../assests/bullet2.svg"
                alt="bullter"
                height={100}
                width={100}
                className={styles.bullet}
              />
            </div>
            <div className={styles.seamlesstxn}>
              <Image
                src="../assests/seamless2.svg"
                alt="bullter"
                height={100}
                width={100}
                className={styles.seamimg}
              />
            </div>
            <div className={styles.clock_maincontainer}>
              <div className={styles.clock}>
                <Image
                  src="../assests/clock2.svg"
                  alt="clock"
                  height={100}
                  width={100}
                  className={styles.clock_img}
                />
              </div>
              <p className={styles.short_heading}>24/7 Support</p>
            </div>
            <div className={styles.skills_maincontainer}>
              <div className={styles.skillman}>
                <Image
                  src="../assests/downperson2.svg"
                  alt="person"
                  height={100}
                  width={100}
                  className={styles.clock_img}
                />
              </div>
              <p className={styles.short_heading}>Skills</p>
            </div>
            <div className={styles.tournament_maincontainer}>
              <div className={styles.trophy_container}>
                <Image
                  src="../assests/excitmentlogo.svg"
                  alt="trophy"
                  height={100}
                  width={100}
                  className={styles.clock_img}
                />
              </div>
              <p className={styles.short_heading}>Exciting Tournaments</p>
            </div>
            <div className={styles.prize_maincontainer}>
              <div className={styles.money_container}>
                <Image
                  src="../assests/getprize2.svg"
                  alt="trophy"
                  height={100}
                  width={100}
                  className={styles.clock_img}
                />
              </div>
              <p className={styles.short_heading}>Cash Prizes</p>
            </div>
            {/* </div> */}
          </div>
          <div>
            <p className={styles.scope_text} id="changing-text">
              Our dedicated support team is here to assist you around the clock,
              ensuring a smooth and enjoyable gaming experience.
            </p>
          </div>
          <div className={styles.guns}>
            <Image
              className={styles.gun}
              src="../assests/newgun.svg"
              height={100}
              width={100}
              alt="akm"
            />
            <Image
              className={styles.gun1}
              src="../assests/ak471.svg"
              height={100}
              width={100}
              alt="akm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
