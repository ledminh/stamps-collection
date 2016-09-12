import React from 'react';

import store from '../../redux';
import {connect} from 'react-redux';

var d3 = require('d3');

function ScoreFunction(ScorePanel){
  class ScoreWrapper extends React.Component {

    componentWillReceiveProps(nextProps){
        if(this.props.score !== nextProps.score && nextProps.name !== ""){
          this._showScore();
        }
    }

    _showScore(){
      var scorePanel = d3.select('.score_panel');

      var pWidth = window.innerWidth;

      scorePanel.style("display", "block")
                .style("left", (pWidth/2 - 100) + "px")
                .style("top", "-120px");

      scorePanel.transition()
                .style("top", "0px");

      setTimeout(()=> {
        scorePanel.transition()
                  .style("top", "-120px");

        setTimeout(()=> {
          scorePanel.style("display", "none");
        }, 300);
      }, 700);
    }

    render(){
      return (<ScorePanel score={this.props.score}/>);
    }
  }

  const mapStatesToProps = (store) => ({
      score: store.score,
      name: store.loginData.name
  });

  return connect(mapStatesToProps)(ScoreWrapper);
}
export default ScoreFunction;
