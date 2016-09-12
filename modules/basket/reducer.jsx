const initBasket = {
  current_id: 0,
  counter: 0
}

const basketReducer = (state = initBasket, action) => {
  if(action.type === "COLLECT_STAMP"){
      var newState = Object.assign({}, state);

      var itemName = "item_" + action.fruitIndex

      if(newState[itemName]){
        newState[itemName] = {
          fruitIndex: action.fruitIndex,
          count: newState[itemName].count + 1,
          id: "basket_" + newState.current_id
        };
      }
      else {
        newState[itemName] = {
          id: "basket_" + newState.current_id,
          count: 1,
          fruitIndex: action.fruitIndex
        }
      }
      newState.current_id++;
      newState.counter++;

      return newState;
  }
  else if(action.type === "FIVE_HIT"){
    var newState = Object.assign({}, state);

    newState.counter -= 5;
    delete newState[action.name];

    return newState;
  }
  else if(action.type === "CLEAR_SCREEN"
              || action.type === "ALL_HIT"){
    return initBasket;
  }
  else if(action.type === "LOGGED_IN"){
    return action.basket;
  }

  return state;
}


export default basketReducer;
