import React from 'react';
import { WeatherOverview } from './features/weather/WeatherOverview';
import { DayDetails } from './features/weather/DayDetails';
import { dayToIndex } from './days';
import './App.css';

function App({ match: { params: { day } }}) {
  const dayIndex = dayToIndex(day);

  return (
    <div className="App">
      <WeatherOverview currentDayIndex={ dayIndex } />

      { !isNaN(dayIndex)
        ? <DayDetails
            width={ 500 }
            height={ 500 }
            dayIndex={ dayIndex }
          />
        : ''
      }

    </div>
  );
}

export default App;
