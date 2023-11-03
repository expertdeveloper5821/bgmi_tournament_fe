// 'use client';
// import React from 'react';

// import Room from './Room/page';
// import Video from './Video/page'

// function spectatorDashboard() {
//   return <Room />
//     <Video />

//     ;
// }

// export default spectatorDashboard;
'use client';
import React from 'react';

import Room from './Room/page';
import Video from './Video/page';

function spectatorDashboard() {
  return (
    <div>
      <Room />
      <Video />
    </div>
  );
}

export default spectatorDashboard;

