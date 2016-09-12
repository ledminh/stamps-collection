import React from 'react';

var d3 = require('d3');

import store from '../../redux';

function GameOverFunction(GameOver){
  return class GameOverWrapper extends React.Component {
    constructor(props){
      super(props);

      //Binding
      this.reStartOnClick = this.reStartOnClick.bind(this);
    }

    reStartOnClick(event){
        var turnOffGameOver = d3.select(".game_over")
                                .style("display", "none");

        store.dispatch({
          type: "RESTART"
        });


        this.props._addNewStamp();
    }

    render(){
      return (<GameOver reStartOnClick={this.reStartOnClick}/>)
    }
  }
}

export default GameOverFunction;
