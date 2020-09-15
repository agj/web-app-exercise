import { createSlice } from '@reduxjs/toolkit';
import { repeat, range, prop, max, min, countBy, identity, nth, toPairs, reduce, map, pipe, groupBy, mapObjIndexed } from 'ramda';
import { datesEqual } from './days';
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

const tdy = new Date();
const initialOverview =
  range(0, 5)
  .map((index) => {
    const day = new Date(tdy.getTime())
    day.setDate(day.getDate() + index);
    return {
      day: day.getTime(),
      max: NaN,
      min: NaN,
      weather: undefined,
    };
  });

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    overview: initialOverview,
    temperatures: {},
  },
  reducers: {
    setOverview: (state, { payload }) => {
      state.overview = payload;
    },
    setDayTemperatures: (state, { payload: { day, value } }) => {
      state.temperatures[(new Date(day)).toDateString()] = value;
    },
  },
});

export const { setOverview, setDayTemperatures } = weatherSlice.actions;

// Selectors

export const selectDays = () => (state) => state.weather.overview.map(({ day }) => day);

export const selectDayOverview =
  (time) =>
    (state) =>
      time
        ? state.weather.overview.find(
            ({ day }) => datesEqual(day, time)
          )
        : undefined;

export const selectDayTemperatures =
  (time) =>
    (state) =>
      time
        ? state.weather.temperatures[(new Date(time)).toDateString()]
        : undefined;

// Retrievers

export const retrieveOverview = () => async (dispatch, getState) => {
  const response = await fetch(`//api.openweathermap.org/data/2.5/forecast?&q=Region Metropolitana,cl&units=metric&appid=${ process.env.REACT_APP_OPENWEATHERMAP_API_KEY }`);
  // const response = { ok: true, json: async () => testData };

  if (response.ok) {
    const raw = await response.json();

    const temperatures =
      raw.list
      .map(({ dt, main: { temp }, weather: [{ main }] }) => {
        return {
          time: dt * 1000,
          temperature: temp,
          weather: weatherEmojiMap[main],
        };
      });

    const temperaturesByDay =
      groupBy(({ time }) => (new Date(time)).toDateString(), temperatures);

    const weatherByDay =
      mapObjIndexed((day) => {
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
          day: day[0].time,
          max: maxT,
          min: minT,
          weather,
        };
      }, temperaturesByDay);

    dispatch(setOverview(Object.values(weatherByDay)));

    Object.keys(temperaturesByDay)
    .forEach((date) => {
      const temps = temperaturesByDay[date];
      dispatch(setDayTemperatures({ day: temps[0].time, value: temps }))
    });
  }
};

export const retrieveDayTemperatures = (day) => async (dispatch) => { }


export default weatherSlice.reducer;
