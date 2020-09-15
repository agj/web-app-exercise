import React from 'react';
import { Container } from 'reactstrap';
import { WeatherOverview } from './features/weather/WeatherOverview';
import { DayDetails } from './features/weather/DayDetails';
import { dayToIndex } from './features/weather/days';
// import './App.css';

function App({ match: { params: { day } }}) {
  const dayIndex = dayToIndex(day);

  console.log('day', day, typeof day, dayIndex)

  return (
    <Container>
      <WeatherOverview currentDayIndex={ dayIndex } />

      { !isNaN(dayIndex)
        ? <DayDetails
            width={ 500 }
            height={ 500 }
            dayIndex={ dayIndex }
          />
        : ''
      }

    </Container>
  );
}

export default App;
