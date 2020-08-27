import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    daysWeather: [],
  },
  reducers: {
    setDaysWeather: (state, { payload }) => {
      state.daysWeather = payload;
    },
  },
});

export const { setDaysWeather } = weatherSlice.actions;

export const selectDaysWeather = (state) => state.weather.daysWeather;

export default weatherSlice.reducer;
