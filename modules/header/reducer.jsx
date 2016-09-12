const initLoginState = {
  name: "",
  photo_url: ""
};

export const loginReducer = (state=initLoginState, action) => {
    if(action.type === "LOGGED_IN"){
      var newState = Object.assign({}, state);
      newState.name = action.name;
      newState.photo_url = action.photo_url;

      return newState;
    }
    else if(action.type === "LOGGED_OUT"){
      var newState = Object.assign({}, state);
      newState.name = "";
      newState.photo_url = "";

      return newState;
    }

    return state;
};

export const startReducer = (state=false, action) => {
  if(action.type === "START" || action.type === "RESTART"){
    return true;
  }
  else if(action.type === "STOP" || action.type === "LOGGED_OUT"){
    return false;
  }

  return state;
}
