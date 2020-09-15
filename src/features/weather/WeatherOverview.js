import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayOverview } from './DayOverview';
import { selectDayOverviewWeather, retrieveOverviewWeather, selectTodayIndex } from './weatherSlice';
import { dayNames } from './days';


export function WeatherOverview({ currentDayIndex }) {
  console.log('currentDayIndex', currentDayIndex)
  const data = useSelector(selectDayOverviewWeather(0));
  const todayIndex = useSelector(selectTodayIndex());

  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(retrieveOverviewWeather());
    }
  });

  return (
    <div>
      { dayNames(todayIndex).map((dayName, dayIndex) =>
        <DayOverview key={ dayIndex } dayIndex={ dayIndex } currentDayIndex={ currentDayIndex }>
          { dayName }
        </DayOverview>
      ) }
    </div>
  );      
}
