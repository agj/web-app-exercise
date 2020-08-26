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
            <DayOverview day="Lunes" max="17" min="3" />
          </Link>
          <Link to="/martes">
            <DayOverview day="Martes" max="17" min="3" />
          </Link>
          <Link to="/miercoles">
            <DayOverview day="Miércoles" max="17" min="3" />
          </Link>
        </div>

        <DayDetails width={ 500 } height={ 500 } />

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
