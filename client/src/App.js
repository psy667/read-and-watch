import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Home from './pages';
import Page1 from './pages/Page1';


function App() {
  return (
    <div>
        <Router>
          <ul className="nav">
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li>
              <NavLink to="/page1">Page1</NavLink>
            </li>
          </ul>

          <Route path="/" exact component={Home} />
          <Route path="/page1" component={Page1} />
        </Router>
    </div>
  );
}

export default App;
