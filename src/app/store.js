import { configureStore } from '@reduxjs/toolkit';
import weatherReducer, { setDaysWeather } from '../features/weather/weatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;

store.dispatch(setDaysWeather([
  { min: -2, max: 15 },
  { min: 0, max: 17 },
  { min: 3, max: 20 },
]));
