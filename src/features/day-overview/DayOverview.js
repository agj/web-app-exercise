
import React from 'react';
import styles from './DayOverview.module.css';

export function DayOverview(props) {
  const { children, max, min } = props;
  return (
    <div className={ styles.DayOverview }>
      { children } { max }° / { min }°
    </div>
  );
}
