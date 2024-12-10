import styles from './Small.module.css';
import { Navigation } from './interface';
import React from 'react';

export const Item = (props: Navigation['items'][0]) => {
  return (
    <a
      href={props.href}
      target={props.target === 'external' ? '_blank' : ''}
      className={styles['list-item']}
    >
      {props.label}
    </a>
  );
};

export const Small = (props: Navigation) => {
  return (
    <ul className={styles['list-wrap']}>
      {props.items.map((item) => (
        <li key={item.href} className={styles['item']}>
          <Item {...item} />
        </li>
      ))}
    </ul>
  );
};
