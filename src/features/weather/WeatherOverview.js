import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayOverview } from './DayOverview';
import { selectDayOverviewWeather, retrieveOverviewWeather } from './weatherSlice';
import { dayNames } from '../../days';


export function WeatherOverview({ currentDayIndex }) {
  const data = useSelector(selectDayOverviewWeather(0));

  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(retrieveOverviewWeather());
    }
  });

  return (
    <div className="days">
      { dayNames.map((dayName, dayIndex) =>
        <DayOverview key={ dayIndex } dayIndex={ dayIndex } currentDayIndex={ currentDayIndex }>
        { dayName }
        </DayOverview>
      ) }
    </div>
  );      
}
