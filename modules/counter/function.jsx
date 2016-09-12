import React from 'react';

var d3 = require('d3');

function CounterFunction(Counter){
  class CounterWrapper extends React.Component {

    counterOnClick(event){
      var counter = d3.select('.counter')
      var currentBottom = counter.style("bottom");

      if(currentBottom !== "0px"){
        currentBottom = "0px"
      }
      else {
        currentBottom = "-60px";
      }

      counter.transition()
          .style("bottom", currentBottom);
    }

    render(){
      return (
        <Counter onClick={this.counterOnClick}/>
      );
    }
  }

  return CounterWrapper;
}

export default CounterFunction;
