import Image from 'next/image';
import React from 'react';

function Loader() {
  return (
    <div
      style={{
        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0px',
        color: 'orange',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(20px)',
        fontWeight: 'bold',
        zIndex: 999
      }}
    >
      <Image src="/assests/spinner1.gif" height={120} width={120} alt="loading.." />
    </div>
  );
}

export default Loader;
