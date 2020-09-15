import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayOverview } from './DayOverview';
import { selectDayOverview, selectDays, retrieveOverview } from './weatherSlice';
import { dayName } from './days';


export function WeatherOverview({ currentDay }) {
  const days = useSelector(selectDays());
  const data = useSelector(selectDayOverview(days[0]));

  const dispatch = useDispatch();
  useEffect(() => {
    if (!data || !data.weather) {
      dispatch(retrieveOverview());
    }
  });

  return (
    <div>
      { days.map((dayTime) =>
        <DayOverview
          key={ (new Date(dayTime)).toDateString() }
          day={ dayTime }
          currentDay={ currentDay }
        >
          { dayName(dayTime) }
        </DayOverview>
      ) }
    </div>
  );      
}
