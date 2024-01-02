'use client';
import React from 'react';
import Login from './auth/login/page';
import RootLayout from './layout';
export default function Home() {
  return (
    <RootLayout>
      <Login />
    </RootLayout>
  );
}
