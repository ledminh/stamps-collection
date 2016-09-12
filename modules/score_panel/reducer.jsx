
const scoreReducer = (state = 0, action) => {
    if(action.type === "ALL_HIT"){
      return state + action.scoreAdded;
    }
    else if(action.type === "FIVE_HIT"){
      return state + 1;
    }
    else if(action.type === "LOGGED_OUT"){
      return 0;
    }
    else if(action.type === "LOGGED_IN"){
      return action.score;
    }

    return state;
}
export default scoreReducer;
