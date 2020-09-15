import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectDayOverview } from './weatherSlice';
import { timeToSlug, datesEqual } from './days';
import styles from './DayOverview.module.css';

export function DayOverview({ children, day, currentDay }) {
  const isActive = datesEqual(day, currentDay);

  const weatherOverview = useSelector(selectDayOverview(day));
  const { max, min, weather } = weatherOverview
    ? weatherOverview
    : { max: null, min: null, weather: null };

  return (
    <Card
      tag={ NavLink }
      to={ `/${ timeToSlug(day) }` }
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
