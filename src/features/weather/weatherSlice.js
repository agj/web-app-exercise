import { createSlice } from '@reduxjs/toolkit';
import { repeat } from 'ramda';
import { dayNames } from '../../days';

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

export const retrieveDayTemperatures = (dayIndex) => (dispatch) => {
  setTimeout(() => {
    const temperatures = [
      { time: 0, temperature: 12 },
      { time: 3, temperature: 8 },
      { time: 6, temperature: -2 },
      { time: 9, temperature: 6 },
      { time: 12, temperature: 11 },
      { time: 15, temperature: 17 },
      { time: 18, temperature: 16 },
      { time: 21, temperature: 13 },
    ];
    dispatch(setDayTemperatures({ dayIndex: dayIndex, value: temperatures }));
  }, 2000);
}

export const selectDayOverviewWeather = (dayIndex) => (state) => state.weather.daysOverview[dayIndex];

export const selectDayTemperatures = (dayIndex) => (state) => state.weather.daysTemperatures[dayIndex];

export default weatherSlice.reducer;
