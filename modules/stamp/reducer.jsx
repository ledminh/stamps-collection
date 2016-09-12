import {fruits} from '../../game_configure';

const initStamps = {
  current_id: 0,
  last_position: {
    left: -1,
    top: -1
  },
  numStamps: 0
}

const stampsReducer = (state=initStamps, action) => {
  if(action.type === "ADD_NEW_STAMP"){
      var newState = Object.assign({}, state);

      //Create new Stamp
      var newStamp = "stamp_" + newState.current_id;
      var fruitIndex = _getFruitIndex();

      var newLeft = _getNewPosition("left", newState.last_position.left);
      var newTop = _getNewPosition("top", newState.last_position.top);

      newState[newStamp] = {
          fruitIndex: fruitIndex,
          current_position: {
            top: newTop,
            left: newLeft
          }
      };

      //Update last_position
      newState.last_position = {
        left: newLeft,
        top: newTop
      }

      //Update current_id
      newState.current_id++;

      //Update counter
      newState.numStamps++;

      return newState;
  }
  else if(action.type === "COLLECT_STAMP"){
    var newState = _deepCopy(state);
    delete newState[action.stampID];
    newState.numStamps--;

    return newState;
  }
  else if(action.type === "CLEAR_SCREEN")
    return initStamps;
  else if(action.type === "LOGGED_IN"){
    return action.stamps
  }
  return state;
}

function _getNewPosition(leftTop, oldPos){
  if(leftTop === "left"){
    var maxWidth = window.innerWidth - 200;
    var newLeft = Math.floor(Math.random()*maxWidth);

    if(oldPos !== -1 && newLeft < oldPos + 100 && newLeft > oldPos - 100)
      newLeft = _getNewPosition("left", oldPos);


    return newLeft;
  }
  else if(leftTop === "top"){
    var maxHeight = window.innerHeight - 75;
    var newTop = Math.floor(110 + Math.random()*(maxHeight - 110));

    if(oldPos !== -1 && newTop < oldPos + 65 && newTop > oldPos - 65)
      newTop = _getNewPosition("top", oldPos);


    return newTop;
  }
}

function _getFruitIndex(){
  var index = Math.floor(Math.random()*fruits.length);

  return index;
}

function _deepCopy(oldObj){
  var newObj = Object.assign({}, oldObj);

  Object.keys(oldObj).forEach((key, i) => {
    if(typeof newObj[key] === "object"){
      newObj[key] = _deepCopy(oldObj[key]);
    }

  });

  return newObj;
}

export default stampsReducer;
