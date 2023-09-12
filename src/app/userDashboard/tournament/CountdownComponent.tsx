'use client';
import React from 'react';
import styles from '@/styles/CountdownComponent.module.scss';

function CountdownComponent(props: {
  roomidd: string;
  password: string;
  date: string;
  time: string;
}) {
  return (
    <div className={styles.id_password}>
      <span>Room Id: {props.roomidd}</span>
      <span>Room password: {props.password}</span>
    </div>
  );
}

export default CountdownComponent;
