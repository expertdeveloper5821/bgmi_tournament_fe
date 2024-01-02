import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSelectMatch } from '@/redux/slices/userDashboardSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Dashboard.module.scss';
import { ITournament } from '@/redux/types';

const UpcomingSlider = () => {
  const { allRooms } = useSelector((state: RootState) => state.userDashboard);

  const dispatch = useDispatch<AppDispatch>();

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
  };

  return (
    <Slider {...settings}>
      {allRooms &&
        allRooms.map((match: ITournament, index: number) => {
          return (
            <div key={match?._id}>
              <div className={styles.upcomingSliderCard}>
                <Image
                  key={index}
                  width={100}
                  height={100}
                  style={{ width: '100%' }}
                  className={styles.img_slider_one}
                  src={match?.mapImg || '../assests/cards.svg'}
                  alt="slides"
                  onClick={() => dispatch(onSelectMatch(match))}
                />
                <p className={styles.gameCardFade}>{match.gameName}</p>
              </div>
            </div>
          );
        })}
    </Slider>
  );
};

export default UpcomingSlider;
