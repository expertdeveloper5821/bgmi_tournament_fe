import React, {useEffect, useState} from 'react';
import styles from '../../styles/Dashboard.module.scss';

const Slider = ({sliderContent}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numItemsToShow, setNumItemsToShow] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(false);

  const goToNextSlide = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < sliderContent.length) {
      setCurrentIndex(newIndex);
    }
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNumItemsToShow(2);
        setAutoAdvance(false);
      } else {
        setNumItemsToShow(1);
        setAutoAdvance(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (autoAdvance) {
      const interval = setInterval(goToNextSlide, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [autoAdvance, currentIndex]);
  return (
    <div>
      {window.innerWidth >= 768 && (
        <button
          onClick={goToPrevSlide}
          className={styles.prevButton}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
      )}
      <div className={styles.slideContainer}>
        {sliderContent
          .slice(currentIndex, currentIndex + numItemsToShow)
          .map((sliderItem: any, index: any) => (
            <div key={index} className={`${styles.slide}`}>
              <div className={styles.reviewsContainer}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviews}>
                    <img
                      src="/assests/reviewman.svg"
                      alt="image"
                      className={styles.profile}
                    />
                    <div className={styles.reviewer}>
                      <div className={styles.name}>
                        <h2>{sliderItem.name}</h2>
                        <div className={styles.greenCircle}></div>
                      </div>
                      <p>{sliderItem.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={goToNextSlide}
        className={styles.nextButton}
        disabled={currentIndex === sliderContent.length - 2}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;
