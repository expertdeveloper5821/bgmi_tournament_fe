import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const [width, setWidth] = useState(isClient ? window.innerWidth : 0);

  const handleWindowSizeChange = () => {
    if (isClient) {
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (isClient) {
      window.addEventListener('resize', handleWindowSizeChange);
      // Clean up
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }
  }, [isClient]);

  return [width];
};

export default useWindowSize;
