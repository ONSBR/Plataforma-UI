import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSystem from './Features/ChooseSystem';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const About = ({match}) => (
    <div>
      <h2>Exibir as infos do sistema {match.params.id}</h2>
      <Link to="/">Voltar</Link>
    </div>
  );

ReactDOM.render(
    <Router>
    <div>
      <Route exact path="/" component={ChooseSystem} />
      <Route path="/system/:id" component={About} />
    </div>
  </Router>,
  document.getElementById('root')
);
