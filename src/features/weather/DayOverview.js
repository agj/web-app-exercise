import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDaysWeather } from './weatherSlice';
import styles from './DayOverview.module.css';

export function DayOverview(props) {
  const { children, index } = props;
  const daysWeather = useSelector(selectDaysWeather);

  if (daysWeather[index]) {
    const { max, min } = daysWeather[index];
    return (
      <Link to={ `/${ index }` }>
        <div className={ styles.DayOverview }>
          { children } { max }° / { min }°
        </div>
      </Link>
    );
  }

  return (
    <Link to={ `/${ index }` }>
      <div className={ styles.DayOverview }>
        { children } (…)
      </div>
    </Link>
  );
}
