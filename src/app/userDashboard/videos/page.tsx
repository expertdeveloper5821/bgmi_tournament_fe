import React from 'react';
import IsAuthenticatedHoc from '@/Components/HOC/IsAuthenticatedHoc';

const Video = () => {
  return (
    <IsAuthenticatedHoc>
      <div> Video</div>
    </IsAuthenticatedHoc>
  );
};

export default Video;
