
import React from 'react';
import styles from './DayOverview.module.css';

export function DayOverview(props) {
  return (
    <div class={ styles.DayOverview }>
      { props.day } { props.max }° / { props.min }°
    </div>
  );
}
