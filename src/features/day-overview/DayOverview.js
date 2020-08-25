
import React from 'react';
import styles from './DayOverview.module.css';

export function DayOverview(props) {
  return (
    <div className={ styles.DayOverview }>
      { props.day } { props.max }° / { props.min }°
    </div>
  );
}
