import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MiniMatchComponent from '@/Components/MatchComponent/MiniMatchComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ITournament } from '@/redux/types';

const RegisteredMatchSlider = () => {
  const { regRooms } = useSelector((state: RootState) => state.userDashboard);

  const settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {regRooms &&
          regRooms.map((match: ITournament, index: number) => {
            return <MiniMatchComponent match={match} key={index} />;
          })}
      </Slider>
    </>
  );
};

export default RegisteredMatchSlider;
