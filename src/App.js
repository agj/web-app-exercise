import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { DayOverview } from './features/day-overview/DayOverview';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="days">
        <DayOverview day="Lunes" max="17" min="3" />
        <DayOverview day="Martes" max="17" min="3" />
        <DayOverview day="Miércoles" max="17" min="3" />
      </div>

      <Router>
        <Switch>
          <Route path="/a">
            <div>A</div>
          </Route>
          <Route path="/b">
            <div>B</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
