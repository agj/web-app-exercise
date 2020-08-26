import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { DayOverview } from './features/day-overview/DayOverview';
import { DayDetails } from './features/day-details/DayDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="days">
          <Link to="/lunes">
            <DayOverview max="17" min="3">Lunes</DayOverview>
          </Link>
          <Link to="/martes">
            <DayOverview max="17" min="3">Martes</DayOverview>
          </Link>
          <Link to="/miercoles">
            <DayOverview max="17" min="3">Miércoles</DayOverview>
          </Link>
        </div>

        <DayDetails
          width={ 500 }
          height={ 500 }
        />

        <Switch>
          <Route path="/lunes">
            <div>Lunes</div>
          </Route>
          <Route path="/martes">
            <div>Martes</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
