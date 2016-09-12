const gameOverReducer = (state=false, action) => {
  if(action.type === "GAME_OVER"){
    return true;
  }
  else if(action.type === "RESTART" || action.type === "LOGGED_OUT"){
      return false;
  }

  return state;
}

export default gameOverReducer;
