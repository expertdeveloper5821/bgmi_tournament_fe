import Link from 'next/link';
import React from 'react';
import styles from '@/styles/Dashboard.module.scss';

const Breadcrumb = () => {
  const urls = window.location.pathname.split('/').filter((i) => i);

  function getNames(name: string): string {
    switch (name) {
      case 'userDashboard':
        return 'Dashboard';
      case 'tournament':
        return 'Upcoming Matches';
      default:
        return name;
    }
  }

  return (
    <div>
      {urls.map((i, idx) => (
        <Link
          href={idx === 0 ? window.location.pathname : i}
          key={i}
          style={{ fontSize: '14px', fontWeight: '400', lineHeight: '16px' }}
        >
          {getNames(i)} {idx === urls.length - 1 ? '' : '/ '}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumb;
