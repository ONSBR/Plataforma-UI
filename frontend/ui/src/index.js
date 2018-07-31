import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSystem from './Features/ChooseSystem';
import Dashboard from './Features/Dashboard'
import ProcessInstanceView from './Features/ProcessInstancesView'
import ReprocessingView from './Features/ReprocessingView'
import ReproductionView from './Features/ReproductionView'
import Apps from './Features/Apps'
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
    <Router>
    <div>
      <Route exact path="/ui/" component={ChooseSystem} />
      <Route path="/ui/system/:id" component={Dashboard} />
      <Route path="/ui/apps/:id" component={Apps} />
      <Route path="/ui/process/:id" component={ProcessInstanceView} />
      <Route path="/ui/reprocessing/:id" component={ReprocessingView} />
      <Route path="/ui/reproduction/:id" component={ReproductionView} />
    </div>
  </Router>,
  document.getElementById('root')
);
