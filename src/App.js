import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { WeatherOverview } from './features/weather/WeatherOverview';
import { DayDetails } from './features/weather/DayDetails';
import { slugToTime } from './features/weather/days';

function App({ match: { params: { day } }}) {
  const dayTime = slugToTime(day);

  return (
    <Container className="p-4">
      <Row>
        <Col sm="4">
          <WeatherOverview currentDay={ dayTime } />
        </Col>
        <Col sm="8" className="text-center my-auto">
          { dayTime
            ? <div>
                <DayDetails
                  width={ 500 }
                  height={ 500 }
                  day={ dayTime }
                />
                <Button
                  tag={ NavLink }
                  to="/"
                >
                  Cerrar
                </Button>
              </div>
            : <p>
                Selecciona un día para ver detalles.
              </p>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
