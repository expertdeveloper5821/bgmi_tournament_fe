import { useState } from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { formatDateAndTime } from '../CommonComponent/moment';
import styles from '@/styles/Dashboard.module.scss';

const MatchComponent = ({
  gameName,
  dateAndTime,
  lastSurvival,
  highestKill,
  secondWin,
  thirdWin,
  entryFee,
  gameType,
  version,
  mapType,
}) => {
  const [poolModal, setPoolModal] = useState(false);
  return (
    <>
      <span className={styles.register_match_gamename}>{gameName}</span>
      <span className={styles.winning_prize}>
        Date & Time: {dateAndTime}
      </span>
      <div className={styles.winnings}>
        <div>
          <strong className={styles.winning_prize}>
            WINNING PRIZE
            <span className={styles.caret_down_style} style={{ cursor: 'pointer' }}>
              <BsChevronDown onClick={() => setPoolModal(true)} />
            </span>
          </strong>
          {poolModal ? (
            <div className={styles.main_winning_pool}>
              <div className={styles.inner_winning_pool}>
                <div className={styles.text_pool_cls}>
                  <h1 className={styles.pool_heading}>Winning Prize Pool</h1>
                  <p className={styles.pool_para}>{gameName}</p>
                </div>
                <div className={styles.pool_cancel_p}>
                  <p className={styles.pool_text_p}>
                    Last Survival: {lastSurvival}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupee-icon.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                  <p className={styles.pool_text_p}>
                    Highest kill: {highestKill}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupee-icon.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                  <p className={styles.pool_text_p}>
                    2nd Winner: {secondWin}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupee-icon.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                  <p className={styles.pool_text_p}>
                    3nd Winner: {thirdWin}
                    <span className={styles.rs_pool_logo}>
                      <Image
                        src="../assests/rupee-icon.svg"
                        alt="rupeeIcon"
                        width={12}
                        height={12}
                      />
                    </span>
                  </p>
                </div>
                <p className={styles.pool_cancel_p} onClick={() => setPoolModal(false)}>
                  <AiOutlineClose className={styles.cancel_icon} style={{ cursor: 'pointer' }} />
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
          <span className={styles.survival_content}>
            Last Survival:
            <span className={styles.rs_logo}>
              <Image src="../assests/rupee-icon.svg" alt="rupeeIcon" width={12} height={12} />
            </span>
            {lastSurvival}
          </span>
        </div>
        <div>
          <span className={styles.winning_prize}>ENTRY FEES</span>
          <span className={styles.survival_content}>
            <span className="rs_logo">
              <Image src="../assests/rupee-icon.svg" alt="rupeeIcon" width={12} height={12} />
            </span>
            {entryFee}
          </span>
        </div>
      </div>
      <div className={styles.winnings}>
        <div>
          <span className={styles.winning_prize}>TYPE</span>
          <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>
            {gameType}
          </span>
        </div>
        <div>
          <span className={styles.winning_prize}>VERSION</span>
          <span className={styles.tvm_font} style={{ color: 'rgba(255, 214, 0, 1)' }}>
            {version}
          </span>
        </div>
        <div>
          <span className={styles.winning_prize}>MAP</span>
          <span className={styles.tvm_font} style={{ color: 'rgba(255, 122, 0, 1)' }}>
            {mapType}
          </span>
        </div>
      </div>
    </>
  );
};
export default MatchComponent;
