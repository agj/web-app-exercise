import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    daysOverview: [],
  },
  reducers: {
    setOverviewWeather: (state, { payload }) => {
      state.daysOverview = payload;
    },
  },
});

export const { setOverviewWeather } = weatherSlice.actions;

export const retrieveOverviewWeather = () => (dispatch) => {
  setTimeout(() => {
    dispatch(setOverviewWeather([
      { min: -2, max: 15 },
      { min: 0, max: 17 },
      { min: 3, max: 20 },
    ]));
  }, 3000);
};

export const selectDaysOverviewWeather = (state) => state.weather.daysOverview;

export default weatherSlice.reducer;
