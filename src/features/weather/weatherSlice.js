import { createSlice } from '@reduxjs/toolkit';
import { repeat, range } from 'ramda';
import { dayNames, weekDayToIndex } from '../../days';
import testData from './test-data';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    daysOverview: Array(dayNames.length),
    daysTemperatures: repeat([], dayNames.length),
  },
  reducers: {
    setOverviewWeather: (state, { payload: { dayIndex, value } }) => {
      if (dayIndex >= 0 && dayIndex < state.daysOverview.length) {
        state.daysOverview[dayIndex] = value;
      }
    },
    setDayTemperatures: (state, { payload: { dayIndex, value } }) => {
      if (dayIndex >= 0 && dayIndex < state.daysTemperatures.length) {
        state.daysTemperatures[dayIndex] = value;
      }
    },
  },
});

export const { setOverviewWeather, setDayTemperatures } = weatherSlice.actions;

export const retrieveOverviewWeather = () => (dispatch) => {
  setTimeout(() => {
    dispatch(setOverviewWeather({ dayIndex: 0, value: { min: -2, max: 15 } }));
    dispatch(setOverviewWeather({ dayIndex: 1, value: { min: 0, max: 17 } }));
    dispatch(setOverviewWeather({ dayIndex: 2, value: { min: 3, max: 20 } }));
    dispatch(setOverviewWeather({ dayIndex: 3, value: { min: 3, max: 21 } }));
    dispatch(setOverviewWeather({ dayIndex: 4, value: { min: 4, max: 24 } }));
  }, 3000);
};

export const retrieveDayTemperatures = (dayIndex) => async (dispatch) => {
  // const response = await fetch(`//api.openweathermap.org/data/2.5/forecast?&q=Region Metropolitana,cl&units=metric&appid=${ process.env.REACT_APP_OPENWEATHERMAP_API_KEY }`);

  // if (response.ok) {
  //   const raw = await response.json();

  //   raw.list.map()
  // }

  const temperatures = testData.list
    .map(({ dt, main: { temp } }) => {
      const date = new Date(dt * 1000);
      return {
        hour: date.getHours(),
        day: weekDayToIndex(date.getDay()),
        temperature: temp,
      };
    });

  const temperaturesByDay =
    range(0, dayNames.length)
    .map(dayIndex => temperatures.filter(({ day }) => day === dayIndex));

  temperaturesByDay.forEach((temperatures, dayIndex) => {
    dispatch(setDayTemperatures({ dayIndex, value: temperatures }));
  });
}

export const selectDayOverviewWeather = (dayIndex) => (state) => state.weather.daysOverview[dayIndex];

export const selectDayTemperatures = (dayIndex) => (state) => state.weather.daysTemperatures[dayIndex];

export default weatherSlice.reducer;
