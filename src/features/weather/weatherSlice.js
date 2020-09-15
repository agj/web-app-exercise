import { createSlice } from '@reduxjs/toolkit';
import { repeat, range, prop, max, min, countBy, identity, nth, toPairs, reduce, map, pipe } from 'ramda';
import { dayNames, weekDayToIndex } from './days';
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
    daysOverview: Array(dayNames(0).length),
    daysTemperatures: repeat([], dayNames(0).length),
    todayIndex: (new Date()).getDay(),
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
    setTodayIndex: (state, { payload }) => {
      state.todayIndex = payload;
    },
  },
});

export const { setOverviewWeather, setDayTemperatures, setTodayIndex } = weatherSlice.actions;

export const retrieveOverviewWeather = () => async (dispatch, getState) => {
  const response = await fetch(`//api.openweathermap.org/data/2.5/forecast?&q=Region Metropolitana,cl&units=metric&appid=${ process.env.REACT_APP_OPENWEATHERMAP_API_KEY }`);
  // const response = { ok: true, json: async () => testData };

  if (response.ok) {
    const raw = await response.json();

    const today =
      (new Date(raw.list[0].dt * 1000))
      .getDay();

    const temperatures =
      raw.list
      .map(({ dt, main: { temp }, weather: [{ main }] }) => {
        const date = new Date(dt * 1000);
        return {
          hour: date.getHours(),
          day: weekDayToIndex(today, date.getDay()),
          temperature: temp,
          weather: weatherEmojiMap[main],
        };
      });

    const temperaturesByDay =
      range(0, dayNames(0).length)
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

    dispatch(setTodayIndex(today));
    
    weatherByDay.forEach((value, dayIndex) => {
      dispatch(setOverviewWeather({ dayIndex, value }));
    });

    temperaturesByDay.forEach((temperatures, dayIndex) => {
      dispatch(setDayTemperatures({ dayIndex, value: temperatures }));
    });
  }
};

export const retrieveDayTemperatures = (dayIndex) => async (dispatch) => { }

export const selectTodayIndex = () => (state) => state.weather.todayIndex;

export const selectDayOverviewWeather = (dayIndex) => (state) => state.weather.daysOverview[dayIndex];

export const selectDayTemperatures = (dayIndex) => (state) => state.weather.daysTemperatures[dayIndex];

export default weatherSlice.reducer;
