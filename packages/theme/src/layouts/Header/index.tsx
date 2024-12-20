import { useStore } from '@nanostores/react';
import styles from './style.module.css';
import React from 'react';
import { siteTitle } from '../../stores/web';

export const Header = () => {
  const title = useStore(siteTitle);
  return (
    <header className={styles['wrap']}>
      <h1>{title}</h1>
    </header>
  );
};
