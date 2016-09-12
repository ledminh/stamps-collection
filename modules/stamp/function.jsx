import React from 'react';

import store from '../../redux';

var d3 = require('d3');

function StampFunction(Stamp){
  return class StampWrapper extends React.Component {
    constructor(props){
      super(props);

      //Binding
      this.stampOnClick = this.stampOnClick.bind(this);
      this._removeStamp = this._removeStamp.bind(this);
    }

    stampOnClick(event){
      if(this.props.start && !this.props.gameOver){
        var outSound = new Audio("/audios/out.mp3");
        outSound.play();

        this._removeStamp();

      }


    }

    _removeStamp(){
      var thisStamp = d3.select("#" + this.props.stampID);
      var thisStampID = this.props.stampID;
      var thisName = this.props.name;
      var thisFruitIndex = this.props.fruitIndex;

      thisStamp.transition()
               .duration(300)
               .style("opacity", "0");

      setTimeout(()=> {
        store.dispatch({
          type: "COLLECT_STAMP",
          stampID: thisStampID, //for stampReducer
          fruitIndex: thisFruitIndex //for basketReducer
        });

        setTimeout(()=> {
            this.props.checkRules();
        },100);

      }, 300);
    }

    componentDidMount(){
        var thisStamp = d3.select('#' + this.props.stampID);

        thisStamp.style("top", this.props.current_position.top + "px");
        thisStamp.style("left", this.props.current_position.left + "px");
    }

    render(){
      return (<Stamp stampID={this.props.stampID}
                      image_url={this.props.image_url}
                        name={this.props.name.toUpperCase()} stampOnClick={this.stampOnClick}/>);
    }
  }
}

export default StampFunction;
