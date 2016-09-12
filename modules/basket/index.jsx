import React from 'react';

import BasketFunction from './function';

import store from '../../redux';
import {connect} from 'react-redux';
import {fruits} from '../../game_configure';

require('./basket.sass');

const Basket = (props) => (
  <div className="basket" onClick={props.onClick}>
    <div className="bk_header">YOUR BASKET</div>
    <div className="bk_content">
    {
      (
        () => {
          var results = [];

          Object.keys(props.basket).forEach((itemName, i) => {
            if(itemName !== "current_id" && itemName !== "counter"){
              
              results.push(<div className="bk_content_tab" key={props.basket[itemName].id}><span className="bk_content_tab_number">{props.basket[itemName].count}</span> {props._processName(fruits[props.basket[itemName].fruitIndex].name, props.basket[itemName].count)}</div>)
            }

          });

          return results;
        }
      )()
    }
    </div>
  </div>
);

const mapStatesToProps = (store) => ({
  basket: store.basket
});

export default BasketFunction(connect(mapStatesToProps)(Basket));
