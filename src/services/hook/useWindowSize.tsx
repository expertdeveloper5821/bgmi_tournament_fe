// import { useState, useEffect } from 'react';

// const useWindowSize = () => {
//   const isClient = typeof window === 'object';

//   const [width, setWidth] = useState(isClient ? window.innerWidth : 0);

//   const handleWindowSizeChange = () => {
//     if (isClient) {
//       setWidth(window.innerWidth);
//     }
//   };

//   useEffect(() => {
//     if (isClient) {
//       window.addEventListener('resize', handleWindowSizeChange);
//       // Clean up
//       return () => {
//         window.removeEventListener('resize', handleWindowSizeChange);
//       };
//     }
//   }, [isClient]);
//   }, [isClient]);
//   }, [isClient]);

//   return [width];
// };

// export default useWindowSize;
import React from 'react';

const useWindowSize = () => {
  return <div>einodw hook</div>;
};

export default useWindowSize;
