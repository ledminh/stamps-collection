import React from 'react';

require('./score_panel.sass');

import store from '../../redux';
import {connect} from 'react-redux';
import ScoreFunction from './function';

const ScorePanel = (props) => (
  <div className="score_panel" id="score_panel">
    <div className="sp_header">YOUR SCORE</div>
    <div className="sp_content">{props.score}</div>
  </div>
);



export default ScoreFunction(ScorePanel);
