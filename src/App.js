import React from 'react';
import { Container } from 'reactstrap';
import { WeatherOverview } from './features/weather/WeatherOverview';
import { DayDetails } from './features/weather/DayDetails';
import { slugToTime } from './features/weather/days';
// import './App.css';

function App({ match: { params: { day } }}) {
  const dayTime = slugToTime(day);

  console.log('day', day, dayTime)

  return (
    <Container>
      <WeatherOverview currentDay={ dayTime } />

      { dayTime
        ? <DayDetails
            width={ 500 }
            height={ 500 }
            day={ dayTime }
          />
        : ''
      }

    </Container>
  );
}

export default App;
