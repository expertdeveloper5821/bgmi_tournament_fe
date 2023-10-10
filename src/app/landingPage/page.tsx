'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/landingpage.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import NavBar from './navBar/page';
import Image from 'next/image';
import { sendRequest } from '@/utils/axiosInstanse';
import { toast } from 'react-toastify';
import CustomCursor from './customCursor/page';
import Link from 'next/link';
import { formatTime } from '@/Components/CommonComponent/moment';
interface GameDetails {
  createdAt: string;
  createdBy: string;
  dateAndTime: string;
  entryFee: string;
  gameName: string;
  gameType: string;
  highestKill: string;
  lastSurvival: string;
  mapImg: string;
  mapType: string;
  password: string;
  roomId: string;
  roomUuid: string;
  secondWin: string;
  thirdWin: string;
  updatedAt: string;
  version: string;
  __v: number;
  _id: string;
}

const page = () => {
  const [data, setData] = useState<GameDetails[]>();
  const [poolModal, setPoolModal] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [content, setContent] = useState<string>(
    'Create your free account in just a few simple steps and join our ever-growing gaming community',
  );
  const handleData = (id: number) => {
    setId(id);
  };

  const width  = useWindowSize();
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(`room/rooms`, {
        method: 'Get',
      });
      setData(response.data);
    };

    fetchData();
  }, []);
  const playBulletFireSound = () => {
    const audio = new Audio('../assests/gunsound.mp3');
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    document.addEventListener('click', playBulletFireSound);
    return () => {
      document.removeEventListener('click', playBulletFireSound);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This creates a smooth scrolling effect
    });
  };
  // const handleButtonHover1 = () => {
  //   setContent(
  //     'Cash out your earnings with ease and enjoy the real benefits of your gaming talent',
  //   );
  // };
  // const handleButtonHover2 = () => {
  //   setContent(
  //     'Dive into intense BGMI battles, showcase your skills, and climb the leaderboard to win cash rewards',
  //   );
  // };
  // const handleButtonHover3 = () => {
  //   setContent(
  //     'Create your free account in just a few simple steps and join our ever-growing gaming community',
  //   );
  // };
  
  return (
    <div className={styles.bodycolor}>
      {/* <CustomCursor /> */}
      {/* <GlassCrack /> */}
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
          <Image src="/assests/p.png" alt="parashoot" height={100} width={100} />
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

        <div className={styles.social_Icons_header}>
          <Link href="">
            <Image
              className={styles.footerSocialIcon}
              src="../assests/facebookiconblack.svg"
              width={24}
              height={24}
              alt="facebook"
            />
          </Link>

          <Link href="">
            <Image
              className={styles.footerSocialIcon}
              src="../assests/instaiconblack.svg"
              width={24}
              height={24}
              alt="insta"
            />
          </Link>
          <Link href="">
            <Image
              className={styles.footerSocialIcon}
              src="../assests/twittericonblack.svg"
              width={24}
              height={24}
              alt="telegram"
            />
          </Link>

          <Link href="">
            <Image
              className={styles.footerSocialIcon}
              src="../assests/youtubeiconblack.svg"
              width={24}
              height={24}
              alt="youtube"
            />
          </Link>
        </div>
        <div className={styles.rn_text}>
          <h2>EARN CASH REWARDS FOR CONQUERING</h2>
        </div>
      </div>

      <div className={styles.upcoming_mathces_container}>
        <div className={styles.upcoming_mathces}>
          <h3 className={styles.upComingHeading}>Upcoming Matches</h3>
          <p className={styles.upComingPara}>
            Are you ready to take your BGMI gaming to the next level? Look no further! BGMI Rewards
            brings you an exhilarating platform where your gaming skills translate into real cash
            rewards. Join thousands of enthusiastic players who have already unlocked the true
            potential of their gaming passion.
          </p>
        </div>

        <div className={styles.upcoming_mathces_sub_container}>
          {data && data.length > 0 && (
            <div className={styles.banner_bgmi_img}>
              <img
                src={
                  data && data[id].mapImg ? data[id].mapImg : `${'./assests/eranglemapimage.svg'}`
                }
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
                    Last Survival: {data[id].lastSurvival}
                    <span className={styles.rs_pool_logo}>₹</span>
                  </p>
                  <p className={styles.pool_text_p}>
                    Highest kill: {data[id].highestKill}
                    <span className={styles.rs_pool_logo}>₹</span>
                  </p>
                  <p className={styles.pool_text_p}>
                    2nd Winner: {data[id].secondWin}
                    <span className={styles.rs_pool_logo}>₹</span>
                  </p>

                  <p className={styles.pool_text_p}>
                    3rd Winner: {data[id].thirdWin}
                    <span className={styles.rs_pool_logo}>₹</span>
                  </p>
                </div>
                <p className={styles.pool_cancel_p} onClick={() => setPoolModal(false)}>
                  <button className={styles.cancel_btn}>Cancel</button>
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className={styles.time_container}>
            {data && data?.length > 0 ? (
              <>
                <div className={styles.comingsooncontainer}>
                  <h2>
                    {data?.length > 0 && data[id].mapType + ' ' + data[id].gameType + ' ' + 'match'}
                  </h2>
                  <span>
                    Time: {data.length > 0 && `${formatTime({ time: data[id].dateAndTime })}`}
                  </span>
                </div>
                <div className={styles.prizepool}>
                  <div className={styles.prize_container}>
                    <span className={styles.commonspanprizesection}>
                      WINNING PRIZE
                      <Image
                        src="../assests/downhead.svg"
                        height={10}
                        width={20}
                        className={styles.downheadimg}
                        alt="downhead"
                        onClick={() => setPoolModal(true)}
                      />
                    </span>
                    <h2>
                      Last Survival: 200
                      <span className={styles.rsSign}>₹</span>
                    </h2>
                  </div>
                  <div className={styles.fee_container}>
                    <span className={styles.commonspanprizesection}>ENTRY FEES</span>
                    <h2>
                      0<span className={styles.rsSign}>₹</span>
                    </h2>
                  </div>
                </div>
                <div className={styles.gameInfo}>
                  <div className={styles.game}>
                    <span className={styles.commonspanprizesection}>TYPE</span>
                    <span className={styles.gameYellowspan}>{data[id].gameType}</span>
                  </div>
                  <div className={styles.game}>
                    <span className={styles.commonspanprizesection}>VERSION</span>
                    <span className={styles.gameYellowspan}>{data[id].version}</span>
                  </div>
                  <div className={styles.game}>
                    <span className={styles.commonspanprizesection}>MAP</span>
                    <span className={styles.gameOrangespan}>{data[id].mapType}</span>
                  </div>
                </div>
                <div className={styles.range_container}>
                  <div className={styles.range}>
                    <input type="range" value={50} />
                    <span className={styles.commonspanprizesection}>Only 30 spots left 20/50</span>
                  </div>
                  <Link href="/auth/login">
                    <button className={styles.joinbtn}>JOIN</button>
                  </Link>
                </div>
              </>
            ) : (
              <div className={styles.elseText}>
                <h1>Please wait rooms creation is in progress...</h1>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rn_images_container}>
          {data?.length > 0 &&
            data?.map((gameDetails: GameDetails, index: number) => {
              return (
                <>
                  <div className={styles.cardimg}>
                    <div className={styles.carddetails}>
                      <h2>{gameDetails.mapType}</h2>
                      <span>{`${gameDetails.gameName}` + `${gameDetails.gameType}` + `Match`}</span>
                    </div>
                    <img
                      src={
                        gameDetails.mapImg ? gameDetails.mapImg : `./assests/eranglemapimage.svg`
                      }
                      className={styles.rn_images}
                      height={100}
                      width={100}
                      alt={gameDetails.mapType}
                      onClick={() => handleData(index)}
                    />
                  </div>
                </>
              );
            })}
        </div>

        {/* </Slider> */}
        <div className={styles.welcome_Container}>
          <div className={styles.stone}>
            <img src="../assests/stone.svg" />
          </div>
          <div className={styles.gradientoverlay1}></div>
          <div className={styles.welcome_subcontainer}>
            <div className={styles.welcome_RightImg_container}>
              <div className={styles.radialGradient}></div>
              <div className={styles.radialGradient2}></div>
              <Image
                className={styles.welcome_RightImg}
                src={`${width[0] <= 600 ? '../assests/mobilebannerstone.svg':'../assests/Group20.svg'}`}
                height={700}
                width={700}
                alt="zoom in image"
              />
            </div>
            <div className={styles.welcome_alingnment}>
              <h2>Welcome to Patt Se Headshot</h2>
              <p>
                Are you ready to take your BGMI gaming to the next level? Look no further! BGMI
                Rewards brings you an exhilarating platform where your gaming skills translate into
                real cash rewards. Join thousands of enthusiastic players who have already unlocked
                the true potential of their gaming passion.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.choseSection}>
            <h2>Why Choose PATT SE HEADSHOT</h2>
            <p>
              Join the ranks of those who have chosen us as their preferred esports platform for
              BGMI. Experience the future of gaming excellence and be part of our ever-growing
              success story.
            </p>
            <img src={'../assests/directionindicator.svg'} />
          </div>
          <div className={styles.scopeSection}>
            <div className={styles.radialGradientfooter}></div>
            <div className={styles.gradientoverlayscopesection}></div>
            <div className={styles.gradientoverlayscopesectionright}></div>
            <div className={styles.gradientoverlayscopesectiontop}></div>
            <div className={styles.scopemaincontainer}>
              <div className={styles.bulletcontainer}>
                <Image
                  src="../assests/bullet2.svg"
                  alt="bullter"
                  height={100}
                  width={100}
                  className={styles.bullet}
                />
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
              <div className={styles.centerscope}>
                <Image
                  src="../assests/zoominimage.svg"
                  className={styles.bg_img_static}
                  height={100}
                  width={100}
                  alt="zoom in image"
                />
                <Image
                  src="../assests/newscope.svg"
                  alt="center scope"
                  height={100}
                  width={100}
                  className={styles.newscope}
                />
                <div className={styles.gradientoverlayscopesectionscopenear}></div>
                <div className={styles.gradientoverlayscopesectionscopenear1}></div>

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
            </div>
            <div className={styles.seam_main_container}>
              <div className={styles.seamlesstxn}>
                <Image
                  src="../assests/seamless2.svg"
                  alt="bullter"
                  height={100}
                  width={100}
                  className={styles.seamimg}
                />
              </div>
              <p className={styles.seam}>Seamless Transactions</p>
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
            <div className={styles.tournament_maincontainer}>
              <div className={styles.trophy_container}>
                <Image
                  src="../assests/stamp.svg"
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
                  src="../assests/moneycashback.svg"
                  alt="trophy"
                  height={100}
                  width={100}
                  className={styles.clock_img}
                />
              </div>
              <p className={styles.short_heading}>Cash Prizes</p>
            </div>
          </div>
          <div>
            <p className={styles.scope_text} id="changing-text">
              Our dedicated support team is here to assist you around the clock, ensuring a smooth
              and enjoyable gaming experience.
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
      <section className={styles.map}>
        <div className={styles.mapSecDescription}>
          <h3 className={styles.mapSecHead}>How It Works</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters,
          </p>
        </div>
      </section>

      <section className={styles.mapBg}>
        {/* <div className={styles.signUpDiv} onMouseOver={handleButtonHover3}>
          <div className={styles.singUp}>
            <Image src="../assests/redLoction.svg" height={20} width={20} alt="red_loction" />
          </div>

          <p>Sign Up</p>
        </div>

        <div className={styles.rewardDiv}>
          <div className={styles.rewards} onMouseOver={handleButtonHover1}>
            <Image
              src="../assests/whiteLocationIcon.svg"
              height={20}
              width={20}
              alt="whiteLocation"
            />
          </div>

          <p>Play & Win</p>
        </div>

        <div className={styles.playDiv}>
          <div className={styles.play} onMouseOver={handleButtonHover2}>
            <Image
              src="../assests/whiteLocationIcon.svg"
              height={20}
              width={20}
              alt="whiteLocation"
            />
          </div>
          <p>Rewards</p>
        </div>
        <div className={styles.mapLine}>
          <img
            className={styles.mapLines}
            src="../assests/mapline.svg"
            width={1100}
            height={400}
            alt="mapLine"
          />
        </div>

        <div className={styles.whiteLocationMark}>
          <Image
            className={styles.whiteLocationMarkimg}
            src="../assests/whiteLocationIcon.svg"
            height={50}
            width={20}
            alt="whiteLocation"
          />
        </div>

        <div className={styles.whiteLocationMark2}>
          <Image
            src="../assests/whiteLocationIcon.svg"
            height={50}
            width={20}
            alt="whiteLocation"
          />
        </div>

        <div className={styles.whiteLocationMark3}>
          <Image
            src="../assests/whiteLocationIcon.svg"
            height={50}
            width={20}
            alt="whiteLocation"
          />
        </div>

        <div className={styles.redBlurCircle}>
          <Image
            src="../assests/redcircle.svg"
            height={45}
            width={45}
            alt="resBlur"
          />
        </div> */}

        <div className={styles.mapBgPara}>
          <p className={styles.mapP}>{content}</p>
        </div>
      </section>

      <section className={styles.buggiSec}>
        <h4 className={styles.buggyHeading}>
          Now your wait is over!! Play with us & win a lot of money
        </h4>
        <div className={styles.buggiDiv}>
          <Image
            className={styles.buggiImg}
            src="../assests/car_image_buggy.svg"
            width={500}
            height={300}
            alt="Picture of the author"
          />

          <div className={styles.text_div}>
            <h3 className={styles.buggiSec_heading}>Play first game free</h3>
            <p className={styles.buggiSec_para}>Don’t waste your time Hurry up! Signup now</p>
            <Link href="/auth/signup">
              <button className={styles.btnSingup}>Signup</button>
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerDiv}>
          <div className={styles.gradientoverlaytotopfooter}></div>
          <Image
            className={styles.footerLogo}
            src="../assests/Asset 2@33 4.svg"
            width={200}
            height={150}
            alt="footerLogo"
          />
          <Image
            className={styles.shootingstar}
            src="../assests/shootingStar.svg"
            width={150}
            height={150}
            alt="shootingStar"
          />
          <Image
            className={styles.shootingstarsmall}
            src="../assests/shootingStar.svg"
            width={100}
            height={150}
            alt="shootingStar"
          />
          <div className={styles.anchorTags}>
            <Link className={styles.ancor} href="policy.html" target="_blank">
              Privacy Policy
            </Link>
            <Link className={styles.ancor} href="terms.html" target="_blank">
              Terms & conditions
            </Link>
            <Link className={styles.ancor} href="">
              Contact Us
            </Link>
          </div>

          <p className={styles.footer_para}>Let's connect for more information</p>

          <div className={styles.social_I}>
            <Link href="" className={styles.sociallink}>
              <Image
                className={styles.footerSocialIconfb}
                src="../assests/fbiconfooterwhite.svg"
                width={24}
                height={23}
                alt="facebook"
              />
            </Link>

            <Link href="" className={styles.sociallink}>
              <Image
                className={styles.footerSocialIconinsta}
                src="../assests/instaiconfooterwhite.svg"
                width={19}
                height={18}
                alt="insta"
              />
            </Link>
            <Link href="" className={styles.sociallink}>
              <Image
                className={styles.footerSocialIcontwitter}
                src="../assests/twittericonfooterwhite.svg"
                width={19}
                height={18}
                alt="telegram"
              />
            </Link>
            <Link href="" className={styles.sociallink}>
              <Image
                className={styles.footerSocialIconyt}
                src="../assests/youtubeiconfooterwhite.svg"
                width={19}
                height={18}
                alt="youtube"
              />
            </Link>
            <Link href="" className={styles.sociallink}>
              <Image
                className={styles.footerSocialIcontelegram}
                src="../assests/telegramfootericonwhite.svg"
                width={19}
                height={18}
                alt="telegram"
              />
            </Link>
          </div>

          <Link href="mailto:support@pattseheadshot.com" className={styles.support}>
            Mail us: support@pattseheadshot.com
          </Link>

          <p className={styles.footer_text}>
            &#169; Battlefield Gaming Private Limited. All Rights Reserved.
          </p>
          <div className={styles.headsuparrow} onClick={scrollToTop}>
            <Image src="../assests/arrowheadup.svg" height={35} width={35} alt="headuparrow" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
