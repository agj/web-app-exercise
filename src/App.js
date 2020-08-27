import React from 'react';
import { DayOverview } from './features/weather/DayOverview';
import { DayDetails } from './features/weather/DayDetails';
import './App.css';

function App({ match: { params: { day } } }) {
  return (
    <div className="App">
      <div className="days">
        <DayOverview index="0" max="17" min="3">Lunes</DayOverview>
        <DayOverview index="1" max="17" min="3">Martes</DayOverview>
        <DayOverview index="2" max="17" min="3">Miércoles</DayOverview>
      </div>

      <DayDetails
        width={ 500 }
        height={ 500 }
        dayIndex={ day }
      />

    </div>
  );
}

export default App;
