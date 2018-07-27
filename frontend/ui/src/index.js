import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSystem from './Features/ChooseSystem';
import Dashboard from './Features/Dashboard'
import ProcessInstanceView from './Features/ProcessInstancesView'
import ReprocessingView from './Features/ReprocessingView'
import Apps from './Features/Apps'
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
    <Router>
    <div>
      <Route exact path="/" component={ChooseSystem} />
      <Route path="/system/:id" component={Dashboard} />
      <Route path="/apps/:id" component={Apps} />
      <Route path="/process/:id" component={ProcessInstanceView} />
      <Route path="/reprocessing/:id" component={ReprocessingView} />
    </div>
  </Router>,
  document.getElementById('root')
);
