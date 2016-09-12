import React from 'react';
import axios from 'axios';

import {maxStamps, maxBasket, minAllHit} from './game_configure.jsx';
import {connect} from 'react-redux';

import store from './redux';
var d3 = require('d3');

function MainFunction (Main){
    class MainFunction extends React.Component {
      constructor(props){
          super(props);

          //Binding
          this.gameOver = this.gameOver.bind(this);
          this._addNewStamp = this._addNewStamp.bind(this);
          this._arrangePanels = this._arrangePanels.bind(this);
          this.checkRules = this.checkRules.bind(this);

      }

      componentDidMount(){
          this._loadData();
          this._moveGameOver();
          this._arrangePanels();
          d3.select(window).on("resize", this._arrangePanels);
      }

      componentWillReceiveProps(nextProps){
          if(nextProps.numStampsOnScreen > maxStamps || nextProps.numStampsOnBasket > maxBasket){
            this.gameOver();
          }

          if(nextProps.name === ""){
            d3.select(".welcome_panel").style("display", "block");
          }
          else{
            d3.select(".welcome_panel").style("display", "none");
          }

      }

      _loadData(){
        axios.get('/user-info-request')
             .then((res) => {
               if(res.data){
                  store.dispatch({
                    type: "LOGGED_IN",
                    name: res.data.name,
                    photo_url: res.data.photo_url,
                    score: res.data.score,
                    basket: res.data.basket,
                    stamps: res.data.stamps
                  });
               }

             });
      }

      gameOver(){
        store.dispatch({
          type: "GAME_OVER"
        });

        store.dispatch({
            type: "CLEAR_SCREEN"
        });

        var turnOnGameOver = d3.select('.game_over')
                               .style("display", "block");

      }

      _arrangePanels(){
          this._moveGameOver();
          this._moveWelcomePanel();
      }

      _moveAd(){
        var ad = d3.select('.advertisement');

        var pageWidth = window.innerWidth;
        var pageHeight = window.innerHeight;

        ad.style("left", ((pageWidth/2 - (728/2)) + "px"))
          .style("top", "10px");
      }

      _moveGameOver(){
        var gameOverDialog = d3.select('.game_over');

        var pageWidth = window.innerWidth;
        var pageHeight = window.innerHeight;

        gameOverDialog.style("left", (pageWidth/2 - 200) + "px")
                      .style("top", (pageHeight/2 - 175) + "px");
      }

      _moveWelcomePanel(){
          var welcomePanel = d3.select('.welcome_panel');

          var pageWidth = window.innerWidth;
          var pageHeight = window.innerHeight;

          welcomePanel.style("left", (pageWidth/2 - 300) + "px")
                      .style("top", (pageHeight/10) + "px");
      }

      _addNewStamp(){
        setTimeout(()=>{
          if(this.props.start && !this.props.gameOver){
            store.dispatch({
              type: "ADD_NEW_STAMP"
            });

            var inSound = new Audio("/audios/in.mp3");
            inSound.play();
            this._addNewStamp();

          }

        }, 2000);

      }

      checkRules(){
        var fruits = Object.keys(this.props.basket);

        //Check if any fruits more than 5 and then remove them
        fruits.forEach((fruit, index) => {
          if(fruit !== "current_id" && fruit !== "counter"){
            if(this.props.basket[fruit].count  === 5){
              store.dispatch({
                type: "FIVE_HIT",
                name: fruit
              });
            }
          }
        });

        //Check if there is 1 fruit of each kind in basket

        if(fruits.length >= minAllHit + 2){

          var shouldRemove = true;
          var numFruit = this.props.basket[fruits[2]].count;

          for(var i = 3; i < fruits.length; i++){

            if(this.props.basket[fruits[i]].count !== numFruit)
              shouldRemove = false;
          }

          if(shouldRemove){
            store.dispatch({
              type: "ALL_HIT",
              numDelete: (fruits.length - 2)*numFruit,
              scoreAdded: Math.floor(((fruits.length - 2)*numFruit)/2)
            });
          }
        }

      }

      render() {
        return <Main gameOver={this.gameOver} _addNewStamp={this._addNewStamp}
                  checkRules={this.checkRules}/>
      }
  }

  const mapStatesToProps = (store) => ({
      numStampsOnScreen: store.stamps.numStamps,
      start: store.start,
      gameOver: store.gameOver,
      numStampsOnBasket: store.basket.counter,
      basket: store.basket,
      name: store.loginData.name
  });

  return connect(mapStatesToProps)(MainFunction);
}

export default MainFunction;
