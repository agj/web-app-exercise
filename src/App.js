import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { WeatherOverview } from './features/weather/WeatherOverview';
import { DayDetails } from './features/weather/DayDetails';
import { slugToTime } from './features/weather/days';
// import './App.css';

function App({ match: { params: { day } }}) {
  const dayTime = slugToTime(day);

  return (
    <Container>
      <Row>
        <Col sm="4">
          <WeatherOverview currentDay={ dayTime } />
        </Col>
        <Col sm="8">
          { dayTime
            ? <DayDetails
                width={ 500 }
                height={ 500 }
                day={ dayTime }
              />
            : ''
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
