import styles from './style.module.css';
import React from 'react';

export const Header = () => {
  return (
    <header className={styles['wrap']}>
      <h1>エンジニアの節約冒険録</h1>
    </header>
  );
};
