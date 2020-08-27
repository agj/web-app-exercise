import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDayOverviewWeather } from './weatherSlice';
import styles from './DayOverview.module.css';

export function DayOverview({ children, dayIndex }) {
  const weatherOverview = useSelector(selectDayOverviewWeather(dayIndex));

  if (weatherOverview) {
    const { max, min } = weatherOverview;
    return (
      <Link to={ `/${ dayIndex }` }>
        <div className={ styles.DayOverview }>
          { children } { max }° / { min }°
        </div>
      </Link>
    );
  }

  return (
    <Link to={ `/${ dayIndex }` }>
      <div className={ styles.DayOverview }>
        { children } (…)
      </div>
    </Link>
  );
}
