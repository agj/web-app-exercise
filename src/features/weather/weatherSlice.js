import { createSlice } from '@reduxjs/toolkit';
import { repeat, range, prop, max, min, countBy, identity, nth, toPairs, reduce, map, pipe } from 'ramda';
import { dayNames, weekDayToIndex } from '../../days';
// import testData from './test-data';

const weatherEmojiMap = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '☔️',
  Drizzle: '☔️',
  Snow: '❄️',
  Thunderstorm: '⚡️',
  Mist: '🌫',
  Smoke: '🌫',
  Haze: '🌫',
  Dust: '🌫',
  Fog: '🌫',
  Sand: '🌫',
  Ash: '🌫',
  Squall: '🌫',
  Tornado: '🌫',
}

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

export const retrieveOverviewWeather = () => async (dispatch) => {
  const response = await fetch(`//api.openweathermap.org/data/2.5/forecast?&q=Region Metropolitana,cl&units=metric&appid=${ process.env.REACT_APP_OPENWEATHERMAP_API_KEY }`);

  if (response.ok) {
    const raw = await response.json();

    const temperatures =
      raw.list
      .map(({ dt, main: { temp }, weather: [{ main }] }) => {
        const date = new Date(dt * 1000);
        return {
          hour: date.getHours(),
          day: weekDayToIndex(date.getDay()),
          temperature: temp,
          weather: weatherEmojiMap[main],
        };
      });

    const temperaturesByDay =
      range(0, dayNames.length)
      .map(dayIndex => temperatures.filter(({ day }) => day === dayIndex));

    const weatherByDay =
      temperaturesByDay.map((day) => {
        const dayTemperatures = day.map(prop('temperature'));
        const maxT = dayTemperatures.reduce(max);
        const minT = dayTemperatures.reduce(min);
        const weather =
          pipe(
            map(prop('weather')),
            countBy(identity),
            toPairs,
            reduce((best, cur) => cur[1] > best[1] ? cur : best, ['', 0]),
            nth(0)
          )(day);

        return {
          max: maxT,
          min: minT,
          weather,
        };
      });
    
    weatherByDay.forEach((value, dayIndex) => {
      dispatch(setOverviewWeather({ dayIndex, value }));
    });

    temperaturesByDay.forEach((temperatures, dayIndex) => {
      dispatch(setDayTemperatures({ dayIndex, value: temperatures }));
    });
  }
};

export const retrieveDayTemperatures = (dayIndex) => async (dispatch) => { }

export const selectDayOverviewWeather = (dayIndex) => (state) => state.weather.daysOverview[dayIndex];

export const selectDayTemperatures = (dayIndex) => (state) => state.weather.daysTemperatures[dayIndex];

export default weatherSlice.reducer;
