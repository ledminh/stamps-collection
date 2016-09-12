import React from 'react';

var d3 = require('d3');



function BasketFunction(CounterPanel){
  return class BasketWrapper extends React.Component{
    constructor(props){
      super(props);

      //Binding
      this.basketOnClick = this.basketOnClick.bind(this);
      this._processName = this._processName.bind(this);
    }

    basketOnClick(event){
      var basketPanel = d3.select('.basket');
      var rightPos = basketPanel.style('right');

      if(rightPos === "0px")
        rightPos = "-160px";
      else
        rightPos = "0px"

      basketPanel.transition()
                  .style("right", rightPos);

    }

    _processName(fruit,count){
        var processedFruit = fruit;
        if(count > 1){
          if(fruit[fruit.length - 1] === "y"){
            processedFruit = processedFruit.slice(0, processedFruit.length - 2) + "ies";
          }
          else {
            processedFruit += "s";
          }
        }

        return processedFruit;
    }


    render(){
      return (
        <CounterPanel onClick={this.basketOnClick} _processName={this._processName}/>
      );
    }
  }

}

export default BasketFunction;
