import React from 'react';
import { Button } from 'reactstrap';
import { WeatherOverview } from './features/weather/WeatherOverview';
import { DayDetails } from './features/weather/DayDetails';
import { dayToIndex } from './days';
// import './App.css';

function App({ match: { params: { day } }}) {
  const dayIndex = dayToIndex(day);

  return (
    <div className="App">
      <Button color="primary">Hola</Button>

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
