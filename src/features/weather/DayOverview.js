import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDayOverviewWeather } from './weatherSlice';
import styles from './DayOverview.module.css';

export function DayOverview({ children, dayIndex, currentDayIndex }) {
  const classNames = styles.DayOverview + ' ' + (dayIndex === currentDayIndex ? styles.selected : '')

  const weatherOverview = useSelector(selectDayOverviewWeather(dayIndex));

  if (!weatherOverview) {
    return (
      <Link to={ `/${ dayIndex }` } className={ classNames }>
          { children } ⚪️
      </Link>
    );
  }

  const { max, min, weather } = weatherOverview;
  return (
    <Link to={ `/${ dayIndex }` } className={ classNames }>
        { children } { weather }<br />
        { Math.round(min) }° / { Math.round(max) }°
    </Link>
  );
}
