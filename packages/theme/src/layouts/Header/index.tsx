import { siteTitle } from '../../stores/web';
import styles from './style.module.css';
import { useStore } from '@nanostores/react';
import React from 'react';

export const Header = () => {
  const title = useStore(siteTitle);
  return (
    <header className={styles['wrap']}>
      <p>title</p>
      <h1>{title}</h1>
    </header>
  );
};
