import React from 'react';

import store from './redux';
import {connect} from 'react-redux';

import Header from './modules/header/index';
import MainFunction from './function';
import ScorePanel from './modules/score_panel/index';
import Stamp from './modules/stamp/index';
import Basket from './modules/basket/index';
import GameOver from './modules/game_over/index';
import Counter from './modules/counter/index';
import WelcomePanel from './modules/welcome_panel/index';
import Advertisement from './modules/advertisement/index';
import {fruits} from './game_configure.jsx';

const Main = (props) => (
  <div className="main">
    <Header _addNewStamp={props._addNewStamp}/>
    <Advertisement />
    <ScorePanel />
    {
      (() => {
        var results = [];
        Object.keys(props.stamps).forEach((stampID, i) => {
          if(stampID.indexOf("stamp") === 0){
            var fruitIndex = props.stamps[stampID].fruitIndex;

            results.push(<Stamp key={stampID} image_url={fruits[fruitIndex].image_url}
                    name={fruits[fruitIndex].name} stampID={stampID} fruitIndex={fruitIndex}
                    current_position={props.stamps[stampID].current_position}
                    start={props.start} gameOver={props.gameOver}
                    checkRules={props.checkRules} />);
          }

        });

        return results;
      })()

    }
    <GameOver _addNewStamp={props._addNewStamp}/>
    <WelcomePanel />
    <Basket />
    <Counter />
  </div>
);

const mapStatesToProps = (store) => ({
  stamps: store.stamps,
  start: store.start,
  gameOver: store.gameOver
});

export default MainFunction(connect(mapStatesToProps)(Main));
