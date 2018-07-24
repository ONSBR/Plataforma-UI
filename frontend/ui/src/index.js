import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSystem from './Features/ChooseSystem';
import Dashboard from './Features/Dashboard'
import ProcessInstanceView from './Features/ProcessInstancesView'
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
    <Router>
    <div>
      <Route exact path="/" component={ChooseSystem} />
      <Route path="/system/:id" component={Dashboard} />
      <Route path="/process/:id" component={ProcessInstanceView} />
    </div>
  </Router>,
  document.getElementById('root')
);
