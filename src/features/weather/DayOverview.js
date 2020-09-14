import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectDayOverviewWeather } from './weatherSlice';
import styles from './DayOverview.module.css';

export function DayOverview({ children, dayIndex, currentDayIndex }) {
  // const classNames = styles.DayOverview + ' ' + (dayIndex === currentDayIndex ? styles.selected : '')
  const isActive = dayIndex === currentDayIndex;

  const weatherOverview = useSelector(selectDayOverviewWeather(dayIndex));
  const { max, min, weather } = weatherOverview
    ? weatherOverview
    : { max: null, min: null, weather: null };

  return (
    <Card
      tag={ NavLink }
      to={ `/${ dayIndex }` }
      className={ styles.DayOverview + ' text-center' }
      color={ isActive ? 'dark' : 'light' }
      inverse={ isActive }
    >
      <CardBody>
        <CardTitle tag="h5">
          { children }
        </CardTitle>
        { !isNaN(max)
          ? <CardText>
              { weather } { Math.round(min) }° ~ { Math.round(max) }°
            </CardText>
          : <CardText></CardText>
        }
      </CardBody>
    </Card>
  );
}
