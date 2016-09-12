import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import store from '../../redux';

var d3 = require('d3');

function HeaderFunction(Header){
  class HeaderWrapper extends React.Component {
    constructor(props){
      super(props);

      //Binding
      this.facebookOnClick =  this.facebookOnClick.bind(this);
      this.profileContentOnClick = this.profileContentOnClick.bind(this);
      this.profileContentOnMouseOut = this.profileContentOnMouseOut.bind(this);
      this.logOutOnClick = this.logOutOnClick.bind(this);
      this.startStopOnClick = this.startStopOnClick.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.name === ""){
            d3.select('.header').style("left", "-190px");
        }
        else{
          d3.select('.header').style("left", "0px")
        }
    }

    startStopOnClick(event){
      if(!this.props.start && !this.props.gameOver){
        store.dispatch({
          type: "START"
        });

        this.props._addNewStamp();

        this._pullOutBasket();

        d3.select(".counter")
        .transition()
        .style("bottom", "0px");


      }
      else {
        store.dispatch({
          type: "STOP"
        });

        axios.post("/save",{
          score: this.props.score,
          stamps: this.props.stamps,
          basket: this.props.basket
        });

      }
    }

    _pullOutBasket(){
        d3.select('.basket')
          .transition()
          .style("right", "0px");
    }

    headerOnClick(event){
      var header = d3.select('.header');

      var leftPos = header.style("left");

      if(leftPos === "0px")
        leftPos = "-190px";
      else {
        leftPos = "0px";
      }

      header.transition()
            .style("left", leftPos);
    }

    facebookOnClick(event){
      window.location.href= "/facebook-login";
    }

    profileContentOnClick(event){
        var scorePanel = d3.select('.score_panel');

        var display = scorePanel.style("display");

        if(display === "none"){
          scorePanel.style("display", "block")
                    .style("left", "0px")
                    .style("top", "");

          scorePanel.transition()
                    .duration(500)
                    .style("left", "200px");

          setTimeout(()=> {
            scorePanel.style("z-index", 10);
          }, 500);
        }
        else{
          scorePanel.style("z-index", 9);

          scorePanel.transition()
                    .duration(500)
                    .style("left", "0px");

          setTimeout(()=> {
             scorePanel.style("display", "none");
          }, 500);
        }

    }

    profileContentOnMouseOut(event){
        var scorePanel = d3.select('.score_panel');

        var display = scorePanel.style("display");

        if(display === "block"){
          scorePanel.style("display", "none");
        }
    }

    logOutOnClick(event){
          axios.post("/logout", {
            score: this.props.score,
            stamps: this.props.stamps,
            basket: this.props.basket
          })
              .then((res)=> {
                if(res.data.success){
                  store.dispatch({
                    type: "LOGGED_OUT"
                  });

                  store.dispatch({
                    type: "CLEAR_SCREEN"
                  });

                  d3.select('.game_over')
                    .style('display', "none");

                  d3.select('.basket')
                    .style('right', '-160px');

                  d3.select(".counter")
                    .transition()
                    .style("bottom", "-60px");
                }
              });

    }


    render(){
      return (<div>
          <Header facebookOnClick={this.facebookOnClick}
                  profileContentOnClick={this.profileContentOnClick}
                  profileContentOnMouseOut={this.profileContentOnMouseOut}
                  startStopOnClick={this.startStopOnClick}
                  logOutOnClick={this.logOutOnClick}
                  name={this.props.name} photo_url={this.props.photo_url}
                  start={this.props.start} gameOver={this.props.gameOver}
                  headerOnClick={this.headerOnClick}/>
      </div>);
    }
  }

  const mapStatesToProps = (store) => ({
    start : store.start,
    gameOver: store.gameOver,
    stamps: store.stamps,
    basket: store.basket,
    score: store.score,
    name: store.loginData.name,
    photo_url: store.loginData.photo_url,
    start : store.start,
    gameOver: store.gameOver
  });

  return connect(mapStatesToProps)(HeaderWrapper);
}

export default HeaderFunction;
