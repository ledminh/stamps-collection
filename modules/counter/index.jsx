import React from 'react';

require('./counter.sass');

import CounterFunction from './function';
import {maxStamps, maxBasket} from '../../game_configure';

import store from '../../redux';
import {connect} from 'react-redux';

const Counter = (props) => (
  <div className="counter" onClick={props.onClick}>
    <div className="ct_onscreen">
      <div className="ct_os_header">STAMPS ON SCREEN</div>
      <div className={"ct_os_content " + ((props.stampsOnScreen > maxStamps - 4) ? "ct_alert" : "")}>{props.stampsOnScreen}</div>
    </div>

    <div className="ct_onbasket">
      <div className="ct_ob_header">STAMPS IN BASKET</div>
      <div className={"ct_ob_content " + ((props.stampsInBasket > maxBasket - 4) ? "ct_alert" : "")}>{props.stampsInBasket}</div>
    </div>
  </div>
);

const mapStatesToProps = (store) => ({
  stampsOnScreen: store.stamps.numStamps ,
  stampsInBasket: store.basket.counter
});


export default CounterFunction(connect(mapStatesToProps)(Counter));
